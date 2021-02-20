import archiver from 'archiver'

export interface ArchiverOptions {
  format: archiver.Format
  output: string
  file: string[]
  directory: string[]
}
