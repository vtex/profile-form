import BRA from '../rules/BRA'

const getCnpjField = () =>
  BRA.businessFields.find(field => field.name === 'corporateDocument')

describe('BRA corporateDocument (CNPJ)', () => {
  const { mask, validate } = getCnpjField()

  describe('mask', () => {
    it('masks numeric CNPJ', () => {
      expect(mask('11222333000181')).toBe('11.222.333/0001-81')
    })

    it('masks alphanumeric CNPJ', () => {
      expect(mask('12ABC34501DE35')).toBe('12.ABC.345/01DE-35')
    })

    it('masks lowercase alphanumeric input', () => {
      expect(mask('12abc34501de35')).toBe('12.abc.345/01de-35')
    })
  })

  describe('validate', () => {
    it('accepts valid numeric CNPJ', () => {
      expect(validate('11.222.333/0001-81')).toBe(true)
    })

    it('accepts valid alphanumeric CNPJ', () => {
      expect(validate('12.ABC.345/01DE-35')).toBe(true)
    })

    it('accepts unformatted valid CNPJ', () => {
      expect(validate('11222333000181')).toBe(true)
    })

    it('rejects CNPJ with wrong length', () => {
      expect(validate('11.222.333/0001')).toBe(false)
    })

    it('rejects numeric CNPJ with invalid check digits', () => {
      expect(validate('11.222.333/0001-00')).toBe(false)
    })

    it('rejects alphanumeric CNPJ with invalid check digits', () => {
      expect(validate('12.ABC.345/01DE-00')).toBe(false)
    })

    it('rejects repeated characters', () => {
      expect(validate('00.000.000/0000-00')).toBe(false)
    })
  })
})
