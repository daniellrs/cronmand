import { Command } from '../../CustomCommand.interface'
import { Param } from '../../CustomCommand.type'

export default class Drive implements Command {
  name = 'drive'

  exec(param: Param, options: any): void {
    console.log('Dentro do drive', param())
  }
}
