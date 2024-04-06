import { partnerIdFromCode, pieceIdFromCode } from "@/app/lib/decoder";

describe('pieceIdFromCode', () => {
  it('returns path and id for a piece code', () => {
    const { path, id } = pieceIdFromCode('piece:1234')

    expect(path).toBe('piece')
    expect(id).toBe('1234')
  })

  it('returns undefined for a partial piece code', () => {
    const { path, id } = pieceIdFromCode('piece:meow')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })

  it('returns undefined for an invalid code', () => {
    const { path, id } = pieceIdFromCode('invalid')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })
})

describe('partnerIdFromCode', () => {
  it('returns path and id for a partner code', () => {
    const { path, id } = partnerIdFromCode('partner:11111111-1111-4111-1000-100000000000')

    expect(path).toBe('partner')
    expect(id).toBe('11111111-1111-4111-1000-100000000000')
  })

  it('returns undefined for a partial partner code', () => {
    const { path, id } = partnerIdFromCode('partner:meow')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })

  it('returns undefined for an invalid code', () => {
    const { path, id } = partnerIdFromCode('invalid')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })
})
