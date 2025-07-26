# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a comprehensive SaaS Starter monorepo built with Turborepo and PNPM workspaces. The project provides a production-ready template for building modern SaaS applications with web platform, browser extension, and documentation.

### Workspace Layout
- `apps/web/` - TanStack Start web application with Convex backend
- `apps/server/` - Convex serverless functions and database schema
- `apps/docs/` - Astro-based documentation site with Starlight
- `apps/ext/` - WXT browser extension (Chrome/Firefox/Edge)
- `packages/ui/` - Shadcn/ui component library with Radix UI primitives
- `packages/design-system/` - Shared CSS and design tokens
- `tools/` - Shared configurations (TypeScript, Vitest)

## Development Commands

### Core Commands
```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm build                  # Build all packages and apps
pnpm test                   # Run tests across all packages
pnpm lint                   # Run Biome linting
pnpm lint:fix              # Fix linting issues with Biome
pnpm check-types           # Run TypeScript type checking

# AI Development Workflow
pnpm list                  # List tasks via Task Master CLI
pnpm generate              # Generate task files
pnpm parse-prd             # Parse PRD documents for task generation

# Size Monitoring
pnpm size-limit            # Check bundle size limits
pnpm view-report           # View bundle analysis reports

# UI Development
pnpm ui-add                # Add new UI components via generators
```

### Individual App Commands
```bash
# Web app (apps/web)
cd apps/web && pnpm dev    # Dev server on port 3001
cd apps/web && pnpm build  # Production build
cd apps/web && pnpm size-limit  # Check bundle size (150KB JS, 50KB CSS)

# Extension (apps/ext)
cd apps/ext && pnpm dev    # Extension dev mode
cd apps/ext && pnpm build  # Extension build

# Documentation (apps/docs)
cd apps/docs && pnpm dev   # Docs dev server
cd apps/docs && pnpm build # Static docs build
```

## Tech Stack & Architecture

### Frontend Stack
- **Framework**: TanStack Start (React meta-framework)
- **Routing**: TanStack Router with file-based routing and type safety
- **State Management**: TanStack Query (server state) + TanStack Store (client state)
- **Forms**: TanStack Form (replacing react-hook-form)
- **Styling**: Tailwind CSS v4 + CVA (Class Variance Authority)
- **Components**: Shadcn/ui with Radix UI primitives
- **Icons**: Lucide React + Radix UI icons

### Backend Stack
- **Runtime**: Convex serverless platform
- **Database**: Convex (NoSQL with SQL-like queries and real-time subscriptions)
- **Authentication**: better-auth v1.2.7 with social providers
- **Email**: React Email components + Resend delivery
- **Functions**: Convex cloud functions for auth, data, and email

### Development Tools
- **Monorepo**: Turborepo with PNPM workspaces
- **Linting**: Biome.js (replaces ESLint + Prettier)
- **Type Checking**: TypeScript 5.8.3 with strict configuration
- **Testing**: Vitest + jsdom + MSW for mocking
- **Build**: Vite, Turbo orchestration
- **Package Manager**: PNPM v10.12.4, Node ≥18

## Key Patterns & Conventions

### Component Development
- Follow Shadcn/ui patterns with Radix UI primitives
- Use CVA for component variants and styling
- Export interfaces for props (e.g., `AppSidebarProps`, `AppSidebarData`)
- Provide default data exports for easy setup (e.g., `defaultSidebarData`)
- Components should accept data as props rather than hardcoded values

### Database Schema (Convex)
Current schema includes:
```typescript
// Users table
{ email: string } // indexed

// Todos table  
{
  text: string,
  completed: boolean,
  userId: Id<"users">,
  createdAt: number,
  updatedAt: number
}
```

### Convex Function Patterns
- Always use new function syntax with args/returns validators
- Use `query`, `mutation`, `action` for public APIs
- Use `internalQuery`, `internalMutation`, `internalAction` for private functions
- Include `returns: v.null()` for functions that don't return values
- Define indexes following pattern: `by_field1_and_field2` for multiple fields
- Query with `.withIndex()` instead of `.filter()` for performance

### Authentication Flow
- better-auth handles OAuth providers and session management
- Server-side session validation with client hydration
- User data stored in Convex with email indexing

### Task Master Development Workflow
This project includes an AI-powered task management system. Key commands:
- `pnpm list` - View current tasks and status
- `pnpm generate` - Generate task files from tasks.json
- `pnpm parse-prd` - Convert PRD documents to structured tasks

Use MCP server integration when available for better performance than CLI parsing.

## Build & Bundle Constraints

### Size Limits (enforced)
- JavaScript: 150KB maximum
- CSS: 50KB maximum
- Bundle analysis via rollup-plugin-visualizer

### Performance Targets
- TanStack Query for efficient server state caching
- Route-based code splitting via TanStack Router
- Convex provides real-time subscriptions for live data

## Code Quality Standards

### TypeScript Requirements
- Strict TypeScript configuration across all packages
- Use proper Convex types: `Id<"tableName">` for document IDs
- Export interfaces for component props and data structures
- Use `as const` for string literals in discriminated unions

### Biome Configuration
- Tab indentation, double quotes
- Organized imports with framework-specific grouping
- Git-aware linting with ignore file support
- Run `pnpm lint:fix` to automatically fix issues

### Component Library Standards
- Follow Shadcn/ui conventions and file structure
- Use Radix UI primitives as base components
- Implement proper TypeScript interfaces for all props
- Provide sensible defaults and backward compatibility helpers

## AI Development Integration

This codebase is designed for AI-assisted development workflows:
- Cursor rules in `.cursor/rules/` provide domain-specific guidance
- Task Master CLI provides structured task management
- Anthropic Claude integration for development assistance
- Comprehensive TypeScript for better AI code understanding

### Important Cursor Rules
- Follow Convex-specific patterns for database functions
- Use Task Master workflow for complex development cycles
- Implement proper validation and error handling
- Maintain consistency with existing component patterns

## Current Development State

### Recently Completed
- Monorepo setup with Turborepo and PNPM
- UI component library with Shadcn/ui
- Authentication system with better-auth
- Basic web application structure
- Email system foundation
- AppSidebar refactoring to accept props instead of hardcoded data

### Architecture Decisions
- **better-auth over Clerk**: More control and self-hosted capability
- **TanStack Start over Next.js**: Modern, lightweight alternative
- **Convex over traditional databases**: Simplified backend development
- **Biome over ESLint/Prettier**: Faster, unified tooling approach