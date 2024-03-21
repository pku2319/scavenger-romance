'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { travelers, pieces } from '@/schema';
import { Traveler } from './definitions';
import { and, eq } from 'drizzle-orm';

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

function isNew(model: any) {
  return model.createdAt === model.updatedAt;
}

export async function createTraveler(data: { name: string; game: string; email: string }) {
  let result: Traveler[];

  const { name, game, email } = data
  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    result = await db
      .insert(travelers)
      .values({ name, email, game, createdAt, updatedAt })
      .onConflictDoUpdate({
        target: [travelers.email, travelers.game],
        set: { updatedAt },
      })
      .returning();
  } catch (e) {
    console.log(e)

    return {
      message: 'Database Error: Failed to Create Traveler.',
    };
  }

  if (isNew(result[0])) {
    await createPieces(result[0].id, createdAt, updatedAt);
  }

  cookies().set('traveler', result[0].id);
  revalidatePath('/');
}

async function createPieces(travelerId: string, createdAt: Date, updatedAt: Date) {
  const pieceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  try {
    pieceIds.map(async (pieceId) => {
      await db.insert(pieces).values({
        travelerId,
        status: 0,
        pieceId,
        answer: null,
        partnerId: null,
        createdAt,
        updatedAt,
      })
    })
  } catch (e) {
    console.log(e)

    return {
      message: 'Database Error: Failed to Create Piece.',
    };
  }
}

export async function updatePiece(
  travelerId: string, pieceId: number, status: number, answer: string | null, partnerId: string | null) {
  await db.update(pieces)
    .set({ status, answer, partnerId })
    .where(and
      (
        eq(pieces.pieceId, pieceId),
        eq(pieces.travelerId, travelerId)
      )
    );
}