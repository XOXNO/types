//https://twispay.github.io/
export interface TwispayCustomerDetails {
  /** @minLength 1 */
  identifier: string;
  firstName: string;
  lastName: string;
  country: string; //use https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  state?: string; //mandatory for US and CA; use 2 letters ISO 3166-2:US for US and ISO 3166-2:CA for CA. Eg. NY
  city: string;
  zipCode?: string; // no spaces allowed
  address?: string;
  phone: string; // no spaces allowed
  email: string;
  tags?: string[];
}
