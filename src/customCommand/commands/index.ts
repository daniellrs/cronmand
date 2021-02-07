import CustomCommand from '../CustomCommand'
import Archiver from './archiver/Archiver'
import Drive from './drive/Drive'

CustomCommand.add(new Drive())
CustomCommand.add(new Archiver())
