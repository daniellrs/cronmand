import { ArchiverOptions } from '../commandManager/archiver/Archiver.interface'
import { DriveOptions } from '../commandManager/drive/Drive.interface'
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
