'use server';

import { z } from 'zod';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { revalidatePath } from 'next/cache';

import { travelers, pieces } from '@/schema';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Name is required",
  }),
  game: z.enum(['first', 'second'], {
    invalid_type_error: 'Please select a game.',
  }),
});

const db = drizzle(sql);

export async function createTraveler(data: { name: string; game: string; email: string }) {
  let result: QueryResult<QueryResultRow>;

  const { name, game, email } = data

  const pieceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  try {
    result = await db.insert(travelers).values({ name, email, game });
  } catch (e) {
    console.log(e)

    return {
      message: 'Database Error: Failed to Create Traveler.',
    };
  }

  try {
    await db
      .insert(pieces)
      .values({ answer: null, status: 0 })


    pieceIds.map(async (pieceId) => {
      await db.insert(pieces).values({
        travelerId: result.rows[0].id,
        status: 0,
        pieceId,
        answer: null,
        partnerId: null
      })
    })
  } catch (e) {
    console.log(e)

    return {
      message: 'Database Error: Failed to Create Piece.',
    };
  }

  revalidatePath('/');
}

export async function updatePiece(
  travelerId: string, pieceId: number, status: number, answer: string | null, partnerId: string | null) {
  await sql`
    UPDATE pieces
    SET
      status = ${status},
      answer = ${answer},
      partnerId = ${partnerId}
    WHERE
      pieceId = ${pieceId} AND userId = ${travelerId}
  `;
}