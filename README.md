#  [![Build Status](https://secure.travis-ci.org/mabel/magency.png?branch=master)](http://travis-ci.org/mabel/magency)

> Magency is another (after Nohm) object relational mapper (ORM) written for node.js and redis :) .


## Install

```sh
$ npm install --save magency
```


## Usage

```js
var magency = require('magency');

var Agency = magency('Rainbow').createAgency('your-prefix');
var u1 = Agency.getInstance('User', 'user1', {firstName: 'John', secondName: 'Smith'})
u1.save()

u1 = Agency.getInstance('User', 'user1', {age: 50})
u2.load(function(obj){
    console.log(obj) // {firstName: 'Jack', secondName: 'Quick', age: 50}
})

u1.p('middleName', 'the Nimble')

u1.save()


```


## License

MIT © [Michael Belyakov](http://yababay.ru)
