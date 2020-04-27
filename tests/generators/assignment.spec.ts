import { Assignment } from '../../src/parsers/assignment'
import { Program } from '../../src/parsers/program'
import { generatorTester } from '../utils'


test('test identifier', () => {
  const tryGenerateIdentifier = generatorTester(Assignment)

  tryGenerateIdentifier([
    ['variavel = 0', 'variavel = 0;'],
    ['teste = super.ola()', 'teste = super.ola()\n;'],
    ['teste = super()', 'teste = super()\n;'],
    ['#variavel = "teste"', 'this.variavel = "teste";'],
  ])
});

test('test assignment', () => {
  const tryGenerateAssignment = generatorTester(Assignment)

  tryGenerateAssignment([
    ['variavel = 1', 'variavel = 1;'],
    ['variavel = verdadeiro', 'variavel = true;'],
    ['somar = (x) := x + y', 'somar = (x=null) => x+y;'],
    ['somar = funcao(x, y) soma = x + y fim', 'somar = function(x=null,y=null){\nsoma = x+y;};'],
    ['somar = funcao(x, y) retornar x + y fim', 'somar = function(x=null,y=null){\nreturn x+y};']
  ])
});

test('test assignment with program', () => {
  const tryGenerateAssignment = generatorTester(Program)

  tryGenerateAssignment([
    ['id = 0 variavel = id', 'id = 0;variavel = id;']
  ])
});
