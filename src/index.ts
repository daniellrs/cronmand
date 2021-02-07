import Schedule from './schedule/Schedule'

new Schedule('23 * * * *', ['scm archiver .gitignore'])
new Schedule('24 * * * *', ['scm drive tsconfig.json'])
