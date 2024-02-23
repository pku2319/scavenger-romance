const { db } = require('@vercel/postgres');

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

    // // Insert data into the "travelers" table
    // const insertedTravelers = await Promise.all(
    //   travelers.map(async (traveler) => {
    //     const hashedPassword = await bcrypt.hash(traveler.password, 10);
    //     return client.sql`
    //     INSERT INTO travelers (id, name, password)
    //     VALUES (${traveler.id}, ${traveler.name}, ${hashedPassword})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   }),
    // );

    // console.log(`Seeded ${insertedTravelers.length} travelers`);

    return {
      createTable,
      // travelers: insertedTravelers,
    };
  } catch (error) {
    console.error('Error seeding travelers:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTravelers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});