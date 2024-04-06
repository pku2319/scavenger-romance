import '@testing-library/jest-dom'
import { fireEvent, render, renderResolved, screen } from '../support/renderer';

import * as data from '@/app/lib/data'
jest.mock('@/app/lib/data')

import * as headers from 'next/headers';
jest.mock('next/headers')

import * as QRCodeScanner from '@/app/ui/components/QRCodeScanner';
jest.mock('@/app/ui/components/QRCodeScanner')

import Page from '@/app/piece/[id]/page'
import { STATUS_COMPLETED, STATUS_NOT_FOUND } from '@/app/piece/[id]/statuses';

describe('Piece Page', () => {
  const mockFetchTravelerById = data.fetchTravelerById as jest.MockedFunction<any>;
  const mockFetchPiece = data.fetchPiece as jest.MockedFunction<any>;
  const mockQrCodeScanner = QRCodeScanner.default as jest.MockedFunction<any>;

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

    const header = getByText(`Piece: #${mockPiece.piece_id}`)

    expect(header).toBeInTheDocument()
  })

  it('shows completed message if piece completed', async () => {
    const mockPiece = {
      id: 'piece-uuid',
      piece_id: 9,
      status: STATUS_COMPLETED,
      traveler_id: 'some-id',
      partner_id: null,
      answer: null,
    }
    mockFetchPiece.mockResolvedValue(mockPiece);

    const PageResolved = await renderResolved({ travelerId: mockTraveler.id }, Page, {
      params:
        { id: `${mockPiece.piece_id}` }
    })

    render({ travelerId: mockTraveler.id }, <PageResolved />)

    const completionMsg = await screen.findByText("You already completed this piece!")

    expect(completionMsg).toBeInTheDocument()
  })

  it('shows scan qr code if piece is an interaction piece', async () => {
    mockQrCodeScanner.mockReturnValue(<div>Scanner</div>)

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

    render({ travelerId: mockTraveler.id }, <PageResolved />)

    const scanMsg = await screen.findByText("Scan another person's QR Code to complete")

    expect(scanMsg).toBeInTheDocument()

    const scanButton = await screen.findByText('Open Scanner')
    fireEvent.click(scanButton)

    expect(screen.getByText('Close Scanner')).toBeInTheDocument()
  })

  it('claim piece if piece is an individual piece', async () => {
    const mockPiece = {
      id: 'piece-uuid',
      piece_id: 8, //individual question
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

    render({ travelerId: mockTraveler.id }, <PageResolved />)

    const claimMsg = await screen.findByText('Claim Piece!')

    expect(claimMsg).toBeInTheDocument()
  })
})