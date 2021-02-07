import { exec } from 'child_process'
import CustomCommand from '../customCommand/customCommand'
import '../customCommand/commands'

export default class Command {
  static exec(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (command.indexOf(CustomCommand.CUSTOM_COMMAND_NAME) === 0) {
        return CustomCommand.exec(
          command.substring(CustomCommand.CUSTOM_COMMAND_NAME.length).trim()
        )
          .then(resolve)
          .catch(reject)
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject()
          throw error
        }

        console.log(stdout, stderr)
        resolve()
      })
    })
  }
}
