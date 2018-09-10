# cmdo
A small CLI parser inspired by https://github.com/node-js-libs/cli. Can also auto-generate a help page in a style similar to `man` or `usage`.

## **Usage**

```
const cmdo = require('cmdo')

// Format = longName: [ 'shortName', 'description', 'type', 'default' ]
const cli = {
  stringOption: [ 's', 'An option', 'string', 'defaultValue' ],
  numberOption: [ 'n', 'An option', 'number', 1111111 ],
  booleanOption: [ 'b', 'An option', 'boolean', false ]
}

const options = cmdo.parse(cli)
const man = cmdo.man(cli)
const help = cmdo.help(cli)
```


### `cmdo.parse(options)`
Returns an object filled with the options from process.argv mapped to those from options, like:


```
{
  stringOption: 'defaultValue',
  numberOption: 8
}
```


### `cmdo.man(options)`
Returns a man page-like string for the cli options.


### `cmdo.help(options)`
Returns a usage-like string for the cli options.