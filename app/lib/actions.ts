'use server';

import { z } from 'zod';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Name is required",
  }),
  game: z.enum(['first', 'second'], {
    invalid_type_error: 'Please select a game.',
  }),
});

const CreateTraveler = FormSchema.omit({ id: true });
export async function createTraveler(formData: FormData) {
  let result: QueryResult<QueryResultRow>;
  const { name, game } = CreateTraveler.parse({
    name: formData.get('name'),
    game: formData.get('game'),
  });

  const pieceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  try {
    result = await sql`
    INSERT INTO travelers (name, game)
    VALUES (${name}, ${game})
    RETURNING id
  `;
  } catch (e) {
    console.log(e)

    return {
      message: 'Database Error: Failed to Create Traveler.',
    };
  }
  console.log(result)

  try {
    pieceIds.map(async (id) => {
      await sql`
      INSERT INTO pieces (userId, pieceId, status, answer, partnerId)
      VALUES (${result.rows[0].id}, ${id}, 0, null, null)
      `;
    })
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Piece.',
    };
  }

  cookies().set('traveler', result.rows[0].id);
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