import { concat, prop, toUpper, __ } from 'ramda'

export class Container {
  constructor(public value) {}
  static of = (x: any) => new Container(x)
  public map = (fn: Function) => Container.of(fn(this.value))
}

test('validate container', () => {
  let container: Container

  container = Container.of(2).map(two => two + 2)
  expect(container.value).toEqual(4)

  container = Container.of('flamethrowers').map(toUpper)
  expect(container.value).toEqual('FLAMETHROWERS')

  container = Container.of('bombs').map(concat(__, ' away')).map(prop('length'))
  expect(container.value).toEqual(10)
})
