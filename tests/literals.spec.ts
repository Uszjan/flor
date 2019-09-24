import { canParse, cantParse } from './utils'
import { Literal, StringLiteral } from '../src/parsers/literals'

test('parse string', (): void => {
  const canParseString = canParse(StringLiteral)
  canParseString([
    '"rafael"',
    '"com espaço"',
    '"l3tra e n1m3ros"',
    '"1 ex3mpl0 mu1t0 d@or@"'
  ])

  const cantParseString = cantParse(StringLiteral)
  cantParseString([
    'erro pq falta aspas',
  ])

  expect(
    StringLiteral.parse('"1 ex3mpl0 mu1t0 d@or@"')
  ).toMatchObject({
    status: true,
    value: {
      name: 'string',
      value: '1 ex3mpl0 mu1t0 d@or@'
    }
  })
})

test('parse literal', (): void => {
  const canParseLiteral = canParse(Literal)
  canParseLiteral([
    '"meu nome"',                 // String
    '10',                         // Number
    'verdadeiro',                 // Boolean
    'falso',                      // Boolean
    'nulo'                        // Null
  ])

  const cantParseLiteral = cantParse(Literal)
  cantParseLiteral([
    'erro pq não é literal',
  ])

  expect(
    Literal.parse('10')
  ).toMatchObject({
    status: true,
    value: {
      name: 'literal',
      value: {
        name: 'number',
        value: 10
      }
    }
  })
})
