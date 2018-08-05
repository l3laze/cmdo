# cmdo
A small CLI parser inspired by https://github.com/node-js-libs/cli. Can also auto-generate a help page in a style similar to `man` or `usage`.

## **Usage**

```
const cmdo = require('cmdo')

const options = cmdo.parse({
  stringOption: [ 's', 'An option', 'string', 'defaultValue' ],
  numberOption: [ 'n', 'An option', 'number', 1111111 ],
  booleanOption: [ 'b', 'An option', 'boolean', false ]
})
```

Where the format is

> longName: [ 'shortName', 'description', 'type', 'default' ]


Returns an object filled with the options, like:

```
{
  longName: 'value'
}
```
