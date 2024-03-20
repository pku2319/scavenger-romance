import { VercelPgClient, drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import { travelers } from './data';

async function seedTravelers(client: any) {
  try {
    // Insert data into the "travelers" table
    const insertedTravelers = await Promise.all(
      travelers.map(async (traveler) => {
        return client.sql`
        INSERT INTO travelers (id, name, game)
        VALUES (${traveler.id}, ${traveler.name}, ${traveler.game})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedTravelers.length} travelers`);

    return {
      travelers: insertedTravelers,
    };
  } catch (error) {
    console.error('Error seeding travelers:', error);
    throw error;
  }
}

// async function seedPieces(db: VercelPgClient) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "travelers" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS pieces (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         pieceId INT NOT NULL,
//         userId UUID NOT NULL,
//         answer VARCHAR(255),
//         partnerId UUID,
//         status INT NOT NULL,
//         CONSTRAINT user_piece UNIQUE (pieceId, userId)
//       );
//     `;

//     console.log(`Created "pieces" table`);

//     // Insert data into the "pieces" table
//     const insertedPieces = await Promise.all(
//       travelers.map(async (traveler) => {
//         return await Promise.all(traveler.pieces.map((piece) => {
//           return client.sql`
//           INSERT INTO pieces (userId, pieceId, status, answer, partnerId)
//           VALUES (${traveler.id}, ${piece.pieceId}, ${piece.status}, ${piece.answer}, ${piece.partnerId})
//           ON CONFLICT DO NOTHING;
//         `;
//         }))
//       }),
//     );

//     console.log(`Seeded ${insertedPieces.length} pieces`);

//     return {
//       createTable,
//       pieces: insertedPieces,
//     };
//   } catch (error) {
//     console.error('Error seeding pieces:', error);
//     throw error;
//   }
// }

// async function seedBoards(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "boards" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS boards (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         travelerId UUID NOT NULL,
//         values JSONB NOT NULL,
//         CONSTRAINT traveler_board UNIQUE (travelerId)
//       );
//     `;

//     console.log(`Created "boards" table`);

//     // Insert data into the "boards" table
//     const insertedBoards = await Promise.all(
//       boards.map(async (board) => {
//         return client.sql`
//         INSERT INTO boards (id, travelerId, values)
//         VALUES (${board.id}, ${board.travelerId}, ${board.values})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedBoards.length} boards`);

//     return {
//       createTable,
//       boards: insertedBoards,
//     };
//   } catch (error) {
//     console.error('Error seeding boards:', error);
//     throw error;
//   }
// }

async function main() {
  const db = drizzle(sql);

  await seedTravelers(db);
  // await seedPieces(client);

  await sql.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
