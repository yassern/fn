// lesson four of egghead's ramda course
import { map, cond, propEq, T, identity, over, lensProp, curry } from 'ramda'

type Product = { name: string; price: number; category: string }
type Products = Product[]

const products: Products = [
  { name: 'Jeans', price: 80, category: 'clothes' },
  { name: 'Cards', price: 5, category: 'games' },
  { name: 'iPhone', price: 649, category: 'electronics' },
  { name: 'Freakonomics', price: 30, category: 'books' }
]

const expectedResult: Products = [
  { name: 'Jeans', price: 40, category: 'clothes' },
  { name: 'Cards', price: 5, category: 'games' },
  { name: 'iPhone', price: 584.1, category: 'electronics' },
  { name: 'Freakonomics', price: 0, category: 'books' }
]

const apply = (perc: number, amt: number) => amt - amt * (perc / 100)

const stdApplyDiscounts = (products: Products) => {
  return products.map(p => {
    const pClone = { ...p }
    let discount: number

    switch (pClone.category) {
      case 'clothes':
        discount = 50
        break
      case 'electronics':
        discount = 10
        break
      case 'books':
        discount = 100
        break
      default:
        discount = 0
        break
    }

    pClone.price = apply(discount, pClone.price)
    return pClone
  })
}

const fnApplyDiscounts = (products: Products) => {
  const pLens = lensProp('price')
  const curriedApply = curry(apply)

  const applyDiscount = (discount: number) =>
    over(pLens, curriedApply(discount))

  // another cond logical functions: ifElse, when, unless
  const adjustPrice = cond([
    [propEq('category', 'clothes'), applyDiscount(50)],
    [propEq('category', 'electronics'), applyDiscount(10)],
    [propEq('category', 'books'), applyDiscount(100)],
    [T, identity]
  ])
  return map(adjustPrice, products)
}

test('std way', () =>
  expect(stdApplyDiscounts(products)).toEqual(expectedResult))

test('fn way', () => expect(fnApplyDiscounts(products)).toEqual(expectedResult))
