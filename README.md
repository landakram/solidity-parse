# solidity-parse

[![npm](https://img.shields.io/npm/v/solidity-parse)](https://www.npmjs.com/package/solidity-parse)

> A CLI for [solidity-parser](github.com/solidity-parser/parser).

Parse a .sol file with solidity-parser. By default, the parsed AST is printed 
as JSON to stdout.

This CLI tool can be used in conjuction with text editor plugins to provide a
rich editor environment for Solidity.

## Installation

Install from npm:

```sh
npm install -g solidity-parse
```

## Usage

Parse a file with location information attached to AST nodes:

```sh
solidity-parse --loc ERC20.sol > ast.json
```

Parse from stdin:

```sh
cat ERC20.sol | solidity-parse --loc - > ast.json
```

Other options are available. Use `-h`, which has been copied here:

```
solidity-parse <file>

Parse a .sol file with solidity-parser, an npm package maintained here:
https://github.com/solidity-parser/parser.

By default, the parsed AST is printed as JSON to stdout.

This CLI tool can be used in conjuction with text editor plugins to provide a
rich editor environment for Solidity.

Positionals:
  file  The .sol file that should be parsed. If a file is -, input will be read
        from stdin.                                                     [string]

Options:
      --version       Show version number                              [boolean]
  -l, --loc           Add location information to each node, with start and stop
                      keys that contain the corresponding line and column
                      numbers. Column numbers start from 0, lines start from 1.
                                                                       [boolean]
  -t, --tolerant      Collect syntax errors and place them in a list under the
                      key errors inside the root node of the returned AST.
                                                                       [boolean]
  -r, --range         Add range information to each node, which consists of a
                      two-element array with start and stop character indexes in
                      the input.                                       [boolean]
  -o, --output        Write AST to a file in JSON format. By default, the AST is
                      printed to stdout.                                [string]
  -p, --pretty-print  Pretty-print the JSON output                     [boolean]
  -h, --help          Show help                                        [boolean]
```
