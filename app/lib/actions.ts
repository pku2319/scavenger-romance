'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
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
  const { name, game } = CreateTraveler.parse({
    name: formData.get('name'),
    game: formData.get('game'),
  });
  // Test it out:
  try {
    await sql`
    INSERT INTO travelers (name, game)
    VALUES (${name}, ${game})
  `;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Traveler.',
    };
  }

  cookies().set('traveler', name);
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