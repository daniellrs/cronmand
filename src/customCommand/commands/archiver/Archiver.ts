import fs from 'fs'
import archiver from 'archiver'
import { Command } from '../../CustomCommand.interface'
import { Param } from '../../CustomCommand.type'
import { ArchiverOptions } from './Archiver.interface'

export default class Archiver implements Command {
  name = 'archiver'

  exec(param: Param, options: ArchiverOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const format = param('--format')[0] || options.format || 'zip'
      const output = param('-o', '--output')[0] || options.output || `./output.${format}`
      const files = param('-f', '--file') || options.file
      const directory = param('-d', '--directory') || options.directory

      const archive = archiver(format as archiver.Format)
      const writeStream = fs.createWriteStream(output)

      writeStream.on('close', resolve)
      writeStream.on('end', resolve)

      archive.on('warning', err => {
        if (err.code !== 'ENOENT') {
          reject(err)
          throw err
        }
      })

      archive.on('error', err => {
        reject(err)
        throw err
      })

      archive.pipe(writeStream)

      files.forEach(f => archive.file(f, { name: '' }))
      directory.forEach(d => archive.directory(d, false))

      archive.finalize()
    })
  }
}
