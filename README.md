# Node_SQL

- Express + MySQL demo with EJS views.

## Setup
- Install dependencies:
	- `npm install`
- Create a database and table:
	- Run `sql/schema.sql` in MySQL (creates DB `node` and table `user`).
- Optional sample queries:
	- See `sql/queries.sql`.

## Configuration
- Copy `.env.example` to `.env` and fill values:
	- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
	- `PORT` (default `8080`).

## Run
- Development:
	- `npm run dev`
- Production:
	- `npm start`

## Notes
- Avoid string concatenation in SQL. Prefer prepared statements as shown in `index.js` in most routes.