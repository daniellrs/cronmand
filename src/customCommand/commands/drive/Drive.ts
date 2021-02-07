import { Command } from '../../CustomCommand.interface'

export default class Drive implements Command {
  name = 'drive'

  exec(args: string[], options: any): void {
    console.log('Dentro do drive', args)
  }
}
