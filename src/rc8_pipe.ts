// lesson eight of egghead's ramda course
import { pipe, sort, head, prop } from 'ramda'

type Team = { name: string; score: number }
type Teams = Team[]

const teams: Teams = [
  { name: 'Lions', score: 5 },
  { name: 'Tigers', score: 4 },
  { name: 'Bears', score: 6 },
  { name: 'Monkeys', score: 2 }
]

const expectedResult = 'Bears'

const sortPredicate = (a: Team, b: Team) => b.score - a.score

const stdGetTopName = (teams: Teams) => {
  const sortedTeams = teams.sort(sortPredicate)
  return sortedTeams[0].name
}

const fnGetTopName = pipe(sort(sortPredicate), head, prop('name'))

test('std way', () => expect(stdGetTopName(teams)).toEqual(expectedResult))
test('fn way', () => expect(fnGetTopName(teams)).toEqual(expectedResult))
