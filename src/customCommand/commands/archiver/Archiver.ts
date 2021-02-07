import { Command } from '../../CustomCommand.interface'
import { Param } from '../../CustomCommand.type'

export default class Archiver implements Command {
  name = 'archiver'

  exec(param: Param, options: any): void {
    console.log('Dentro do archiver', param())
    console.log('f', param('--file', '-f'))
    console.log('d', param('-d'))
    console.log('h', param('-h'))
    console.log('g', param('-g'))
    console.log('batata', param('batata'))
  }
}
