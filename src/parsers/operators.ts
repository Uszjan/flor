import * as P from 'parsimmon'

export const LeftParenthesis = P.string('(')
export const RightParenthesis = P.string(')')
export const LeftBracket = P.string('[')
export const RightBracket = P.string(']')

export const NotOperator = P.string('!')
export const PlusOperator = P.string('+')
export const MinusOperator = P.string('-')
export const AsteriskOperator = P.string('*')
export const SlashOperator = P.string('/')
export const PercentOperator = P.string('%')

export const Equal = P.string('=')
export const Greater = P.string('>')
export const Less = P.string('<')
export const GreaterEqual = P.string('>=')
export const LessEqual = P.string('<=')

export const EqualOperator = P.string('==')
export const NotEqualOperator = P.string('!=')
export const EqualExprOperator = P.string('igual a')
export const NotEqualExprOperator = P.string('diferente de')

export const AndOperator = P.regexp(/(^|\s)+e(\s|$)+/) // P.string('e')
export const OrOperator = P.regexp(/(^|\s)+ou(\s|$)+/) // P.string('ou')

/** unaryoperator -> ! | + | - */
export const UnaryOperator = P.alt(NotOperator, PlusOperator, MinusOperator)

/** termoperator -> * | / | % */
export const TermOperator = P.alt(AsteriskOperator, SlashOperator, PercentOperator)

/** addoperator -> + | - */
export const AddOperator = P.alt(PlusOperator, MinusOperator)

/** reloperator -> <= | < | >= | > */
export const RelOperator = P.alt(LessEqual, Less, GreaterEqual, Greater)

/** equalityoperator -> == | != */
export const EqualityOperator = P.alt(EqualOperator, NotEqualOperator, EqualExprOperator, NotEqualExprOperator)

export const Do = P.regexp(/(^|\s)+faca(\s|$)+/)
export const End = P.regexp(/(^|\s)+fim(\s|$)+/)

export const If = P.regexp(/(^|\s)+se(\s|$)+/)
export const Then = P.regexp(/(^|\s)+entao(\s|$)+/)
export const Else = P.regexp(/(^|\s)+senao(\s|$)+/)

export const While = P.regexp(/(^|\s)+enquanto(\s|$)+/)
