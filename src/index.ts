import Schedule from './schedule/Schedule'

new Schedule('* * * * *', ['dir', 'scm archiver -f .gitignore', 'dir'])
// new Schedule('* * * * *', ['dir', 'scm drive tsconfig.json'])
