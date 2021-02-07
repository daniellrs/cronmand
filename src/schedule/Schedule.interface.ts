import { ArchiverOptions } from '../customCommand/archiver/Archiver.interface'
import { DriveOptions } from '../customCommand/drive/Drive.interface'

export interface Options {
  mail?: boolean
  commands?: {
    archiver?: ArchiverOptions
    drive?: DriveOptions
    [propertie: string]: any
  }
}
