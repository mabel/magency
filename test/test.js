var sm = require('../');
var Agency = sm.createAgency('cr', null)
//var User = Agency.createModel('User')
//console.log(User.prefix)
var key1 = 'user1'
var key2 = 'user2'
var u1 = Agency.getInstance('User', key1, {age: 70})
var u2 = Agency.getInstance('User', key2, {name: 'Mabel'})
u1.save()
u2.save()
var u3 = Agency.getInstance('User', 'user1', {hz: {a: 'c'}, age: 50})	
u3.load()

