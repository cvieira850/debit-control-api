import { AddressModel } from './address'
import { companyModel } from './company'

export interface ClientModel {
  id: string
  name: string
  username: string
  email: string
  address: AddressModel
  phone: string
  website: string
  company: companyModel
}
