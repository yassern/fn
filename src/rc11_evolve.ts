// lesson eleven of egghead's ramda course
import { evolve, toUpper, multiply, inc } from 'ramda'

type Product = {
  name: string
  price: number
  details: { shippingInfo: { weight: number; method: string } }
}

const product: Product = {
  name: 'cog',
  price: 100,
  details: { shippingInfo: { weight: 7, method: 'ups' } }
}

const expectedResult: Product = {
  name: 'COG',
  price: 200,
  details: { shippingInfo: { weight: 8, method: 'ups' } }
}

const stdGetProductEvolved = (product: Product) => {
  // deep clone
  const pClone = JSON.parse(JSON.stringify(product))

  const {
    name,
    price,
    details: {
      shippingInfo: { weight }
    }
  } = pClone

  pClone.name = name.toUpperCase()
  pClone.price = price * 2
  pClone.details.shippingInfo.weight = weight + 1
  return pClone
}

const fnGetProductEvolved = evolve({
  name: toUpper,
  price: multiply(2),
  details: { shippingInfo: { weight: inc } }
})

test('std way', () =>
  expect(stdGetProductEvolved(product)).toEqual(expectedResult))
test('fn way', () =>
  expect(fnGetProductEvolved(product)).toEqual(expectedResult))
