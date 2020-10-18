import { DateValidation } from './date-validation'
import { DateValidator } from '../protocols/date-validator'
import { InvalidParamError } from '../../presentation/errors'

interface SutTypes {
  sut: DateValidation
  dateValidatorStub: DateValidator
}
const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

const makeSut = (): SutTypes => {
  const dateValidatorStub = makeDateValidator()
  const sut = new DateValidation('date',dateValidatorStub)
  return {
    sut,
    dateValidatorStub
  }
}

describe('Date Validation', () => {
  test('Should return an error if an DateValidator returns false ', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub,'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ date: 'invalid_date' })
    expect(error).toEqual(new InvalidParamError('date'))
  })
  test('should call DateValidatorStub with corret date', () => {
    const { sut, dateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dateValidatorStub,'isValid')
    sut.validate({ date: 'invalid_date' })
    expect(isValidSpy).toHaveBeenCalledWith('invalid_date')
  })
  test('Should throw if dateValidator throws ', () => {
    const {
      dateValidatorStub,
      sut
    } = makeSut()
    jest.spyOn(dateValidatorStub,'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
