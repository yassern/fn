// lesson thirteen of egghead's ramda course
import { unfold } from 'ramda'

const expectedResult = [2, 4, 8, 16, 32, 64, 128, 256]

const stdThroughNBaseTwo = (base: number, limit: number): number[] => {
  let n = 1
  const result: number[] = []
  while (n < limit) {
    n = n * base
    result.push(n)
  }
  return result
}

const fnThroughNBaseTwo = (base: number, limit: number): number[] => {
  const fn = n => (n > limit ? false : [n, n * base])
  return unfold(fn, base)
}

test('std way', () => {
  expect(stdThroughNBaseTwo(2, 256)).toEqual(expectedResult)
})

test('fn way', () => {
  expect(fnThroughNBaseTwo(2, 256)).toEqual(expectedResult)
})
