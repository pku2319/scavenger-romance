import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Board from '@/app/ui/components/Board'


describe('Board', () => {
  it('renders', () => {
    const { getByText } = render(<Board gameState={[]} />);

    const greeting = getByText('Your Board');

    expect(greeting).toBeInTheDocument();
  })

  // it('has inputs', () => {
  //   render(<Page />)

  //   const input = screen.getByLabelText('What is your name?')
  //   const hiddenInput = screen.getByTestId('game')

  //   expect(input).toBeInTheDocument()
  //   expect(hiddenInput).toBeInTheDocument()
  // })
})