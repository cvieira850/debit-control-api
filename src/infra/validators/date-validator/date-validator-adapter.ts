import { DateValidator } from '../../../validation/protocols/date-validator'
export class DateValidatorAdapter implements DateValidator {
  isValid (date: string): boolean {
    return (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).test(date)
  }
}
