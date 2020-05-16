import { add, concat, curry, gt, head, is, length, pipe, prop, __ } from 'ramda'
import { Container, Either, IO, left, Maybe, Right } from '../functors'

// incrF :: Functor f => f Int -> f Int
const incrF = f => f.map(add(1))

// initial :: User -> Maybe String
const initial = user => Maybe.of(user.name).map(head)

// showWelcome :: User -> String
const showWelcome = pipe(prop('name'), concat('Welcome '))

// checkActive :: User -> Either String User
const checkActive = user =>
  user.active ? Either.of(user) : left('Your account is not active')

// eitherWelcome :: User -> Either String String
const eitherWelcome = user => checkActive(user).map(showWelcome)

// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map(_ => user))

// checkValidName :: User -> Boolean
const checkValidName = pipe(prop('name'), length, gt(__, 3))

// validateName :: User -> Either String ()
const validateName = user =>
  checkValidName(user) ? Either.of(user) : left('too short :(')

// save :: User -> IO User
const save = user => new IO(() => ({ ...user.value, saved: true }))

// showWelcomeOrError :: Either String User -> IO String
const showWelcomeOrError = userOrError =>
  is(Right, userOrError)
    ? save(userOrError).map(showWelcome)
    : new IO(() => userOrError.value)

// register :: User -> IO String
const register = pipe(validateUser(validateName), showWelcomeOrError)

const user = { id: 2, name: 'Albert', active: true }
const userEmpty = {}
const userNotActivated = { id: 2, name: 'Albert', active: false }
const userShortName = { id: 2, name: 'Bah', active: true }

test('incrF exercise', () => {
  const container = Container.of(2)
  expect(incrF(container).value).toEqual(3)
})

test('initial exercise', () => {
  const validInitial = initial(user)
  const invalidInitial = initial(userEmpty)

  expect(validInitial.value).toEqual('A')
  expect(invalidInitial.value).toEqual(null)
})

test('eitherWelcome exercise', () => {
  const validWelcome = eitherWelcome(user)
  const invalidWelcome = eitherWelcome(userNotActivated)

  expect(validWelcome.value).toEqual('Welcome Albert')
  expect(invalidWelcome.value).toEqual('Your account is not active')
})

test('eitherWelcome exercise', () => {
  const validRegister = register(user)
  const invalidRegister = register(userShortName)

  expect(validRegister.unsafePerformIO()).toEqual('Welcome Albert')
  expect(invalidRegister.unsafePerformIO()).toEqual('too short :(')
})
