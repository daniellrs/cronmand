import { ArchiverOptions } from '../customCommand/archiver/Archiver.interface'
import { DriveOptions } from '../customCommand/drive/Drive.interface'
import Mailer from '../mailer/Mailer'

export interface Options {
  mailer?: Mailer
  sendMailOnFinish?: boolean
  commands?: {
    archiver?: ArchiverOptions
    drive?: DriveOptions
    [propertie: string]: any
  }
}
