// lesson nine of egghead's ramda course
import { includes, pickBy } from 'ramda'

type Product = {
  name: string
  price: number
  shippingWeight: string
  shippingCost: number
}

const product: Product = {
  name: 'widget',
  price: 10,
  shippingWeight: '2 lbs',
  shippingCost: 2,
}

const expectedResult: Partial<Product> = {
  shippingWeight: '2 lbs',
  shippingCost: 2,
}

const stdGetPartialProduct = (matchKey: string, product: Product) => {
  const validKeys = Object.keys(product).filter(k => k.includes(matchKey))
  return validKeys.reduce(
    (acc, currKey) => ({ ...acc, ...{ [currKey]: product[currKey] } }),
    {}
  )
}

const fnGetPartialProduct = (matchKey: string, product: Product) => {
  return pickBy((_, key) => includes(matchKey, key), product)
}

test('std way', () =>
  expect(stdGetPartialProduct('shipping', product)).toEqual(expectedResult))
test('fn way', () =>
  expect(fnGetPartialProduct('shipping', product)).toEqual(expectedResult))
