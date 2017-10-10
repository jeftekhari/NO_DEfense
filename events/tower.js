(function () {
	
	var _ = require('lodash');
	var Chance = require('chance').Chance(Math.random);

	// Creating tower object
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


	//Display Tower's Range
	tower.prototype.sayRange = function(sText) {
		var self = this;
		// console.log(self.firingRange);
		return console.log("Tower" + (sText || '--->Firing range = ' + self.fireRange + 'm'));
	};
	module.exports = tower;
}).call(this);