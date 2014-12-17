var _ = require('underscore')

function getRedis(){
	var redis = require('redis')
	return redis.createClient()
}

var ModelAgency = function(pref, client){
	this.prefix = pref && typeof pref === 'string' ? pref + ':' : ''
	this.getPrefix = function(){return this.prefix}
	this.redis = client ? client : getRedis()
	this.save = function(cb){
		var key = this.prefix + this.id
		var toSave = {}
		_.each(this.properties, function(el, i){
			var val = el
			if(typeof el === 'object') val = JSON.stringify(el)
			toSave[i] = val
		})
		this.redis.hmset(key, toSave, function(err){
			if(err)console.log(err)
			else console.log('saved')
			if(cb) cb(!!err)
		})
	}
	this.load = function(cb){
		var key = this.prefix + this.id
		var mag = this
		console.log(key)
		this.redis.hgetall(key, function(err, obj){
			if(err){console.log(err); cb(null); return}
			if(obj){
				mag.propertis = _.extend(obj, mag.properties, obj)
				if(cb) cb(mag.properties)
			}
		})
	}
	this.p = function(key, val){
		var mag = this
		if(!val) return mag.properties[key]
		mag.properties[key] = val
	}
	this.prop = this.p
	this.property = this.p
}

ModelAgency.prototype.getInstance = function(modelName, id, props){
	var Model = new ModelAgency()
	Model.prefix = this.prefix + modelName.toLowerCase()
	Model.prefix += ':'	
	Model.id = id
	Model.properties = props
	return Model
}

exports.createAgency = function (pref, client) {
	return new ModelAgency(pref)
};
