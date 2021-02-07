import Schedule from './schedule/schedule'

new Schedule('* * * * *', ['scm drive .gitignore'])
new Schedule('* * * * *', ['scm drive tsconfig.json'])
