
# Rabbit Coding Challenge

## Environment Setup

You can:
- Install **Node.js** (version 20 or higher).
- Set up **MySQL**.
- Export `DATABASE_URL` with your SQL connection URL (i.e. `mysql://user:password@localhost/database`)

Or:
- Open the repository in a devcontainer or GitHub codespace
- Export `DATABASE_URL` with `export DATABASE_URL=mysql://mysql:mysql@db/mydb` command

Then:
- Run `yarn prisma:generate`
- Run `yarn migrate:dev`
- Run `yarn seed`
- Run `yarn start` or `yarn start:dev`

---
## Assumptions

- Products' API can be paginated, the frontend should accomedate that change
- Infinite scrolling is not used, thus I didn't use cursor pagination
- `cache-manager` v6 must be used, and we can't downgrade to v5. This resulted the use of `@nestjs/cache-manager@3.0.0-next`

## Additional improvements

- Figure out a way for prisma to directly join `productId` with `Product` table.

