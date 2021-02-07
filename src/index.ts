import Schedule from './schedule/Schedule'

new Schedule('* * * * *', [
  'scm archiver -d ./dist',
  'scm drive -f output.zip',
  'del output.zip',
  'echo backup done!',
])
