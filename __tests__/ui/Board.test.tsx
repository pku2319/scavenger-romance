import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Board from '@/app/ui/components/Board'

// Mock async component
import * as CompletedInfo from '@/app/ui/components/CompletedInfo'
jest.mock('@/app/ui/components/CompletedInfo')

describe('Board', () => {
  it('renders', () => {
    const { getByText } = render(<Board pieces={[]} />);

    const greeting = getByText('Your Board');

    expect(greeting).toBeInTheDocument();
  })

  it('renders pieces', () => {
    const piece = {
      id: 'piece-id',
      pieceid: 1,
      status: 1,
      userid: 'some-id',
      partnerid: null,
      answer: null,
    }

    const { getByText } = render(<Board pieces={[piece]} />);

    const pieceText = getByText('Found');

    expect(pieceText).toBeInTheDocument()
  })

  // The following test uses mocked CompletedInfo instead due to issues
  // with testing async child components
  describe('when piece is completed', () => {
    const mockedCompletedInfo = CompletedInfo.default as jest.MockedFunction<any>

    beforeAll(() => {
      mockedCompletedInfo.mockReturnValue(<div>Completed</div>)
    })

    it('show completed info', () => {
      const piece = {
        id: 'piece-id',
        pieceid: 1,
        status: 2,
        userid: 'some-id',
        partnerid: null,
        answer: null,
      }

      render(<Board pieces={[piece]} />);

      const pieceElement = screen.getByAltText('Puzzle Board picture piece 1');

      fireEvent.click(pieceElement);

      const completedText = screen.getByText('Completed');
      expect(completedText).toBeInTheDocument();

    })
  })
})