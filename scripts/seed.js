const { db } = require('@vercel/postgres');

const { travelers } = require('./data');

async function seedTravelers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "travelers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS travelers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        game TEXT NOT NULL,
        CONSTRAINT game_user UNIQUE (game, name)
      );
    `;

    console.log(`Created "travelers" table`);

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
      createTable,
      travelers: insertedTravelers,
    };
  } catch (error) {
    console.error('Error seeding travelers:', error);
    throw error;
  }
}

async function seedPieces(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "travelers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS pieces (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        pieceId INT NOT NULL,
        userId UUID NOT NULL,
        answer VARCHAR(255),
        partnerId UUID,
        status INT NOT NULL,
        CONSTRAINT user_piece UNIQUE (pieceId, userId)
      );
    `;

    console.log(`Created "pieces" table`);

    // Insert data into the "pieces" table
    const insertedPieces = await Promise.all(
      travelers.map(async (traveler) => {
        return await Promise.all(traveler.pieces.map((piece) => {
          return client.sql`
          INSERT INTO pieces (userId, pieceId, status, answer, partnerId)
          VALUES (${traveler.id}, ${piece.pieceId}, ${piece.status}, ${piece.answer}, ${piece.partnerId})
          ON CONFLICT DO NOTHING;
        `;
        }))
      }),
    );

    console.log(`Seeded ${insertedPieces.length} pieces`);

    return {
      createTable,
      pieces: insertedPieces,
    };
  } catch (error) {
    console.error('Error seeding pieces:', error);
    throw error;
  }
}

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
  const client = await db.connect();

  await seedTravelers(client);
  await seedPieces(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
