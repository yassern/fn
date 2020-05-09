// lesson fourteen of egghead's ramda course
import { zipObj } from 'ramda'

const getName = () => Promise.resolve('Andrew')
const getHobbies = () =>
  new Promise((res, rej) => res(['kayaking', 'woodworking', 'screencasting']))

const promise = Promise.all([getName(), getHobbies()])

const expectedResult = {
  name: 'Andrew',
  hobbies: ['kayaking', 'woodworking', 'screencasting'],
}

const stdConvertToObj = async promise => {
  const [name, hobbies] = await promise
  return { name, hobbies }
}

const fnConvertToObj = async promise =>
  zipObj(['name', 'hobbies'], await promise)

test('std way', async () => {
  expect(await stdConvertToObj(promise)).toEqual(expectedResult)
})

test('fn way', async () => {
  expect(await fnConvertToObj(promise)).toEqual(expectedResult)
})
