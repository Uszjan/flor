// Playground code
// import { logAst } from './utils/logger'
import { Program } from './parsers/program'
import { codeGenerator } from './generator/main'
// import { AstNode } from './utils/traverse'

// const astTeste = Program.parse(`i = 0`)
const ast = Program.tryParse(`
  i = 0
  j = 2
  getValues(valor: 0) = 10
`)
console.log(codeGenerator(ast))
