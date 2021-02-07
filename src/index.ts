import Schedule from './schedule/Schedule'

// new Schedule('* * * * *', [
//   'scm archiver -f .gitignore package.json -d ./dist',
//   'echo archiver done',
// ])
new Schedule('* * * * *', ['scm drive -f .gitignore output.zip tsconfig.json'])
