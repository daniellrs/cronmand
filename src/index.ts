import Schedule from './schedule/Schedule'

new Schedule('* * * * *', [
  'scm archiver -d ./dist:dist',
  'scm drive -f output.zip -d backup',
  'del output.zip',
  'echo backup done!',
])

new Schedule('* * * * *', ['scm drive -f .gitignore:text/plain', 'echo backup 2 done!'])
