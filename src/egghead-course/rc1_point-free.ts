// lesson one of egghead's ramda course
import { assoc, converge, identity, pipe, propOr } from 'ramda'

type Person = {
  id?: number
  name: string
}

// find a way to easily reuse the props from type Person
type PersonWithAvatar = {
  id?: number
  name: string
  avatar: string
}

const person: Person = {
  id: 1,
  name: 'Joe',
}

const incompletePerson: Person = {
  name: 'Joe',
}

const generateUrl = id => `https://img.socialnetwork.com/avatar/${id}.png`

const stdGetUpdatedPerson = (person: Person): PersonWithAvatar => {
  return {
    ...person,
    avatar: generateUrl(person.id ?? 'default'),
  }
}

const fnGetUpdatedPerson = (person: Person): PersonWithAvatar => {
  const getUrlFromPerson = pipe(propOr('default', 'id'), generateUrl)
  return converge(assoc('avatar'), [getUrlFromPerson, identity])(person)
}

test('std way', () => {
  expect(stdGetUpdatedPerson(person)).toEqual({
    id: 1,
    name: 'Joe',
    avatar: 'https://img.socialnetwork.com/avatar/1.png',
  })

  expect(stdGetUpdatedPerson(incompletePerson)).toEqual({
    name: 'Joe',
    avatar: 'https://img.socialnetwork.com/avatar/default.png',
  })
})

test('fn way', () => {
  expect(fnGetUpdatedPerson(person)).toEqual({
    id: 1,
    name: 'Joe',
    avatar: 'https://img.socialnetwork.com/avatar/1.png',
  })

  expect(fnGetUpdatedPerson(incompletePerson)).toEqual({
    name: 'Joe',
    avatar: 'https://img.socialnetwork.com/avatar/default.png',
  })
})
