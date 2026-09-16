# RMG Incident Management Backend

## Requirements
- Java 21
- Maven 3.9+
- PostgreSQL 14+
- SMTP account for password-reset emails

## Database
Create the database:
```sql
CREATE DATABASE rmg_incident;
```

Update `src/main/resources/application.yml` or use environment variables.

## Run
```bash
mvn clean spring-boot:run
```

Backend:
`http://localhost:8080`

## APIs

### Authentication
POST `/api/auth/register`
POST `/api/auth/login`
POST `/api/auth/forgot-password`
POST `/api/auth/reset-password`

### Location
GET `/api/location/pincode/{pin}`

Example:
`GET /api/location/pincode/201301`

### Incidents
POST `/api/incidents`
GET `/api/incidents?page=0&size=20`
GET `/api/incidents/{id}`
PATCH `/api/incidents/{id}/status`
PATCH `/api/incidents/{id}/assign/{userId}`

## Incident ID
Generated automatically as:
`RMG` + 5 random digits + current year.

Example:
`RMG345712026`

The database has a unique constraint on incident_id.

## Notes
The PIN-code integration uses the India Post Pincode API. Its first PostOffice record's District is returned as the application's `city` field. If the UI needs a specific municipality/town rather than district, extend LocationResponse and map `Name`, `Block`, `District`, and `State` separately.

For production:
- use a strong JWT secret from a secrets manager
- use Flyway/Liquibase instead of ddl-auto=update
- implement SMTP retry/queueing
- add rate limiting to auth endpoints
- add audit/history tables
- add refresh tokens and token revocation
- add integration tests and API documentation
