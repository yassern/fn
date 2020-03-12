// lesson six of egghead's ramda course
import { lensProp, over, toUpper } from 'ramda'

type Person = { firstName: string; lastName: string }

const person: Person = {
  firstName: 'Fred',
  lastName: 'Flintstone'
}

const expectedResult = {
  firstName: 'FRED',
  lastName: 'Flintstone'
}

const stdFilter = (person: Person) => {
  const pClone = { ...person }
  pClone.firstName = pClone.firstName.toUpperCase()
  return pClone
}

const fnFilter = (person: Person) => {
  const fLens = lensProp('firstName')
  return over(fLens, toUpper, person)
}

test('std way', () => expect(stdFilter(person)).toEqual(expectedResult))
test('fn way', () => expect(fnFilter(person)).toEqual(expectedResult))
