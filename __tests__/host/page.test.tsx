import { render, screen } from '../support/renderer';
import Page from '@/app/host/page'

describe('Page', () => {
  it('renders', () => {
    render({}, <Page />)

    expect(screen.getByText('QR Codes to Print')).toBeInTheDocument()
    expect(screen.getByText('Piece 1')).toBeInTheDocument()
    expect(screen.queryByText('Game Board')).not.toBeInTheDocument()
  })
})