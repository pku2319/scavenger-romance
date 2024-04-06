import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import { ReactElement } from "react";

import { resolvedComponent } from './helpers'

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

import * as headers from 'next/headers';
jest.mock('next/headers')

const mockMyCookies = headers.cookies as jest.MockedFunction<any>;

function customRender(
  options: { travelerId?: string },
  Component: ReactElement
) {
  mockMyCookies.mockReturnValue({
    get: jest.fn().mockReturnValue(options.travelerId || null),
  });

  return render(Component)
}

async function customResolvedRender(
  options: { travelerId?: string },
  Component: (arg0: any) => any,
  props: any) {
  mockMyCookies.mockReturnValue({
    get: jest.fn().mockReturnValue(options.travelerId || null),
  });
  return await resolvedComponent(Component, props)
}

export {
  customRender as render,
  customResolvedRender as renderResolved,
  fireEvent,
  screen,
}