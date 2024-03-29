import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

// TODO: This needs to be updated to the ORM way of fetching
import {
  Traveler,
  Piece,
} from './definitions';
export async function fetchTravelerById(id: string) {
  noStore();

  try {
    const data = await sql<Traveler>`
      SELECT
        id,
        name
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

export async function fetchPiecesByTravelerId(id: string) {
  noStore();

  try {
    const data = await sql<Piece>`
      SELECT
        id,
        traveler_id,
        piece_id,
        status,
        partner_id,
        answer
      FROM pieces
      WHERE traveler_id = ${id}
      ORDER BY piece_id
    `;

    const pieces = data.rows;
    return pieces;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch pieces.');
  }
}

export async function fetchPiece(pieceId: string, travelerId: string) {
  noStore();

  try {
    const data = await sql<Piece>`
      SELECT
        id,
        traveler_id,
        piece_id,
        status,
        partner_id,
        answer
      FROM pieces
      WHERE traveler_id = ${travelerId} AND piece_id = ${pieceId}
    `;

    const piece = data.rows[0];
    return piece;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch piece.');
  }
}