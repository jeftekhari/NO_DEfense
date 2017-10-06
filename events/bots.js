(function () {

	var _ = require('lodash');
	var Chance = require('chance').Chance(Math.random);

	var bot = function bot (options) {
		var self = this;
		var defs = {
			id: Chance.hash(),
			name: 'Bot-' + Chance.first(),
			distCurrent: 0,
			speed: 0,
			killed: false
		};

		_.extend(self, true, defs, options || {});
	};

	bot.prototype = Object.create(Object.prototype);
	bot.prototype.constructor = bot;

	bot.prototype.move = function () {
		var self = this;
		if (!self.killed) {
			var currentDist = self.distCurrent;
			var newDist = Math.max(0, currentDist - self.speed);
			self.distCurrent = newDist;
			if (currentDist !== newDist) {
				var Msg = 'Move ' + self.speed + 'm ---> ' + newDist + 'm';
				self.notify(Msg);
			}
		}

		return self;
	};

	bot.prototype.notify = function (sText) {
		var self = this;
		return (self.verbose ? console.log('\t' + self.name + ':\t' (sText || 'Distance: ' + self.distCurrent + 'm: Speed: ' + self.speed + 'm; ' + (self.killed ? 'DEAD' : 'ALIVE'))) : true);
	};

	module.exports = bot;
}).call(this);