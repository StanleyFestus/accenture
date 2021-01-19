const frisby = require('frisby');

it('status ok', function () {
  return frisby.get('https://jsonplaceholder.typicode.com/todos/1')
  .expect('status', 200)
})