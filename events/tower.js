(function () {
	
	var _ = require('lodash');
	var Chance = require('chance').Chance(Math.random);

	var tower = function tower (options) {
		var self = this;
		var defs = {
			id: Chance.hash(),
			firingRange: parseInt('0m'),
			verbose: false
		};
		_.extend(self, true, defs, options || {})
	};

	tower.prototype = Object.create(Object.prototype);
	tower.prototype.constructor = tower;



	tower.prototype.sayRange = function(sText) {
		var self = this;
		return (self.verbose
			? console.log(self.constructor.name + (sText || '--->Firing range = ' + self.firingRange + 'm')) : true);
	};
	module.exports = tower;
}).call(this);