import * as QRCodeScanner from '@/app/ui/components/QRCodeScanner';
jest.mock('@/app/ui/components/QRCodeScanner')

import * as headers from 'next/headers';
jest.mock('next/headers')

import { render, renderResolved, screen } from '../support/renderer';
import Page from '@/app/qr-code/page'
import { fireEvent } from '@testing-library/react';

describe('Page', () => {
  const mockMyCookies = headers.cookies as jest.MockedFunction<any>;
  const mockQrCodeScanner = QRCodeScanner.default as jest.MockedFunction<any>;

  beforeAll(() => {
    mockQrCodeScanner.mockReturnValue(<div>Scanner</div>)
    mockMyCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  })

  it('renders', async () => {
    const PageResolved = await renderResolved({}, Page, {})
    render({}, <PageResolved />)

    expect(screen.getByText('Switch to QR Code')).toBeInTheDocument()
    expect(screen.getByText('Scanner')).toBeInTheDocument()
    expect(screen.getByText('Game Board')).toBeInTheDocument()
  })

  it('switches between the qr code and camera', async () => {
    const PageResolved = await renderResolved({}, Page, {})
    render({}, <PageResolved />)

    const switchButton = screen.getByText('Switch to QR Code')
    expect(switchButton).toBeInTheDocument()
    fireEvent.click(switchButton)
    expect(screen.getByText('Switch to Camera')).toBeInTheDocument()
  })
})