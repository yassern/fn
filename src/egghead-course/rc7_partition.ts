// lesson seven of egghead's ramda course
import { partition, propEq } from 'ramda'

type Pet = { name: string; type: string }
type Pets = Pet[]

const pets: Pets = [
  { name: 'Spike', type: 'dog' },
  { name: 'Mittens', type: 'cat' },
  { name: 'Rover', type: 'dog' },
  { name: 'Fluffy', type: 'cat' },
  { name: 'Fido', type: 'dog' },
]

const expectedResult = [
  [
    { name: 'Spike', type: 'dog' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fido', type: 'dog' },
  ],
  [
    { name: 'Mittens', type: 'cat' },
    { name: 'Fluffy', type: 'cat' },
  ],
]

const stdPartition = (pets: Pets) => {
  return [
    pets.filter(p => p.type === 'dog'),
    pets.filter(p => p.type !== 'dog'),
  ]
}

const fnPartition = partition(propEq('type', 'dog'))

test('std way', () => expect(stdPartition(pets)).toEqual(expectedResult))
test('fn way', () => expect(fnPartition(pets)).toEqual(expectedResult))
