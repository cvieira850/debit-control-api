import { DateValidatorAdapter } from './date-validator-adapter'

interface SutTypes {
  sut: DateValidatorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new DateValidatorAdapter()
  return {
    sut
  }
}
describe('DateValidatorAdapter', () => {
  test('Should return false if date-validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(sut,'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-date')
    expect(isValid).toBe(false)
  })

  test('Should return true if date-validator returns true', () => {
    const { sut } = makeSut()
    jest.spyOn(sut,'isValid').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_date')
    expect(isValid).toBe(true)
  })

  test('Should call date validator with correct date', () => {
    const { sut } = makeSut()
    const isDateSpy = jest.spyOn(sut,'isValid')
    sut.isValid('any-date')
    expect(isDateSpy).toBeCalledWith('any-date')
  })
})
