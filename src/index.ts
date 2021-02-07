import Schedule from './schedule/Schedule'

new Schedule('* * * * *', [
  'scm archiver -f .gitignore .prettierrc -d src dist -e -h --file yarn.lock -g ok',
])
new Schedule('* * * * *', ['scm drive tsconfig.json'])
