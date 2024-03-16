import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CompletedInfo from '@/app/ui/components/CompletedInfo'


import * as data from '@/app/lib/data'
jest.mock('@/app/lib/data')

async function resolvedComponent(Component: (arg0: any) => any, props: any) {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}

describe('when piece is completed', () => {
  const mockFetchTravelerById = data.fetchTravelerById as jest.MockedFunction<any>;
  const mockTraveler = {
    id: 'partner-id',
    name: 'Julie',
    game: 'test',
  }

  beforeAll(() => {
    mockFetchTravelerById.mockResolvedValue(mockTraveler);
  })

  it('show completed info', async () => {
    const piece = {
      id: 'piece-id',
      pieceid: 1,
      status: 2,
      userid: 'some-id',
      partnerid: 'partner-id',
      answer: 'answer',
    }

    const CompletedInfoResolved = await resolvedComponent(CompletedInfo, { piece: piece });


    render(<CompletedInfoResolved />);

    const completedPartnerText = screen.getByText(mockTraveler.name);
    const completedAnswerText = screen.getByText(piece.answer);

    expect(completedPartnerText).toBeInTheDocument();
    expect(completedAnswerText).toBeInTheDocument();
  })
})