import { filter, reduce, split, test as rTest } from 'ramda'

// words :: String -> [String]
const words = str => split(' ', str)
const rfWords = split(' ')

// filterQs :: [String] -> [String]
const filterQs = xs => filter(x => x.match(/q/i), xs)
const rfFilterQs = filter(rTest(/q/i))

// max :: [Number] -> Number
const max = xs => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs)
const keepHighest = (x, y) => (x >= y ? x : y)
const rfMax = reduce(keepHighest, -Infinity)

test('words exercise', () => {
  const input = 'just an example'
  const output = ['just', 'an', 'example']

  expect(words(input)).toEqual(output)
  expect(rfWords(input)).toEqual(output)
})

test('filter exercise', () => {
  const input = ['abc', 'qwerty', 'xyz']
  const output = ['qwerty']

  expect(filterQs(input)).toEqual(output)
  expect(rfFilterQs(input)).toEqual(output)
})

test('max exercise', () => {
  const input = [3, 2, 6, 3]
  const output = 6

  expect(max(input)).toEqual(output)
  expect(rfMax(input)).toEqual(output)
})
