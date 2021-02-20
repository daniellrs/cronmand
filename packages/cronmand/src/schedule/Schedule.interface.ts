import Mailer from '../mailer/Mailer'

export interface Options {
  mailer?: Mailer
  sendMailOnFinish?: boolean
  commands?: {
    [propertie: string]: any
  }
}
