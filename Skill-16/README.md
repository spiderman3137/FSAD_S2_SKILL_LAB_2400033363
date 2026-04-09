# Skill-16

Spring Boot Student Management backend with CRUD APIs and Swagger UI.

## Features

- Student CRUD operations
- Spring Data JPA with H2 database
- Swagger/OpenAPI documentation
- CORS configuration for frontend integration

## Run

```bash
mvn spring-boot:run
```

## Important Endpoints

- `GET /students`
- `GET /students/{id}`
- `POST /students`
- `PUT /students/{id}`
- `DELETE /students/{id}`
- `GET /swagger-ui/index.html`
- `GET /h2-console`

## Notes

- The app uses an in-memory H2 database, so records are cleared when the server restarts.
