const { Space, Tally, List, Grid, Lever, IO } = require('./iocord')

/*
  The 'value' attribute of each instance stores the main data
*/

// Multidimensional Container
const space = new Space(2, 3) // Side Length 2 Cube
console.log(space.point(0, 1, 1)) // x = 0, y = 1, z = 1
console.log(space.assign('foo', 0, 1, 0))

// Tally Chart
const chart = new Tally(['google', 'apple', 'google', 'amazon'])
console.log(chart)
console.log(chart.add('google', -1)) // Subtract 1 Tally Mark 
console.log(chart.add('microsoft', 2)) // New Key and Add 2 Tally Marks
console.log(chart.to([])) // Array Format
console.log(chart.to({})) // Object Format

// Sorted Mutable Array
const list = new List('b', 'a', 'd', 'd', 'a', 'b')
console.log(list.value)
console.log(list.add('c', 'e'))
console.log(list.remove('a', 'b', 'd'))
console.log(list.search('d'))
console.log(list.search('a', 2))

// Column Grid
const board = new Grid(3)
console.log(board)
console.log(board.set(1, 1, 'X'))
console.log(board.get(1, 0))
console.log(board.row(0))
console.log(board.column(1))

// Double State Switch
const lever = new Lever() // Falsy Parameter
console.log(lever.toggle()) // Switches Lever Value
console.log(lever.on()) // Value Becomes 1
console.log(lever.off()) // Value Becomes 0
console.log(lever.set(true))

// Input Output
const system = new IO()
system.print('bg', 'red', 'Error!', lever)
system.log('blue', 'Blue Text', '\n', space)
system.error('Uncaught CustomError at line: 47')
system.warn('Slow network detected!')
system.pass('Installed all dependencies!')

// New Array Methods
console.log([].equals([])) // Empty Arrays Work
console.log([].equals({})) // Type Checking Included
console.log([0, 'a', [], {}].equals([0, 'a', [], {}])) // Better '===' Operator 
console.log(['foo', 'qux'].insert(1, 'bar', 'baz')) // Index Insert
console.log([2, 1, 0].sort()) // Shell Sort
console.log(['foo', 'bar', 'baz'].remove(['foo', 'baz'])) // Remove Items
console.log(['foo', 'bar', 'baz'].delete(1)) // Delete Index
console.log(['foo', 'bar', 'baz'].delete(1, 2)) // Delete After Index
console.log(['a', 'b', 'c', 'd'].index('c')) // Binary Search
console.log([{ a: 'alpha', b: 'beta' }, { a: 'apple' }].match((item) => {
  return item.a === 'apple'
}))
console.log([{ a: 'alpha', b: 'beta' }, { a: 'apple' }].match({ a: 'alpha' }))
console.log([{ a: 'alpha', b: 'beta' }, { a: 'apple' }].match(['b', 'beta']))

// New String Methods
console.log('Iocord'.equals('iocord'))

// New Object Methods
console.log({}.equals({})) // Empty Objects Work
console.log({}.equals([])) // Type Checking Included
console.log({ x: 0, y: [] }.equals({ x: 0, y: [] })) // Better '===' Operator