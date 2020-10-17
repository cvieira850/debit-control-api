import { geoModel } from './geo'
export interface AddressModel {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: geoModel
}
