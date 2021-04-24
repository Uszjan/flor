import { Expression } from '../../src/parsers/expressions'
import { generatorTester, assignRhs } from '../utils'


test('generate basic expression code', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)

  tryGenerateExpressions([
    ['identificador.key', 'identificador.key'],
    ['identificador["key"]', 'identificador["key"]'],
    ['identificador.chave["key"]', 'identificador.chave["key"]'],
    ['identificador', 'identificador'],
    ['~booleano', '(!booleano)'],
    ['-1', '(-1)'],
    ['1 + 1', '__pf__.add(1,\'+\',1)'],
    ['2 - -1', '__pf__.add(2,\'-\',(-1))'],
    ['5 % 2', '__pf__.term(5,\'%\',2)'],
    ['1 - 1', '__pf__.add(1,\'-\',1)'],
    ['5 * 8', '__pf__.term(5,\'*\',8)'],
    ['5 / 8', '__pf__.term(5,\'/\',8)'],
    ['5 + 1 - 1 * 10', '__pf__.add(5,\'+\',__pf__.add(1,\'-\',__pf__.term(1,\'*\',10)))'],
    ['(5 + 1)', '(__pf__.add(5,\'+\',1))'],
    ['5 > 2', '5>2'],
    ['5 >= 2', '5>=2'],
    ['5 < 2', '5<2'],
    ['5 <= 2', '5<=2'],
    ['5 == 2', '5==2'],
    ['5 igual a 2', '5==2'],
    ['5 != 2', '5!=2'],
    ['5 diferente de 2', '5!=2'],
    ['verdadeiro ou falso', 'true||false'],
    ['verdadeiro e falso', 'true&&false'],
    ['2^3', '(Math.pow(2,3))'],
    ['2^-4', '(Math.pow(2,(-4)))'],
    ['-4^-1', '(Math.pow((-4),(-1)))'],
    ['(-1)^(-3)', '(Math.pow(((-1)),((-3))))'],
    ['base^expoente', '(Math.pow(base,expoente))'],
    ['2^(5 * 2)', '(Math.pow(2,(__pf__.term(5,\'*\',2))))']
  ])
})

test('generate expression function declaration', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)

  tryGenerateExpressions([
    ['funcao(numero) numero = 0 fim', `function(numero=null){\nnumero = ${assignRhs('0')}}`],
    ['funcao () numero = 0 fim', `function(){\nlet numero = ${assignRhs('0')}}`],
    ['funcao (x, y, z) x = y + z fim', `function(x=null,y=null,z=null){\nx = ${assignRhs('__pf__.add(y,\'+\',z)')}}`],
    [
      `funcao (lista)
        aux = lista[0]
        lista[0] = lista[1]
        lista[1] = aux
      fim`,
      `function(lista=null){\nlet aux = ${assignRhs('lista[0]')}lista[0] = ${assignRhs('lista[1]')}lista[1] = ${assignRhs('aux')}}`
    ],
    ['(numero) := numero * 0', '(numero=null) => __pf__.term(numero,\'*\',0)'],
    ['() := Pessoa', '() => Pessoa'],
    ['(x, y) :=  x + y', '(x=null,y=null) => __pf__.add(x,\'+\',y)'],
    [`(x) :=
      x*x`,
      '(x=null) => __pf__.term(x,\'*\',x)'
    ]
  ])
})


test('generate coditional expression declaration', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)
  
  tryGenerateExpressions([
    ['se verdadeiro entao 1 senao 0', '__pf__.cdt_expr(null,true,1,0)'],
    ['se nulo entao 1 senao 0', '__pf__.cdt_expr(null,null,1,0)'],
    ['se 5 > 0 entao 1', '__pf__.cdt_expr(null,5>0,1,)'],
    ['se 0 > 0 entao "hey"', '__pf__.cdt_expr(null,0>0,"hey",)'],
  ])
})

test('generate import expression declaration', (): void => {
  const tryGenerateExpressions = generatorTester(Expression)
  
  tryGenerateExpressions([
    ['importar "arquivo"', 'require("./arquivo")'],
    ['importar "diretorio/arquivo"', 'require("./diretorio/arquivo")'],
    ['importar "../arquivo"', 'require("./../arquivo")'],
    ['importar    "arquivo"', 'require("./arquivo")'],
    ['importar "$fs"', 'require("fs")'],
  ])
})
