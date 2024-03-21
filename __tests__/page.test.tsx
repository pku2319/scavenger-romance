import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

const mockNavigation = jest.fn()
jest.mock("next/navigation", () => ({
  useSearchParams: mockNavigation,
}));

import * as headers from 'next/headers';
jest.mock('next/headers')

import * as data from '@/app/lib/data'
jest.mock('@/app/lib/data')

import Page from '@/app/page'

async function resolvedComponent(Component: (arg0: any) => any, props: any) {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}

describe('Page', () => {
  const mockMyCookies = headers.cookies as jest.MockedFunction<any>;
  const mockFetchTravelerById = data.fetchTravelerById as jest.MockedFunction<any>;
  const mockSearchParamsGet = jest.fn();

  describe('when there is no traveler', () => {
    beforeAll(() => {
      mockMyCookies.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      });
      mockNavigation.mockReturnValue({
        get: mockSearchParamsGet
      });
    })

    it('renders', async () => {
      mockSearchParamsGet.mockReturnValueOnce('')

      const PageResolved = await resolvedComponent(Page, {})
      const { getByText } = render(<PageResolved />)

      const greeting = getByText('Welcome Traveler!')

      expect(greeting).toBeInTheDocument()
    })

    it('shows sign up when form is not login', async () => {
      mockSearchParamsGet.mockReturnValueOnce('')

      const PageResolved = await resolvedComponent(Page, {})
      render(<PageResolved />)

      const signupButton = screen.getByText('Sign up (google)')
      const loginLink = screen.getByText('Log In')

      expect(signupButton).toBeInTheDocument()
      expect(loginLink).toBeInTheDocument()
    })

    it('shows login when the form is login', async () => {
      mockSearchParamsGet.mockReturnValueOnce('login')

      const PageResolved = await resolvedComponent(Page, {})
      render(<PageResolved />)

      const loginButton = screen.getByText("Let's Begin")
      const createTravelerLink = screen.getByText('Create Traveler')

      expect(loginButton).toBeInTheDocument()
      expect(createTravelerLink).toBeInTheDocument()
    })
  })


  describe('when there is a traveler', () => {
    const mockTraveler = {
      id: '1',
      name: 'Tester',
      game: 'test',
    }

    beforeAll(() => {
      mockMyCookies.mockReturnValue({
        get: jest.fn().mockReturnValue(mockTraveler.id),
      });
      mockFetchTravelerById.mockResolvedValue(mockTraveler);
    })

    it('renders a greeting', async () => {
      const PageResolved = await resolvedComponent(Page, {})
      const { getByText } = render(<PageResolved />)

      const greeting = getByText(`Welcome ${mockTraveler.name}!`)

      expect(greeting).toBeInTheDocument()
    })

    it('shows board', async () => {
      const PageResolved = await resolvedComponent(Page, {})
      const { getByText } = render(<PageResolved />)

      const boardText = getByText('Your Board')
      expect(boardText).toBeInTheDocument()
    })
  })
})