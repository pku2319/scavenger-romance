import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  it('renders a greeting', () => {
    const { getByText } = render(<Page />)

    const greeting = getByText('Welcome Traveler')

    expect(greeting).toBeInTheDocument()
  })

  it('has inputs', () => {
    render(<Page />)

    const input = screen.getByLabelText('What is your name?')
    const hiddenInput = screen.getByTestId('game')

    expect(input).toBeInTheDocument()
    expect(hiddenInput).toBeInTheDocument()
  })
})