## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

Add setup for a local postgres server for development

## Deployment

Pushing to main deploys to Vercel


## Updating the schema

This project uses drizzle-orm and drizzle-kit

1. Make schema changes inside of `schema.ts`, [drizzle-orm-types](https://orm.drizzle.team/docs/column-types/pg)
1. Run `npm run generate` which will spit out a new migration
1. Run `npm run migrate` to actually migrate the db

## License

© @pku2319 All Rights Reserved

## Credits

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
