"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import CreateTravelerForm from '@/app/ui/form/CreateTravelerForm';
import LoginForm from '@/app/ui/form/LoginForm';

export default function AuthenticationForms() {
  const searchParams = useSearchParams();
  const form = searchParams.get('form')

  return (
    <>
      {
        form === 'login' ? <LoginForm /> : <CreateTravelerForm />
      }
      {
        form === 'login' ? (
          <Link
            href="/?form=create"
            className="flex justify-center text-blue-500 text-base underline cursor-pointer">
            Create Traveler
          </Link>
        ) : (
            <Link
              href="/?form=login"
              className="flex justify-center text-blue-500 text-base underline cursor-pointer">
              Log In
            </Link>
        )
      }
    </>
  )
}