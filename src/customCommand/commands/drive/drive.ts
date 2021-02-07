import { Command } from '../../customCommand.interface'

export default class Drive implements Command {
  name = 'drive'

  exec(args: string[]): void {
    console.log('Dentro do drive', args)
  }
}
