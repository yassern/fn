import { add, prop, test as rTest } from 'ramda'
import { Maybe } from '.'

test('validate maybe', () => {
  let maybe: Maybe

  maybe = Maybe.of('Malkovich Malkovich').map(rTest(/a/gi))
  expect(maybe.value).toEqual(true)

  maybe = Maybe.of(null).map(rTest(/a/gi))
  expect(maybe.value).toEqual(null)

  maybe = Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10))
  expect(maybe.value).toEqual(null)

  maybe = Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10))
  expect(maybe.value).toEqual(24)
})
