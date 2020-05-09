// lesson six of egghead's ramda course
import { lensProp, over, toUpper } from 'ramda'

type Person = { firstName: string; lastName: string }

const person: Person = {
  firstName: 'Fred',
  lastName: 'Flintstone',
}

const expectedResult = {
  firstName: 'FRED',
  lastName: 'Flintstone',
}

const stdUpperFirstName = (person: Person) => {
  return { ...person, firstName: person.firstName.toUpperCase() }
}

const fnUpperFirstName = over(lensProp('firstName'), toUpper)

test('std way', () => expect(stdUpperFirstName(person)).toEqual(expectedResult))
test('fn way', () => expect(fnUpperFirstName(person)).toEqual(expectedResult))
