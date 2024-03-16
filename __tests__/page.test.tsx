import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

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

  describe('when there is no traveler', () => {
    beforeAll(() => {
      mockMyCookies.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      });
    })

    it('renders a greeting', async () => {
      const PageResolved = await resolvedComponent(Page, {})
      const { getByText } = render(<PageResolved />)

      const greeting = getByText('Welcome Traveler!')

      expect(greeting).toBeInTheDocument()
    })

    it('shows create traveler', async () => {
      const PageResolved = await resolvedComponent(Page, {})
      render(<PageResolved />)

      const input = screen.getByLabelText('What is your name?')
      const hiddenInput = screen.getByTestId('game')

      expect(input).toBeInTheDocument()
      expect(hiddenInput).toBeInTheDocument()
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

      const greeting = getByText(`Welcome Back, ${mockTraveler.name}!`)

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