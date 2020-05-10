import { add, concat, last, map, pipe, prop, reduce, sortBy, __ } from 'ramda'

type Car = {
  name: string
  horsepower: number
  dollar_value: number
  in_stock: boolean
}

const cars: Car[] = [
  {
    name: 'Aston Martin One-70',
    horsepower: 750,
    dollar_value: 1950000,
    in_stock: true,
  },
  {
    name: 'Aston Martin One-72',
    horsepower: 600,
    dollar_value: 1250000,
    in_stock: false,
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: false,
  },
  {
    name: 'Aston Martin One-73',
    horsepower: 900,
    dollar_value: 1450000,
    in_stock: true,
  },
]

// isLastInStock :: [Car] -> Boolean
const isLastInStock = cars => {
  const lastCar = last(cars)
  return prop('in_stock', lastCar)
}
const rfIsLastInStock = pipe(last, prop('in_stock'))

// averageDollarValue :: [Car] -> Int
const average = xs => reduce(add, 0, xs) / xs.length
const averageDollarValue = cars => {
  const dollarValues = map(c => c.dollar_value, cars)
  return average(dollarValues)
}
const rfAverageDollarValue = pipe(map(prop('dollar_value')), average)

// fastestCar :: [Car] -> String
const fastestCar = cars => {
  const sorted = sortBy(car => car.horsepower, cars)
  const fastest = last(sorted)
  return concat(fastest.name, ' is the fastest')
}
const rfFastestCar = pipe(
  sortBy(prop('horsepower')),
  last,
  prop('name'),
  concat(__, ' is the fastest')
)

test('isLastInStock exercise', () => {
  const output = true
  expect(isLastInStock(cars)).toEqual(output)
  expect(rfIsLastInStock(cars)).toEqual(output)
})

test('averageDollarValue exercise', () => {
  const output = 1625000
  expect(averageDollarValue(cars)).toEqual(output)
  expect(rfAverageDollarValue(cars)).toEqual(output)
})

test('averageDollarValue exercise', () => {
  const output = 'Aston Martin One-73 is the fastest'
  expect(fastestCar(cars)).toEqual(output)
  expect(rfFastestCar(cars)).toEqual(output)
})
