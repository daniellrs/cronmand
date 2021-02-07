import { ArchiverOptions } from '../customCommand/commands/archiver/Archiver.interface'

export interface Options {
  mail?: boolean
  commands?: {
    archiver?: ArchiverOptions
    [propertie: string]: any
  }
}
