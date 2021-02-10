import CommandManager from './CommandManager'
import Archiver from './archiver/Archiver'
import Drive from './drive/Drive'

CommandManager.add(new Drive())
CommandManager.add(new Archiver())
