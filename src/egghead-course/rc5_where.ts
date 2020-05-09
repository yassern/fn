// lesson five of egghead's ramda course
import { equals, filter, lt, pipe, pluck, where, __ } from 'ramda'

type Product = { name: string; price: number; category: string; stock: number }
type Products = Product[]

const products: Products = [
  { name: 'Jeans', price: 80, category: 'clothes', stock: 100 },
  { name: 'Hoodie', price: 50, category: 'clothes', stock: 20 },
  { name: 'Sneakers', price: 120, category: 'clothes', stock: 30 },
  { name: 'Cards', price: 35, category: 'games', stock: 10 },
  { name: 'iPhone', price: 649, category: 'electronics', stock: 5 },
  { name: 'Sauce Pan', price: 100, category: 'housewares', stock: 200 },
]

const expectedResult = ['Hoodie']

const stdFilter = (products: Products) => {
  return products
    .filter(p => p.category === 'clothes' && p.stock < 50 && p.price < 100)
    .map(p => p.name)
}

const fnFilter = (products: Products) => {
  const predicate = where({
    category: equals('clothes'),
    stock: lt(__, 50),
    price: lt(__, 100),
  })

  return pipe(filter(predicate), pluck('name'))(products)
}

test('std way', () => expect(stdFilter(products)).toEqual(expectedResult))
test('fn way', () => expect(fnFilter(products)).toEqual(expectedResult))
