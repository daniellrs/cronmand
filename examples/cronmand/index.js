const cronmand = require('../../packages/cronmand/dist')
const { Schedule } = cronmand

new Schedule(
  '* * * * *',
  ['mkdir folderA', options => `mkdir ${options.folderName}${Date.now()}`],
  {
    folderName: 'folderB',
  }
)
