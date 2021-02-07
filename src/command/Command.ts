import { exec } from 'child_process'
import CustomCommand from '../customCommand/CustomCommand'
import { Options } from '../schedule/Schedule.interface'
import '../customCommand'

export default class Command {
  static exec(command: string, options: Options): Promise<void> {
    return new Promise((resolve, reject) => {
      if (command.indexOf(CustomCommand.CUSTOM_COMMAND_NAME) === 0) {
        return CustomCommand.exec(
          command.substring(CustomCommand.CUSTOM_COMMAND_NAME.length).trim(),
          options
        )
          .then(resolve)
          .catch(reject)
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error)
          throw error
        }

        console.log(stdout, stderr)
        resolve()
      })
    })
  }
}
