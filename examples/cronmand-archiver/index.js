const cronmand = require('../../packages/cronmand/dist')
const archiver = require('../../packages/cronmand-archiver/dist')
const { Schedule, CommandManager } = cronmand
const { Archiver } = archiver

CommandManager.add(new Archiver())

new Schedule('* * * * *', ['cm archiver -f index.js'])
