# Skill-15

Spring Boot JWT authentication demo with role-based access control.

## Features

- JWT-based login flow
- Spring Security integration
- Role-based endpoints for admin and employee access
- H2 in-memory database

## Run

```bash
mvn spring-boot:run
```

## Important Endpoints

- `POST /login`
- `GET /admin`
- `GET /employee`
- `GET /h2-console`

## Notes

- Default sample users are initialized on startup.
- The application uses an in-memory H2 database, so data resets when the app restarts.
