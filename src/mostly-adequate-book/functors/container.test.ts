import { concat, prop, toUpper, __ } from 'ramda'
import { Container } from '.'

test('validate container', () => {
  let container: Container

  container = Container.of(2).map(two => two + 2)
  expect(container.value).toEqual(4)

  container = Container.of('flamethrowers').map(toUpper)
  expect(container.value).toEqual('FLAMETHROWERS')

  container = Container.of('bombs').map(concat(__, ' away')).map(prop('length'))
  expect(container.value).toEqual(10)
})
