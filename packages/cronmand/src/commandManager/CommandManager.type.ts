import { Options } from 'src/schedule/Schedule.interface'

export type Param = (...params: string[]) => string[]
export type ExecFunction = (
  param: Param,
  commandOptions: any,
  options: Options
) => Promise<void> | void
