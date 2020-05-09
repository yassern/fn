// lesson two of egghead's ramda course
import { fromPairs, map, pipe, split, tail } from 'ramda'

const queryString = '?page=2&pageSize=10&total=203'

const expectedResult = {
  page: '2',
  pageSize: '10',
  total: '203',
}

const stdParseQs = (query: string) => {
  const firstCharRemoved = query.slice(1)
  const firstSplit = firstCharRemoved.split('&')
  const pairs = firstSplit.map(piece => piece.split('='))
  const objectsFromArrays = pairs.map(p => ({ [p[0]]: p[1] }))

  const flattenArrayOfObjects = objectsFromArrays.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {}
  )
  return flattenArrayOfObjects
}

const fnParseQs = pipe(tail, split('&'), map(split('=')), fromPairs)

test('std way', () => expect(stdParseQs(queryString)).toEqual(expectedResult))
test('fn way', () => expect(fnParseQs(queryString)).toEqual(expectedResult))
