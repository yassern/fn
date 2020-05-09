// lesson three of egghead's ramda course
import { project } from 'ramda'

type Product = { name: string; price: number; category?: string }
type Products = Product[]

const products: Products = [
  { name: 'Jeans', price: 80, category: 'clothes' },
  { name: 'Hoodie', price: 60, category: 'clothes' },
  { name: 'Jacket', price: 120, category: 'clothes' },
  { name: 'Cards', price: 35, category: 'games' },
  { name: 'iPhone', price: 649, category: 'electronics' },
  { name: 'Sauce Pan', price: 100, category: 'housewares' },
]

const expectedResult: Products = [
  { name: 'Jeans', price: 80 },
  { name: 'Hoodie', price: 60 },
  { name: 'Jacket', price: 120 },
  { name: 'Cards', price: 35 },
  { name: 'iPhone', price: 649 },
  { name: 'Sauce Pan', price: 100 },
]

const stdGetNameAndPrice = (products: Products) => {
  return products.map(p => ({ name: p.name, price: p.price }))
}

const fnGetNameAndPrice = project(['name', 'price'])

test('std way', () =>
  expect(stdGetNameAndPrice(products)).toEqual(expectedResult))
test('fn way', () =>
  expect(fnGetNameAndPrice(products)).toEqual(expectedResult))
