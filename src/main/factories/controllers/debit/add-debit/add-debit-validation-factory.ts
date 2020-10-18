
import { ValidationComposite, RequiredFieldValidation, DateValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { DateValidatorAdapter } from '../../../../../infra/validators/date-validator/date-validator-adapter'

export const makeAddDebitValidation = (): ValidationComposite => {
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
  validations.push(new DateValidation('date',new DateValidatorAdapter()))
  return new ValidationComposite(validations)
}
