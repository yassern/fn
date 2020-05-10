import { add, isNil, prop, test as rTest } from 'ramda'

export class Maybe {
  constructor(public value) {}
  static of = (x: any) => new Maybe(x)
  private isNothing = () => isNil(this.value)
  public map = (fn: Function) =>
    this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value))
}

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
