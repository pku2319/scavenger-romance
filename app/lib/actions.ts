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
    INSERT INTO travelers (name, game, board)
    VALUES (${name}, ${game})
    RETURNING id
  `;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Traveler.',
    };
  }

  try {
    pieceIds.map(async (id) => {
      await sql`
      INSERT INTO pieces (userId, pieceId, status, answer, parnerId)
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

// export type State = {
//   errors?: {
//     name?: string[];
//     game?: string[];
//   };
//   message?: string | null;
// };

// export async function createTraveler(formData: FormData) {
//   const validatedFields = CreateTraveler.safeParse({
//     name: formData.get('name'),
//     game: formData.get('game'),
//   });

//   console.log(validatedFields)

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }

//   const { name, game } = validatedFields.data;

//   try {
//     await sql`
//     INSERT INTO travelers (name, game)
//     VALUES (${name}, ${game})
//   `;
//   } catch (e) {
//     return {
//       message: 'Database Error: Failed to Create Traveler.',
//     };
//   }

//   // revalidatePath('/dashboard/invoices');
//   // redirect('/dashboard/invoices');
// }