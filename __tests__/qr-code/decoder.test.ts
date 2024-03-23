import { decoder } from "@/app/qr-code/decoder";

describe('decoder', () => {
  it('returns path and id for a piece code', () => {
    const { path, id } = decoder('piece:1234')

    expect(path).toBe('piece')
    expect(id).toBe('1234')
  })

  it('returns undefined for a partial piece code', () => {
    const { path, id } = decoder('piece:meow')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })

  it('returns path and id for a partner code', () => {
    const { path, id } = decoder('partner:11111111-1111-4111-1000-100000000000')

    expect(path).toBe('partner')
    expect(id).toBe('11111111-1111-4111-1000-100000000000')
  })

  it('returns undefined for a partial partner code', () => {
    const { path, id } = decoder('partner:meow')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })

  it('returns undefined for an invalid code', () => {
    const { path, id } = decoder('invalid')

    expect(path).toBeUndefined()
    expect(id).toBeUndefined()
  })
})