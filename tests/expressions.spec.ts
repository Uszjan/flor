import { Factor, Unary, Term, Add } from '../src/parsers/expression'
import { canParse, cantParse } from './utils'


test('parse factor', (): void => {
  const canParseFactor = canParse(Factor)
  const cantParseFactor = cantParse(Factor)

  canParseFactor(['5', '(5)', '(-5 * 8)'])
  cantParseFactor(['"5"', '5 - 1', '9 + - 3', '5 -1'])

  expect(Factor.parse('5')).toMatchObject({
    status: true,
    value: {
      name: 'factor',
      value: { name: 'number', value: 5 }
    }
  })
})

test('parse unary', (): void => {
  const canParseUnary = canParse(Unary)
  const cantParseUnary = cantParse(Unary)

  canParseUnary(['5', '-5', '+5', '-(-5)', ])
  cantParseUnary(['- 5', '-+5', '*5', ''])

  expect(Unary.parse('-5')).toMatchObject({
    status: true,
    value: {
      name: 'unary',
      value: { unaryline: '-', factor: {
        name: 'factor', value: { name: 'number', value: 5 }
      }}
    }
  })
})

test('parse term', (): void => {
  const canParseTerm = canParse(Term)
  const cantParseTerm = cantParse(Term)

  canParseTerm(['5*10', '-5*0', '1/5', '2 / (-5)', '2 * -1'])
  cantParseTerm(['1/2/', '2+1', '2 - 1', '*5'])

  expect(Term.parse('2 * 5')).toMatchObject({
    status: true,
    value: {
      name: 'term',
      value: { 
        unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 2 } } } }, 
        termline: { 
          operator: '*', 
          unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 5 } } } } } 
      }
    }
  })
})

test('parse add', (): void => {
  const canParseAdd = canParse(Add)
  const cantParseAdd = cantParse(Add)

  canParseAdd(['5+10', '-5+0', '1-5', '2/(2-5)', '2 - -1'])
  cantParseAdd(['1+2-', '2-*5'])

  // expect(Add.parse('2 * 5')).toMatchObject({
  //   status: true,
  //   value: {
  //     name: 'term',
  //     value: { 
  //       unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 2 } } } }, 
  //       termline: { 
  //         operator: '*', 
  //         unary: { name: 'unary', value: { unaryline: '', factor: { name: 'factor', value: { name: 'number', value: 5 } } } } } 
  //     }
  //   }
  // })
})
