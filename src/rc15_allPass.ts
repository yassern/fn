// lesson fifteen of egghead's ramda course
import { filter, propSatisfies, lte, propEq, allPass } from 'ramda'

type Car = {
  name: string
  doors: number
  mpg: number
}

const cars: Car[] = [
  {
    name: 'suv',
    doors: 4,
    mpg: 19
  },
  {
    name: 'sedan',
    doors: 4,
    mpg: 30
  },
  {
    name: 'hybrid',
    doors: 4,
    mpg: 37
  },
  {
    name: 'compact',
    doors: 2,
    mpg: 32
  }
]

const expectedResult: Car[] = [
  {
    name: 'sedan',
    doors: 4,
    mpg: 30
  },
  {
    name: 'hybrid',
    doors: 4,
    mpg: 37
  }
]

const stdFilter = (cars: Car[]) =>
  cars.filter(c => c.mpg >= 30 && c.doors === 4)

const fnFilter = filter(
  allPass([propSatisfies(lte(30), 'mpg'), propEq('doors', 4)])
)

test('std way', () => {
  expect(stdFilter(cars)).toEqual(expectedResult)
})

test('fn way', () => {
  expect(fnFilter(cars)).toEqual(expectedResult)
})
