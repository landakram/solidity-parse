#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import * as parser from '@solidity-parser/parser'

let argv = yargs(hideBin(process.argv))
    .usage('$0 <file>', `Parse a .sol file with solidity-parser, an npm package maintained here: https://github.com/solidity-parser/parser.

By default, the parsed AST is printed as JSON to stdout. 

This CLI tool can be used in conjuction with text editor plugins to provide a rich editor environment for Solidity.`, (yargs) => {
      yargs.positional('file', {
        describe: 'The .sol file that should be parsed. If a file is -, input will be read from stdin.',
        type: 'string'
      })
    })
    .example('$0 ERC20.sol --loc', 'Parse ERC20.sol with location information on each AST node')
    .option('l', {
      alias: 'loc',
      describe: 'Add location information to each node, with start and stop keys that contain the corresponding line and column numbers. Column numbers start from 0, lines start from 1.',
      type: 'boolean'
    })
    .option('t', {
      alias: 'tolerant',
      describe: 'Collect syntax errors and place them in a list under the key errors inside the root node of the returned AST.',
      type: 'boolean'
    })
    .option('r', {
      alias: 'range',
      describe: 'Add range information to each node, which consists of a two-element array with start and stop character indexes in the input.',
      type: 'boolean'
    })
    .option('o', {
      alias: 'output',
      describe: 'Write AST to a file in JSON format. By default, the AST is printed to stdout.',
      type: 'string'
    })
    .option('p', {
      alias: 'pretty-print',
      describe: 'Pretty-print the JSON output',
      type: 'boolean'
    })
    .help('h')
    .alias('h', 'help')
    .argv
    
// yarg sets argv.file to '' when - is passed, I guess
let filename = argv.file == '-' || argv.file == '' ? 0 : argv.file
let contents = readFileSync(filename).toString()
 
let ast = parser.parse(contents, {
  loc: argv.loc,
  tolerant: argv.tolerant,
  range: argv.range
})

let json = argv.p ? JSON.stringify(ast, null, 2) : JSON.stringify(ast)

if (argv.o) {
  writeFileSync(argv.o, json)
} else {
  console.log(json)
}
