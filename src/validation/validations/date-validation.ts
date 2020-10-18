import { Validation } from '../../presentation/protocols/validation'
import { InvalidParamError } from '../../presentation/errors'
import { DateValidator } from '../protocols/date-validator'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.dateValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
