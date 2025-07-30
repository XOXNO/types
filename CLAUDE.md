# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the @xoxno/types package - a TypeScript library that provides shared types, DTOs, enums, and utilities for the XOXNO API ecosystem. It serves as the central type definition repository for multiple blockchain-related services including NFT marketplace, lending, staking, ticketing, and chat functionality.

## Key Commands

### Build
```bash
npm run build
```
Runs the full build process: generates barrel exports, fixes lint issues, compiles TypeScript, and strips NestJS types for dual export compatibility.

### Development
```bash
npm run build:watch
```
Watches for changes and recompiles TypeScript automatically.

### Linting
```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Auto-fix linting issues
```

## Architecture

### Project Structure
The codebase follows a domain-driven organization pattern:

- **src/enums/**: All enumeration types used across the platform
- **src/cosmos-db/documents/**: Azure Cosmos DB document definitions organized by domain (chat, collection, lending, etc.)
- **src/entities/**: Business entity definitions and DTOs
- **src/requests/**: Request/response DTOs for API endpoints
- **src/common/**: Shared utilities and common types
- **src/utils/**: Helper functions and type utilities
- **src/cache/**: Cache-related types and TTL configurations

### Key Patterns

1. **Dual Export System**: The package exports both plain TypeScript types and NestJS-decorated classes. The `strip-types.js` script creates flattened type versions alongside NestJS class versions (suffixed with "Nest").

2. **Barrel Exports**: Uses automated barrel export generation via `generate-barrel.mjs` to maintain clean exports. The main entry point exports everything, while `/enums` provides a separate entry for enum-only imports.

3. **DTO Pattern**: Extensive use of Data Transfer Objects with NestJS decorators (`@ApiProperty`) for Swagger documentation and validation.

4. **Custom ESLint Rules**: 
   - `fix-uninitialized-properties`: Ensures class properties are properly initialized
   - `api-property-optional-required`: Validates ApiProperty decorators match TypeScript optionality

### Domain Areas

- **NFT Marketplace**: Token metadata, activities, offers, sales
- **Lending**: Market profiles, positions, oracles, analytics
- **Staking**: Pool configurations, delegator data, summaries
- **Ticketing**: Event profiles, tickets, vouchers, guest management
- **Chat**: Messages, conversations, user blocks
- **Web2 Integration**: User wallets, external payments (Stripe, Binance, Twispay)

## Important Notes

- When adding new types, ensure they follow the existing patterns for ApiProperty decorators
- All class properties must be initialized or marked with `!` for definite assignment
- The build process will automatically generate appropriate exports
- This is a shared dependency - changes affect multiple services