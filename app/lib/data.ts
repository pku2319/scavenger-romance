import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  Traveler,
} from './definitions';
export async function fetchTravelerById(id: string) {
  noStore();

  try {
    const data = await sql<Traveler>`
      SELECT
        id,
        name,
        board
      FROM travelers
      WHERE id = ${id}
    `;

    const traveler = data.rows[0];
    return traveler;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch traveler.');
  }
}