// lesson twelve of egghead's ramda course
import { propOr, prop, toUpper, tryCatch, pipe, always } from 'ramda'

type Person = {
  name: string
}

const person: Person = {
  name: 'Sally Jones'
}

const expectedPerson = 'SALLY JONES'
const expectedDefault = 'DEFAULT'

const stdGetUpperName = (person?: Person) =>
  (person?.name ?? 'default').toUpperCase()

// const fnGetUpperName = pipe(propOr('default', 'name'), toUpper)
const fnGetUpperName = pipe(prop('name'), tryCatch(toUpper, always('DEFAULT')))

test('std way', () => {
  expect(stdGetUpperName(person)).toEqual(expectedPerson)
  expect(stdGetUpperName(undefined)).toEqual(expectedDefault)
})

test('fn way', () => {
  expect(fnGetUpperName(person)).toEqual(expectedPerson)
  expect(fnGetUpperName(undefined)).toEqual(expectedDefault)
})
