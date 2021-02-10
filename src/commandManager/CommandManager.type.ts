export type Param = (...params: string[]) => string[]
export type ExecFunction = (param: Param, options: any) => Promise<void> | void
