import '@testing-library/jest-dom'
import { render, renderResolved, screen } from '../../support/renderer';

import * as data from '@/app/lib/data'
jest.mock('@/app/lib/data')

jest.mock('next/headers')

import Page from '@/app/piece/[id]/partner/[partnerId]/page'
import { STATUS_NOT_FOUND } from '@/app/piece/[id]/statuses';
import pieces from "@/app/lib/pieces.json";

describe('Piece Page', () => {
  const mockFetchTravelerById = data.fetchTravelerById as jest.MockedFunction<any>;
  const mockFetchPiece = data.fetchPiece as jest.MockedFunction<any>;

  describe('when the traveler name does not matter', () => {
    const mockTraveler = {
      id: '1',
      name: 'Tester',
      game: 'test',
    }

    beforeAll(() => {
      mockFetchTravelerById.mockResolvedValue(mockTraveler);
    })

    const mockPiece = {
      id: 'piece-uuid',
      piece_id: 9,
      status: 1,
      traveler_id: 'some-id',
      partner_id: null,
      answer: null,
    }

    it('renders', async () => {
      const mockPiece = {
        id: 'piece-uuid',
        piece_id: 9,
        status: STATUS_NOT_FOUND,
        traveler_id: 'some-id',
        partner_id: null,
        answer: null,
      }

      mockFetchPiece.mockResolvedValue(mockPiece);
      const PageResolved = await renderResolved({ travelerId: mockTraveler.id }, Page, {
        params:
          { id: `${mockPiece.piece_id}` }
      })
      const { getByText } = render({ travelerId: mockTraveler.id }, <PageResolved />)

      const header = getByText(`Piece: #${mockPiece.piece_id} w/ ${mockTraveler.name}`)

      expect(header).toBeInTheDocument()
    })
  })


  describe('when the piece is choice', () => {
    const pieceId = 7
    const mockPiece = {
      id: 'piece-uuid',
      piece_id: pieceId, //choice question
      status: STATUS_NOT_FOUND,
      traveler_id: 'some-id',
      partner_id: null,
      answer: null,
    }

    beforeAll(() => {
      mockFetchPiece.mockResolvedValue(mockPiece);
    })

    it('renders the second prompt when traveler name has odd number of characters', async () => {
      const mockTraveler = {
        id: '1',
        name: 'Odd',
        game: 'test',
      }
      mockFetchTravelerById.mockResolvedValue(mockTraveler);

      const PageResolved = await renderResolved({ travelerId: mockTraveler.id }, Page, {
        params:
          { id: `${mockPiece.piece_id}` }
      })

      render({ travelerId: mockTraveler.id }, <PageResolved />)

      const promptKey = 1
      const prompt = await screen.findByText(pieces[pieceId].prompts[promptKey].prompt)
      const question = await screen.findByText(pieces[pieceId].prompts[promptKey].question)

      expect(prompt).toBeInTheDocument()
      expect(question).toBeInTheDocument()
    })

    it('renders the first prompt when traveler name has even number of characters', async () => {
      const mockTraveler = {
        id: '1',
        name: 'Even',
        game: 'test',
      }
      mockFetchTravelerById.mockResolvedValue(mockTraveler);

      const PageResolved = await renderResolved({ travelerId: mockTraveler.id }, Page, {
        params:
          { id: `${mockPiece.piece_id}` }
      })

      render({ travelerId: mockTraveler.id }, <PageResolved />)

      const promptKey = 0
      const prompt = await screen.findByText(pieces[pieceId].prompts[promptKey].prompt)
      const question = await screen.findByText(pieces[pieceId].prompts[promptKey].question)

      expect(prompt).toBeInTheDocument()
      expect(question).toBeInTheDocument()
    })
  })
})