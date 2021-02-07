import cron from 'node-cron'
import { Options } from './Schedule.interface'
import Command from '../command/Command'

export default class Schedule {
  constructor(cronExpression: string, commands: string[], options: Options = {}) {
    cron.schedule(cronExpression, async () => {
      for (const command of commands) {
        await Command.exec(command, options)
      }
    })
  }
}
