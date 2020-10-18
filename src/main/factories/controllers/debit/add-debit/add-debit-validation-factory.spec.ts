import { makeAddDebitValidation } from './add-debit-validation-factory'
import { ValidationComposite, RequiredFieldValidation, DateValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { DateValidator } from '../../../../../validation/protocols/date-validator'
jest.mock('../../../../../validation/validators/validation-composite')
const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}
describe('AddProviderValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddDebitValidation()
    const fields = [
      'clientId',
      'reason',
      'date',
      'value'
    ]
    const validations: Validation[] = []
    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new DateValidation('date',makeDateValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
