import { SqlParameter, SqlQuerySpec } from '@azure/cosmos';

import { CosmosDbGenericFilter } from './cosmos-db-generic-filter';
import { EsdtTokenType } from '../common/enums';
import { NftMetadataAttributes } from './documents/token/nft-metadata-attributes';

export enum QueryConditionOperator {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
}

export enum QueryLogicalOperator {
  AND = 'AND',
  OR = 'OR',
}

export enum QueryOrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface QueryCondition {
  field: string;
  value: string | number | boolean | string[] | number[];
  operator: QueryConditionOperator;
  logicalOperator?: QueryLogicalOperator;
}

export interface QueryCustomCondition {
  condition: string;
  logicalOperator?: QueryLogicalOperator;
  parameters?: {
    [key: string]: string | number | boolean | string[] | number[];
  };
}

export interface CosmosDbQuery {
  selectFields?: string[];
  conditions: QueryCondition[];
  groupedConditions?: QueryConditionGroup[];
  customConditions?: QueryCustomCondition[];
  orderBy?: {
    field: string;
    direction: QueryOrderDirection;
  };
  skip?: number;
  top?: number;
}

export interface QueryConditionGroup {
  conditions: QueryCondition[];
  logicalOperator: QueryLogicalOperator;
}

export class CosmosDbQueryBuilder {
  private query!: CosmosDbQuery;
  private parameters: Record<
    string,
    string | number | boolean | string[] | number[]
  > = {};
  private isCountQuery = false;

  constructor() {
    this.query = {
      conditions: [],
      groupedConditions: [],
      customConditions: [],
    };
  }

  where(
    field: string,
    value: string | number | boolean | string[] | number[],
    operator: QueryConditionOperator,
    logicalOperator: QueryLogicalOperator = QueryLogicalOperator.AND,
  ): CosmosDbQueryBuilder {
    this.query.conditions.push({ field, value, operator, logicalOperator });
    return this;
  }

  whereCustom(
    condition: string,
    logicalOperator: QueryLogicalOperator = QueryLogicalOperator.AND,
    parameters: Record<
      string,
      string | number | boolean | string[] | number[]
    > = {},
  ): CosmosDbQueryBuilder {
    if (!this.query.customConditions) {
      this.query.customConditions = [];
    }
    this.query.customConditions.push({
      condition,
      logicalOperator,
      parameters,
    });
    return this;
  }

  whereRange(
    field: string,
    lower: number,
    upper: number,
    logicalOperator: QueryLogicalOperator = QueryLogicalOperator.AND,
  ): CosmosDbQueryBuilder {
    field = field.replace('Range', '');
    this.query.conditions.push({
      field,
      value: lower,
      operator: QueryConditionOperator.GREATER_THAN_OR_EQUAL,
      logicalOperator,
    });
    this.query.conditions.push({
      field,
      value: upper,
      operator: QueryConditionOperator.LESS_THAN_OR_EQUAL,
      logicalOperator,
    });
    return this;
  }

  whereGroup(
    conditions: QueryCondition[],
    logicalOperator: QueryLogicalOperator = QueryLogicalOperator.AND,
  ): CosmosDbQueryBuilder {
    this.query.groupedConditions = this.query.groupedConditions || [];
    this.query.groupedConditions.push({ conditions, logicalOperator });
    return this;
  }

  orderBy(field: string, direction: QueryOrderDirection): CosmosDbQueryBuilder {
    this.query.orderBy = { field, direction };
    return this;
  }

  setOffset(offset: number): CosmosDbQueryBuilder {
    this.query.skip = offset;
    return this;
  }

  setLimit(limit: number): CosmosDbQueryBuilder {
    // if (limit > 100) {
    //   throw new Error('Limit cannot be greater than 100');
    // }
    // think about how to handle this to protect external calls
    // at the same time allow internal calls to have higher limits
    this.query.top = limit;
    return this;
  }

  selectFields(fields: (string | number | symbol)[]): CosmosDbQueryBuilder {
    this.query.selectFields = fields as string[];
    return this;
  }

  count() {
    this.isCountQuery = true;
    return this;
  }

  buildSqlQuery(applyPagination = true): SqlQuerySpec {
    let sqlQuery = 'SELECT * FROM c';
    let paramIndex = 0;

    if (this.isCountQuery) {
      sqlQuery = 'SELECT VALUE COUNT(1) FROM c';
    } else if (this.query.selectFields) {
      const dynamicProjection = this.buildCustomProjection(
        this.query.selectFields,
      );
      sqlQuery = sqlQuery.replace(
        'SELECT *',
        `SELECT VALUE ${dynamicProjection}`,
      );
    }

    if (this.query.conditions.length > 0) {
      sqlQuery += ' WHERE';
      for (const condition of this.query.conditions) {
        // 'from' is a reserved word in Cosmos DB, so we need to use bracket notation
        if (condition.field === 'from') {
          condition.field = `['from']`;
        }
        // we use IN operator for arrays and = for single values
        if (condition.operator === QueryConditionOperator.IN) {
          // If the value is an array with a single element, use the equal operator
          if (Array.isArray(condition.value) && condition.value.length === 1) {
            sqlQuery += ` c.${condition.field} = @p${paramIndex}`;
          } else {
            sqlQuery += ` ARRAY_CONTAINS(@p${paramIndex}, c.${condition.field})`;
          }
        } else if (condition.operator === QueryConditionOperator.NOT_IN) {
          // If the value is an array with a single element, use the not equal operator
          if (Array.isArray(condition.value) && condition.value.length === 1) {
            sqlQuery += ` c.${condition.field} != @p${paramIndex}`;
          } else {
            sqlQuery += ` NOT ARRAY_CONTAINS(@p${paramIndex}, c.${condition.field})`;
          }
        } else {
          sqlQuery += ` c.${condition.field} ${this.getSqlOperator(
            condition.operator,
          )} @p${paramIndex}`;
        }
        if (
          condition !== this.query.conditions[this.query.conditions.length - 1]
        ) {
          sqlQuery += ` ${condition.logicalOperator}`;
        }
        // If the value is an array with a single element, use the equal operator
        if (Array.isArray(condition.value) && condition.value.length === 1) {
          this.parameters[`@p${paramIndex}`] = condition.value[0];
        } else {
          this.parameters[`@p${paramIndex}`] = condition.value;
        }
        paramIndex++;
      }
    }

    if (
      this.query.groupedConditions &&
      this.query.groupedConditions.length > 0
    ) {
      let groupedConditionsSql = '';
      for (const groupedCondition of this.query.groupedConditions) {
        let groupSql = '';
        for (const condition of groupedCondition.conditions) {
          if (condition.operator === QueryConditionOperator.IN) {
            groupSql += ` ARRAY_CONTAINS(@p${paramIndex}, c.${condition.field})`;
          } else {
            groupSql += ` c.${condition.field} ${this.getSqlOperator(
              condition.operator,
            )} @p${paramIndex} `;
          }
          if (
            condition !==
            groupedCondition.conditions[groupedCondition.conditions.length - 1]
          ) {
            groupSql += ` ${condition.logicalOperator}`;
          }
          this.parameters[`@p${paramIndex}`] = condition.value;
          paramIndex++;
        }
        groupedConditionsSql += ` (${groupSql})`;
        if (
          groupedCondition !==
          this.query.groupedConditions[this.query.groupedConditions.length - 1]
        ) {
          groupedConditionsSql += ` ${groupedCondition.logicalOperator}`;
        }
      }
      if (groupedConditionsSql !== '') {
        sqlQuery += ` AND${groupedConditionsSql}`;
      }
    }

    if (this.query.customConditions) {
      // If there are already conditions in the query, add an AND operator
      if (
        this.query.conditions.length > 0 ||
        (this.query.groupedConditions &&
          this.query.groupedConditions.length > 0)
      ) {
        sqlQuery += ' AND';
      } else {
        sqlQuery += ' WHERE';
      }

      for (const customCondition of this.query.customConditions) {
        sqlQuery += ` ${customCondition.condition}`;

        // If this isn't the last custom condition, add the logical operator
        if (
          customCondition !==
          this.query.customConditions[this.query.customConditions.length - 1]
        ) {
          sqlQuery += ` ${customCondition.logicalOperator}`;
        }

        // Add the custom condition's parameters to this.parameters
        if (customCondition.parameters) {
          for (const [key, value] of Object.entries(
            customCondition.parameters,
          )) {
            this.parameters[key] = value;
          }
        }
      }
    }

    if (this.query.orderBy) {
      sqlQuery += ` ORDER BY c.${this.query.orderBy.field} ${this.query.orderBy.direction}`;
    }

    // Default values
    const defaultOffset = 0;
    const defaultLimit = 25;

    if (this.query.skip !== undefined || this.query.top !== undefined) {
      const offset =
        this.query.skip !== undefined ? this.query.skip : defaultOffset;
      const limit =
        this.query.top !== undefined ? this.query.top : defaultLimit;

      if (applyPagination) {
        sqlQuery += ` OFFSET ${offset} LIMIT ${limit}`;
      }
    }

    const parameters: SqlParameter[] = Object.entries(this.parameters).map(
      ([name, value]) => ({ name, value }),
    );

    sqlQuery = sqlQuery.replace(/\.\[/g, '[');
    return { query: sqlQuery, parameters };
  }

  private buildCustomProjection(selectClauses: string[]) {
    const result: Record<string, unknown> = {};

    for (const str of selectClauses) {
      const parts = str.split('.');
      let currentObject: Record<string, unknown> = result;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          // If it's the last part, it's a property with the modified value
          currentObject[part] = 'c.' + str;
        } else {
          // If it's not the last part, create an object if it doesn't exist
          if (!currentObject[part] || typeof currentObject[part] !== 'object') {
            currentObject[part] = {};
          }
          currentObject = currentObject[part] as Record<string, unknown>;
        }
      }
    }

    return JSON.stringify(result).replace(/"/g, '');
  }

  private getSqlOperator(operator: QueryConditionOperator): string {
    switch (operator) {
      case QueryConditionOperator.EQUAL:
        return '=';
      case QueryConditionOperator.NOT_EQUAL:
        return '!=';
      case QueryConditionOperator.GREATER_THAN:
        return '>';
      case QueryConditionOperator.LESS_THAN:
        return '<';
      case QueryConditionOperator.GREATER_THAN_OR_EQUAL:
        return '>=';
      case QueryConditionOperator.LESS_THAN_OR_EQUAL:
        return '<=';
      case QueryConditionOperator.IN:
        return 'IN';
      case QueryConditionOperator.NOT_IN:
        return 'NOT IN';
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  fromFilter<T>(filter: CosmosDbGenericFilter<T>): CosmosDbQueryBuilder {
    const defaultMin = 0;
    const defaultMax = Number.MAX_SAFE_INTEGER;

    const handleFilter = (key: string, value: unknown) => {
      if (Array.isArray(value) && value.length > 0) {
        // check if the array is a RangeFilter
        // check with endsWith to support nested properties
        if (key.endsWith('range')) {
          for (const rangeFilter of value) {
            const min =
              rangeFilter.min !== undefined ? rangeFilter.min : defaultMin;
            const max =
              rangeFilter.max !== undefined ? rangeFilter.max : defaultMax;

            // check if the range filter is nested
            // if it is, replace the field with the nested field
            if (key.endsWith('.range')) {
              rangeFilter.field = key.replace(
                '.range',
                `.${rangeFilter.field}`,
              );
            }
            this.whereRange(rangeFilter.field, min, max);
          }
        } else if (key.endsWith('attributes')) {
          let traitLogicalOperator = QueryLogicalOperator.AND;
          if (key === 'attributes') {
            traitLogicalOperator = QueryLogicalOperator.OR;
          }
          const { filterString, parameters } = this.getAttributesQueryAndParams(
            key,
            value as NftMetadataAttributes[],
            traitLogicalOperator,
          );
          this.whereCustom(filterString, QueryLogicalOperator.AND, parameters);
        } else if (key === 'activityAddress') {
          // // used for nft activity to filter by from or to
          if (value.length > 1) {
            this.whereCustom(
              `(ARRAY_CONTAINS(@activityAddress, c.to) OR ARRAY_CONTAINS(@activityAddress, c['from']))`,
              QueryLogicalOperator.AND,
              { '@activityAddress': value as string[] },
            );
          } else {
            this.whereCustom(
              `(c.to = @activityAddress OR c['from'] = @activityAddress)`,
              QueryLogicalOperator.AND,
              { '@activityAddress': (value as string[])[0] as string },
            );
          }
        } else if (key === 'mintToken') {
          // used for mint profile to filter specific mint tokens
          const { filterString, parameters } =
            this.getMintProfilePricesQueryAndParams(value as string[]);
          this.whereCustom(filterString, QueryLogicalOperator.AND, parameters);
        } else {
          this.where(
            key,
            value as string[] | number[],
            QueryConditionOperator.IN,
          );
        }
      } else if (
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'number'
      ) {
        // handle special filter cases
        switch (key) {
          // filter for collection offers docs
          case 'withAttributes':
            if (value === true) {
              this.whereCustom('ARRAY_LENGTH(c.attributes) > 0');
            } else {
              this.whereCustom('ARRAY_LENGTH(c.attributes) = 0');
            }
            break;

          // filter for nft docs
          case 'activeAuction':
            if (value === true) {
              this.whereCustom(
                `(c.saleInfo.deadline = 0 OR c.saleInfo.deadline > ${Math.floor(
                  Date.now() / 1000,
                )})`,
              );
            } else {
              this.whereCustom(
                `(c.saleInfo.deadline != 0 AND c.saleInfo.deadline <= ${Math.floor(
                  Date.now() / 1000,
                )})`,
              );
            }
            break;

          // special case to filter out SFTs that are on sale(as duplicates of the original SFTs)
          case 'sftOriginalDoc':
            if (value === true) {
              this.whereCustom(
                `(c.type = '${EsdtTokenType.NonFungibleESDT}' OR (c.cp_staked = false AND c.onSale = false AND (c.type = '${EsdtTokenType.SemiFungibleESDT}' OR c.type = '${EsdtTokenType.MetaESDT}')))`,
              );
            }
            break;

          // filter for mint profile docs
          case 'activeMint':
            if (value === true) {
              this.whereCustom(
                `(c.endTime = 0 OR c.endTime > ${Math.floor(
                  Date.now() / 1000,
                )})`,
              );
            } else {
              this.whereCustom(
                `(c.endTime != 0 AND c.endTime <= ${Math.floor(
                  Date.now() / 1000,
                )})`,
              );
            }
            break;

          // special case to filter out markets that have debt ceiling reached
          case 'isDebtCeilingReached':
            if (value === true) {
              this.whereCustom(`(c.debtCeilingShort >= c.maxDebtUsdShort)`);
            } else if (value === false) {
              this.whereCustom(`(c.debtCeilingShort < c.maxDebtUsdShort)`);
            }
            break;

          default:
            this.where(
              key,
              value as string | number | boolean,
              QueryConditionOperator.EQUAL,
            );
            break;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Handle nested properties
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          handleFilter(`${key}.${nestedKey}`, nestedValue as unknown);
        }
      }
    };

    for (const [key, value] of Object.entries(filter.filters)) {
      handleFilter(key, value);
    }

    if (filter.includeCount === true) {
      this.count();
    } else {
      if (filter.select && filter.select.length > 0) {
        this.selectFields(filter.select);
      }

      if (filter.orderBy && filter.orderBy.length > 0) {
        for (const order of filter.orderBy) {
          const [field, direction] = order.split(' ');
          this.orderBy(field, direction as QueryOrderDirection);
        }
      }

      this.setOffset(filter.skip ?? 0);
      this.setLimit(filter.top ?? 25);
    }

    return this;
  }

  getMintProfilePricesQueryAndParams(mintToken: string[]) {
    const pricesFilter: string[] = [];
    const parameters: Record<string, string> = {};
    mintToken.forEach((token: string, index: number) => {
      pricesFilter.push(
        `ARRAY_CONTAINS(c.prices, ({'tokenIdentifier': @tokenIdentifier${index}}), true)`,
      );
      parameters[`@tokenIdentifier${index}`] = token;
    });

    const filterString = `(${pricesFilter.join(' OR ')})`;

    return { filterString, parameters };
  }

  getAttributesQueryAndParams(
    key: string,
    attributes: NftMetadataAttributes[],
    traitLogicalOperator: QueryLogicalOperator = QueryLogicalOperator.AND,
  ) {
    const groupedByTrait = this.groupAttributesByTrait(attributes);

    const attributesFilters: string[] = [];
    const parameters: Record<string, string> = {};
    groupedByTrait.forEach(
      (pair: { trait_type: string; values: string[] }, traitIndex: number) => {
        const { trait_type, values } = pair;
        const valuesFilter: string[] = [];
        values.forEach((value: string, valueIndex: number) => {
          valuesFilter.push(
            `ARRAY_CONTAINS(c.${key}, ({'trait_type': @trait${traitIndex}, 'value': @trait${traitIndex}value${valueIndex}}), true)`,
          );
          parameters[`@trait${traitIndex}`] = trait_type;
          parameters[`@trait${traitIndex}value${valueIndex}`] = value;
        });
        attributesFilters.push(`(${valuesFilter.join(' OR ')})`);
      },
    );
    const filterString = `(${attributesFilters.join(` ${traitLogicalOperator} `)})`;

    return { filterString, parameters };
  }

  groupAttributesByTrait(attributes: NftMetadataAttributes[]) {
    type GroupedAttribute = { trait_type: string; values: string[] };
    return attributes.reduce(
      (accumulator: GroupedAttribute[], current: NftMetadataAttributes) => {
        // Find the index of the object with the same trait_type
        const index = accumulator.findIndex(
          (item) => item.trait_type === current.trait_type,
        );

        if (index >= 0) {
          // If found, append the current value to the values array of the found object
          accumulator[index].values.push(current.value);
        } else {
          // If not found, create a new object and add it to the accumulator
          accumulator.push({
            trait_type: current.trait_type,
            values: [current.value],
          });
        }

        return accumulator;
      },
      [] as GroupedAttribute[],
    );
  }
}
