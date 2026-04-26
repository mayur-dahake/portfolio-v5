# Sample Routes

## Projects

- `POST /api/projects`
- `GET /api/projects?tag=react&tech=typescript&page=1&limit=10&order=asc`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`

## Experiences

- `POST /api/experiences`
- `GET /api/experiences?company=Acme&isCurrent=true&order=desc`
- `GET /api/experiences/:id`
- `PATCH /api/experiences/:id`
- `DELETE /api/experiences/:id`

## Skills

- `POST /api/skills`
- `GET /api/skills?category=frontend&page=2&limit=20`
- `GET /api/skills/:id`
- `PATCH /api/skills/:id`
- `DELETE /api/skills/:id`

## Profile (singleton)

- `POST /api/profile` (creates only once; second create returns 409)
- `GET /api/profile`
- `PATCH /api/profile/:id`
- `DELETE /api/profile/:id`

## Users

- `POST /api/users`
- `GET /api/users?email=mayur&role=admin&page=1&limit=10&order=asc`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
