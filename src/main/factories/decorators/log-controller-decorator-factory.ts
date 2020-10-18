import { Controller } from '../../../presentation/protocols'
import { LogPgRepository } from '../../../infra/bd/postgresql/log/log-repository'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(controller, logPgRepository)
}
