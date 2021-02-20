const cronmand = require('../../packages/cronmand/dist')
const drive = require('../../packages/cronmand-drive/dist')
const { Schedule, CommandManager } = cronmand
const { Drive } = drive

CommandManager.add(new Drive())

new Schedule('* * * * *', ['cm drive -f index.js'])
