# Product Requirements Document: Modern SaaS Stack Template

## 1. Overview and Objectives

### 1.1 Project Summary

This project aims to create a comprehensive, production-ready monorepo template for building modern SaaS applications. The template will serve as a starting point for developers looking to build multi-purpose SaaS products with a web platform, companion browser extension, and well-documented API.

### 1.2 Business Objectives

- Reduce time-to-market for new SaaS products
- Establish best practices for modern web application development
- Provide a fully-typed, tested, and documented codebase
- Enable AI-assisted development through Cursor editor integration
- Ensure maintainability and scalability of applications built with this template

### 1.3 Success Criteria

- Complete implementation of all specified technologies and integrations
- Comprehensive test coverage across all applications
- Documented code with TypeScript types and JSDoc comments
- Functioning CI/CD pipeline with quality checks
- Ability to deploy to production with minimal configuration

## 2. Target Audience

### 2.1 Primary Users

- Frontend and fullstack developers building SaaS applications
- Development teams looking for a standardized starting point
- Developers interested in AI-assisted coding through Cursor

### 2.2 Secondary Users

- Open source contributors
- Developers evaluating modern tech stacks

## 3. Technical Stack Overview

### 3.1 Repository Structure

A monorepo managed with Turborepo containing three main applications:

1. Platform App (SaaS web application)
2. Documentation App
3. Browser Extension

### 3.2 Core Technologies

#### Platform App

- **Meta-framework**: Tanstack Start
- **Database & Backend**: Convex for database, cloud functions, and storage
- **Styling**: Tailwind CSS v4 and CVA
- **Component Library**: Shadcn-UI
- **Authentication**: Clerk (Social providers: GitHub, Google)
- **Testing**: Vitest (unit), Playwright (e2e), convex-test (backend mocking)
- **Email Handling**: React Email and Resend
- **Code Quality**: Biome.js
- **Error Monitoring**: Sentry
- **Deployment**: Netlify

#### Documentation App

- **Framework**: Astro Starlight
- **Features**: Interactive examples/playground, internationalization
- **API Documentation**: OpenAPI integration
- **Code Documentation**: TypeDoc

#### Browser Extension

- **Framework**: React
- **Authentication**: Clerk integration
- **Backend Integration**: Convex
- **Manifest**: v3 compliant

### 3.3 DevOps & Quality Assurance

- **CI/CD**: GitHub Actions
- **Testing**: PR testing, linting, code coverage, performance testing
- **Deployment**: Automated deployment to Netlify
- **Monitoring**: Bundle size checking, Sentry integration

## 4. Detailed Requirements

### 4.1 Platform App Requirements

#### 4.1.1 Core Features

- User dashboard with customizable widgets
- Subscription management integration
- Admin panel with role-based access
- System notifications and messaging
- Changelog and feature voting/roadmap
- User profiles with avatar upload

#### 4.1.2 Authentication

- Social authentication (GitHub, Google)
- No password authentication
- Role-based access control with three levels:
  - Admin: Full access to all features and settings
  - Editor: Access to create and modify content, limited administrative functions
  - Viewer: Read-only access to authorized content

#### 4.1.3 API

- RESTful API built with Hono handlers
- Auto-generated OpenAPI documentation
- Security features:
  - CORS configuration
  - Authentication middleware
  - Security headers (Content Security Policy, etc.)
  - Rate limiting
- Comprehensive testing strategy:
  - PACT for contract testing
  - Vitest + SuperTest for unit/integration testing
  - Dredd for OpenAPI specification validation
  - Postman/Newman for e2e API testing

#### 4.1.4 Internationalization

- Multi-language support using i18n
- Right-to-left (RTL) text support
- Date, time, and number formatting

#### 4.1.5 Data Models

- User Profiles
  - Basic information (name, email, etc.)
  - Preferences and settings
  - Role assignments
- Subscription/Payment
  - Integration with payment provider
  - Subscription plans and status
  - Billing history
- System Content
  - Notifications and messages
  - Changelog entries
  - Feature roadmap items with voting capability

#### 4.1.6 Cloud Functions

- User avatar upload and management
- Notification delivery
- Subscription management
- Feature voting functionality

### 4.2 Documentation App Requirements

#### 4.2.1 Content Sections

- Getting Started guide
- Installation and setup instructions
- Platform API documentation (OpenAPI)
- Browser extension documentation
- Component library showcase
- Interactive examples and playground
- Development guidelines
- Deployment instructions

#### 4.2.2 Features

- Full internationalization support
- Interactive code examples
- API playground for testing endpoints
- Dark/light mode
- Search functionality
- TypeDoc integration for code documentation

### 4.3 Browser Extension Requirements

#### 4.3.1 Core Functionality

- Authentication with Clerk (same account as platform)
- Current page content analysis
- Sidebar UI rendering within web pages
- Communication with SaaS platform API
- Offline capability for basic functions

#### 4.3.2 Technical Requirements

- Manifest v3 compliant
- TypeScript implementation
- Integration with Convex backend
- Cross-browser compatibility (Chrome, Firefox, Edge)

#### 4.3.3 Features

- Content reading from current tab
- Sidebar injection for displaying relevant data
- Context menu integration
- Local storage for user preferences
- Notification system

### 4.4 Development Experience

#### 4.4.1 Cursor Editor Integration

- AI-assisted development guidelines
- Prompt templates for common development tasks
- Documentation on effective AI pair programming
- Code organization optimized for AI assistance

#### 4.4.2 Type Safety

- Full TypeScript implementation across all applications
- Strict type checking enabled
- Shared type definitions between applications
- Type generation for Convex database schemas

#### 4.4.3 Documentation

- JSDoc comments for all significant functions and components
- TypeDoc generation integrated into CI pipeline
- README files for all packages and applications
- Developer guides for common tasks and patterns

## 5. Implementation Phases

### 5.1 Phase 1: Core Infrastructure

- Set up monorepo with Turborepo
- Configure Biome.js for code quality
- Set up CI/CD with GitHub Actions
- Create basic project structure for all three applications
- Implement shared TypeScript configurations

### 5.2 Phase 2: Platform App Foundation

- Implement Tanstack Start configuration
- Set up Convex database and basic models
- Integrate Clerk authentication
- Implement Tailwind CSS v4 with basic theming
- Set up Shadcn-UI component library
- Create email templates with React Email

### 5.3 Phase 3: Documentation and API

- Set up Astro Starlight documentation site
- Implement OpenAPI specification and auto-generation
- Create Hono API handlers with security features
- Set up TypeDoc generation
- Implement internationalization for documentation

### 5.4 Phase 4: Browser Extension

- Create browser extension scaffold
- Implement authentication with Clerk
- Set up content script for page analysis
- Create sidebar UI components
- Implement communication with platform API

### 5.5 Phase 5: Testing and Refinement

- Implement comprehensive test suite
- Set up mocking for Convex with convex-test
- Implement contract testing with PACT
- Set up e2e tests with Playwright
- Create example tests for all applications

### 5.6 Phase 6: Deployment and Documentation

- Configure Netlify deployment
- Set up Sentry error monitoring
- Complete all documentation
- Create example applications
- Create contributor guidelines

## 6. Technical Considerations

### 6.1 Performance

- Implement code splitting and lazy loading
- Optimize bundle sizes with monitoring in CI
- Implement caching strategies for API and database queries
- Use edge functions where appropriate

### 6.2 Security

- Implement proper authentication flows
- Set up security headers and CORS configuration
- Rate limit API endpoints
- Implement proper input validation
- Set up security scanning in CI pipeline

### 6.3 Scalability

- Design database schemas for scalability
- Implement pagination for list endpoints
- Use efficient indexing for database queries
- Implement proper caching strategies

### 6.4 Accessibility

- Ensure WCAG 2.1 compliance
- Implement proper focus management
- Use semantic HTML throughout
- Provide color contrast utilities
- Test with screen readers

## 7. Testing Strategy

### 7.1 Unit Testing

- Use Vitest for component and utility testing
- Aim for meaningful coverage of business logic
- Implement snapshot testing for UI components
- Mock external dependencies appropriately

### 7.2 Integration Testing

- Test API endpoints with SuperTest
- Verify database operations with convex-test
- Test authentication flows
- Validate form submissions and data processing

### 7.3 End-to-End Testing

- Use Playwright for critical user journeys
- Test cross-browser compatibility
- Verify third-party integrations
- Test responsive design across device sizes

### 7.4 Contract Testing

- Implement PACT for service contracts
- Verify API specifications match implementation with Dredd
- Test browser extension communication with platform

### 7.5 Automated Quality Checks

- Lint code with Biome.js
- Verify type safety with TypeScript
- Check bundle sizes
- Validate accessibility with automated tools
- Monitor performance metrics

## 8. Deployment and DevOps

### 8.1 CI/CD Pipeline

- Run tests on pull requests
- Check code quality and formatting
- Verify bundle sizes
- Generate documentation
- Deploy preview environments

### 8.2 Deployment Targets

- Configure Netlify for platform and documentation apps
- Set up browser extension publishing workflow
- Configure Convex deployment

### 8.3 Monitoring

- Implement Sentry for error tracking
- Set up performance monitoring
- Monitor API usage and rate limits
- Track authentication failures

## 9. Future Considerations

### 9.1 Potential Enhancements

- Additional authentication providers
- Enhanced analytics integration
- Mobile app template
- Advanced AI features
- Additional payment providers
- WebSocket support for real-time features

### 9.2 Maintenance Strategy

- Regular dependency updates
- Security patch process
- Deprecation policy
- Versioning strategy

## 10. Technical Dependencies

### 10.1 Core Dependencies

- Tanstack Start
- Convex
- Tailwind CSS v4
- Clerk
- Turborepo
- Shadcn-UI
- Vitest
- Playwright
- React Email
- Resend
- Biome.js
- Sentry
- Astro Starlight
- Hono

### 10.2 Development Dependencies

- TypeScript
- Biome.js (for linting and formatting)
- TypeDoc
- PACT
- SuperTest
- Dredd
- Postman/Newman

## 11. Acceptance Criteria

The template will be considered complete when:

1. All three applications (platform, documentation, browser extension) are implemented and working together
2. Full test coverage is achieved according to the testing strategy
3. All CI/CD pipelines are functioning properly
4. Documentation is complete and accessible
5. All security measures are implemented and verified
6. The template can be deployed with minimal configuration
7. Type safety is ensured across the entire codebase
8. All specified features are implemented and working properly
9. The development experience, including Cursor editor support, is documented and optimized

# Modern SaaS Stack Template Implementation Tasks

This document breaks down the PRD into actionable tasks organized by vertical feature scopes that can be implemented by an AI coding assistant.

## 1. Project Setup and Infrastructure

### 1.1. Monorepo Configuration

- [x] Initialize Git repository
- [x] Set up Turborepo configuration
- [x] Configure Biome.js for linting and formatting
- [x] Create shared TypeScript configuration
- [x] Set up package.json for workspace management
- [ ] Configure build pipeline with dependency graph
- [x] Create basic README.md with project overview

### 1.2. CI/CD Pipeline

- [ ] Create GitHub Actions workflow for testing
- [ ] Configure linting checks in CI
- [ ] Set up TypeScript type checking in CI
- [ ] Create workflow for bundle size monitoring
- [ ] Set up code coverage reporting
- [ ] Configure Netlify deployment integration
- [ ] Create release automation with changelog generation
- [ ] Set up security scanning for dependencies

### 1.3. Development Environment

- [ ] Create development environment setup documentation
- [ ] Set up Docker configuration for local development
- [ ] Create VS Code workspace settings
- [ ] Set up debugging configurations
- [ ] Document Cursor AI assistance setup and best practices

## 2. Platform App Core

### 2.1. App Scaffolding

- [ ] Initialize Tanstack Start application
- [ ] Configure Tailwind CSS v4
- [ ] Set up Shadcn-UI component library
- [ ] Create base layout and navigation structure
- [ ] Implement dark/light mode theming
- [ ] Configure internationalization with language switching
- [ ] Set up responsive design foundations

### 2.2. Authentication System

- [ ] Integrate Clerk authentication
- [ ] Configure GitHub OAuth provider
- [ ] Configure Google OAuth provider
- [ ] Create authentication guards for protected routes
- [ ] Implement role-based access control (admin, editor, viewer)
- [ ] Create user session management
- [ ] Set up authentication hook for component access control

### 2.3. Data Layer and Backend

- [ ] Set up Convex project configuration
- [ ] Create database schema for user profiles
- [ ] Implement schema for subscription/payment data
- [ ] Create schema for system messages and notifications
- [ ] Implement schema for changelog and feature voting
- [ ] Set up database indexes for efficient queries
- [ ] Create data validation utilities

### 2.4. Cloud Functions

- [ ] Implement user management functions
- [ ] Create file upload functionality for avatars
- [ ] Implement notification dispatch functions
- [ ] Create subscription management functions
- [ ] Implement feature voting functions
- [ ] Set up scheduled tasks for maintenance
- [ ] Create utility functions for common operations

## 3. User Dashboard and Admin Panel

### 3.1. User Dashboard

- [ ] Create dashboard layout and navigation
- [ ] Implement user profile management UI
- [ ] Create customizable widget system
- [ ] Implement activity feed component
- [ ] Create notification center component
- [ ] Implement subscription management interface
- [ ] Create feature voting and roadmap interface

### 3.2. Admin Panel

- [ ] Create admin panel layout and navigation
- [ ] Implement user management interface
- [ ] Create content management system
- [ ] Implement system message administration
- [ ] Create analytics dashboard
- [ ] Implement role management interface
- [ ] Create feature management and roadmap administration

### 3.3. Subscription Management

- [ ] Integrate with payment provider
- [ ] Create subscription plans management
- [ ] Implement payment processing flows
- [ ] Create billing history interface
- [ ] Implement subscription status management
- [ ] Create payment method management UI
- [ ] Implement subscription upgrade/downgrade flows

## 4. Email and Notification System

### 4.1. Email System

- [ ] Set up React Email configuration
- [ ] Integrate with Resend for email delivery
- [ ] Create email templates for authentication
- [ ] Implement email templates for notifications
- [ ] Create email templates for subscription events
- [ ] Implement HTML and text email variants
- [ ] Create email preview functionality

### 4.2. Notification System

- [ ] Create in-app notification system
- [ ] Implement notification preferences management
- [ ] Create notification delivery logic
- [ ] Implement real-time notification updates
- [ ] Create notification history view
- [ ] Implement notification read/unread states
- [ ] Create notification batch processing

## 5. API Layer

### 5.1. API Foundation

- [ ] Set up Hono API handlers
- [ ] Implement authentication middleware
- [ ] Create CORS configuration
- [ ] Implement security headers
- [ ] Set up rate limiting
- [ ] Create error handling middleware
- [ ] Implement request validation

### 5.2. API Documentation

- [ ] Create OpenAPI specification
- [ ] Set up auto-generation from handlers
- [ ] Implement API documentation UI
- [ ] Create API examples and usage guide
- [ ] Implement API versioning strategy
- [ ] Create API changelog
- [ ] Document API authentication flows

### 5.3. API Testing

- [ ] Set up PACT for contract testing
- [ ] Implement SuperTest for integration testing
- [ ] Configure Dredd for OpenAPI validation
- [ ] Create Postman/Newman test collection
- [ ] Implement API load testing
- [ ] Create API security testing
- [ ] Set up API monitoring

## 6. Documentation App

### 6.1. Documentation Scaffolding

- [ ] Initialize Astro Starlight project
- [ ] Configure site structure and navigation
- [ ] Set up internationalization
- [ ] Create custom components for documentation
- [ ] Implement search functionality
- [ ] Configure dark/light mode
- [ ] Set up responsive design

### 6.2. Content Creation

- [ ] Create getting started guide
- [ ] Write installation instructions
- [ ] Develop component library documentation
- [ ] Create API usage documentation
- [ ] Write deployment guides
- [ ] Create troubleshooting section
- [ ] Implement development workflow documentation

### 6.3. Interactive Examples

- [ ] Create code playground infrastructure
- [ ] Implement component showcase
- [ ] Create API interactive examples
- [ ] Implement live editor for code examples
- [ ] Create sandboxed execution environment
- [ ] Implement example state persistence
- [ ] Create copy-to-clipboard functionality

### 6.4. Code Documentation

- [ ] Set up TypeDoc integration
- [ ] Create API reference documentation
- [ ] Implement type definition documentation
- [ ] Create generated documentation pipeline in CI
- [ ] Implement versioned documentation
- [ ] Create component props documentation
- [ ] Implement search for code documentation

## 7. Browser Extension

### 7.1. Extension Scaffolding

- [ ] Create manifest v3 configuration
- [ ] Set up React for extension development
- [ ] Configure build process for extension
- [ ] Create popup interface
- [ ] Implement options page
- [ ] Create content script infrastructure
- [ ] Set up background worker

### 7.2. Core Functionality

- [ ] Implement content analysis on current page
- [ ] Create sidebar injection mechanism
- [ ] Implement data visualization components
- [ ] Create context menu integration
- [ ] Implement browser storage for preferences
- [ ] Set up messaging between extension components
- [ ] Create offline capability

### 7.3. Authentication and API

- [ ] Integrate Clerk authentication
- [ ] Implement token management for extension
- [ ] Create API client for Convex backend
- [ ] Implement caching for API requests
- [ ] Create error handling for offline state
- [ ] Implement data synchronization
- [ ] Set up secure storage for credentials

## 8. Testing Framework

### 8.1. Unit Testing

- [ ] Set up Vitest configuration
- [ ] Create test utilities and mocks
- [ ] Implement component unit tests
- [ ] Create utility function tests
- [ ] Implement hook testing
- [ ] Create snapshot tests for UI components
- [ ] Set up test coverage reporting

### 8.2. Integration Testing

- [ ] Set up integration test environment
- [ ] Implement API integration tests
- [ ] Create authentication flow tests
- [ ] Implement database operation tests with convex-test
- [ ] Create form submission tests
- [ ] Implement cross-component integration tests
- [ ] Create error handling tests

### 8.3. End-to-End Testing

- [ ] Configure Playwright setup
- [ ] Create user journey tests
- [ ] Implement authentication E2E tests
- [ ] Create admin panel E2E tests
- [ ] Implement subscription flow E2E tests
- [ ] Create browser extension E2E tests
- [ ] Implement cross-browser testing

## 9. Performance and Monitoring

### 9.1. Error Tracking

- [ ] Set up Sentry integration
- [ ] Configure error boundaries in React
- [ ] Implement API error tracking
- [ ] Create performance monitoring
- [ ] Set up user feedback collection
- [ ] Implement error reporting workflow
- [ ] Create error analytics dashboard

### 9.2. Performance Optimization

- [ ] Implement code splitting
- [ ] Create bundle size optimization
- [ ] Set up lazy loading for components
- [ ] Implement efficient rendering strategies
- [ ] Create caching mechanisms
- [ ] Optimize API request batching
- [ ] Implement performance profiling

### 9.3. Accessibility

- [ ] Create accessibility testing workflow
- [ ] Implement keyboard navigation
- [ ] Set up screen reader optimization
- [ ] Create high contrast mode
- [ ] Implement focus management
- [ ] Create accessibility documentation
- [ ] Set up automated accessibility testing

## 10. Deployment and Release

### 10.1. Deployment Configuration

- [ ] Set up Netlify configuration for platform app
- [ ] Configure Netlify for documentation app
- [ ] Create browser extension packaging
- [ ] Set up environment variable management
- [ ] Implement staging environment
- [ ] Create production deployment checklist
- [ ] Set up rollback procedures

### 10.2. Release Management

- [ ] Create versioning strategy
- [ ] Implement changelog automation
- [ ] Set up release notes generation
- [ ] Create deployment approval workflow
- [ ] Implement feature flags for gradual rollout
- [ ] Create beta testing program
- [ ] Implement user feedback collection

## 11. Example Implementation

### 11.1. Demo SaaS Application

- [ ] Create example dashboard implementation
- [ ] Implement sample content management
- [ ] Create demo user roles and permissions
- [ ] Implement example subscription flows
- [ ] Create sample notifications and emails
- [ ] Implement example browser extension functionality
- [ ] Create demonstration documentation

## Implementation Strategy for AI Assistance

When working with an AI coding assistant (like one using Cursor), here are strategies for implementation:

1. **Task Breakdown**: Break each task into smaller chunks before requesting implementation.

2. **Context Sharing**: Provide the AI with relevant context from previous implementations.

3. **Iterative Approach**: Implement core functionality first, then refine and extend.

4. **Code Quality**: Always ask the AI to follow best practices for TypeScript, React, and other technologies.

5. **Testing Focus**: Request that the AI include tests with all implementations.

6. **Documentation**: Ask the AI to document code with JSDoc comments and update README files.

7. **Chained Implementation**: When working on related features, reference previous code to ensure consistency.

8. **Feedback Loop**: Review AI-generated code and provide feedback for improvements in subsequent tasks.
