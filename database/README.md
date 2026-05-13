<!-- README.md -->

# PNG Digital Public Infrastructure - Database Schema

## Overview

This database supports the PNG Digital Public Infrastructure system, a comprehensive digital platform for identity verification, service delivery, and government operations.

## Database Architecture

### Core Components

#### 1. **Provinces Table**
- Stores information about PNG's 23 provinces
- Includes province codes, capitals, and regional groupings
- Linked to verified identities for location tracking

#### 2. **Departments Table**
- Stores PNG government departments
- Includes: Health, Education, DHERST, National Planning, NSO, Treasury, Finance, PM's Office, DICT
- Tracks department contacts and budget allocations

#### 3. **NID Verification System**
- **verified_identities**: Main table for verified national IDs
- **nid_verification_status**: Status tracking (Pending, Under Review, Verified, Rejected, etc.)
- **nid_verification_history**: Workflow history and status changes
- **nid_verification_documents**: Linked documents for verification

#### 4. **Audit Logging System**
- **audit_logs**: Complete audit trail for all system activities
- **audit_action_types**: Types of actions (Create, Update, Delete, Verify, etc.)
- **audit_log_summary**: Daily summaries of audit activities
- Tracks user actions, timestamps, IP addresses, and status

#### 5. **User Management & Permissions**
- **system_users**: System user accounts
- **user_roles**: Role definitions (Admin, Verifier, Data Entry, etc.)
- **permissions**: Granular permission definitions
- **role_permissions**: Role-based access control matrix
- **user_sessions**: Session management and tracking

#### 6. **Digital Services**
- **digital_services**: Available services by department
- **service_categories**: Service categorization
- **service_transactions**: Transaction tracking and audit

## Database Relationships

```
provinces
    ├── verified_identities
    │   ├── nid_verification_status
    │   ├── nid_verification_history
    │   ├── nid_verification_documents
    │   └── service_transactions
    │
departments
    ├── verified_identities
    ├── system_users
    ├── audit_logs
    └── digital_services
        ├── service_categories
        └── service_transactions

system_users
    ├── user_roles
    │   └── role_permissions
    │       └── permissions
    └── user_sessions
```

## Key Features

### Security & Audit
- Comprehensive audit logging for compliance
- User session management
- Role-based access control (RBAC)
- Department-level permissions

### NID Verification Workflow
- Multi-status verification process
- Document attachment support
- History tracking for all changes
- Department assignment tracking

### Service Delivery
- Service categorization by department
- Transaction tracking
- NID verification requirement per service
- Usage analytics ready

## Migration Files

Run migrations in order:

```sql
-- 1. Create provinces
psql -U postgres -d dpi_verify_db -f 001_create_provinces.sql

-- 2. Create departments
psql -U postgres -d dpi_verify_db -f 002_create_departments.sql

-- 3. Create NID verification system
psql -U postgres -d dpi_verify_db -f 003_create_nid_verification.sql

-- 4. Create audit logging
psql -U postgres -d dpi_verify_db -f 004_create_audit_log.sql

-- 5. Create users and permissions
psql -U postgres -d dpi_verify_db -f 005_create_users_and_permissions.sql

-- 6. Create digital services
psql -U postgres -d dpi_verify_db -f 006_create_services.sql
```

## Database Connection

**Local Development (WSL + pgAdmin):**
```
Host: localhost
Port: 5432
Database: dpi_verify_db
Username: postgres
```

## Indexing Strategy

All tables include strategic indexes on:
- Primary keys
- Foreign keys
- Common search fields (NID number, username, status)
- Timestamp fields for range queries
- Active status flags

## Future Enhancements

- [ ] Payment processing tables
- [ ] Notification system
- [ ] Mobile app sync tables
- [ ] Data archiving tables
- [ ] Reporting views and materialized views
- [ ] Performance monitoring tables

## Support

For database questions, contact the development team or create an issue in the repository.
