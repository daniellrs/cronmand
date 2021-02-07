import { ArchiverOptions } from '../customCommand/commands/archiver/Archiver.interface'
import { DriveOptions } from '../customCommand/commands/drive/Drive.interface'

export interface Options {
  mail?: boolean
  commands?: {
    archiver?: ArchiverOptions
    drive?: DriveOptions
    [propertie: string]: any
  }
}
