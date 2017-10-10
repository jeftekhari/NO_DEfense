(function () {

	var pkg = require('../package.json');
	var board = require('./board');
	var Chance = require('chance').Chance(Math.random);
	var _ = require('lodash');


	var gameInit = function gameInit (options) {
		var self = this;
		var defs = {
			id: Chance.hash(),
			board: {}
		};
		_.extend(self, true, defs, options || {});

	}

	gameInit.prototype = Object.create(Object.prototype);
	gameInit.prototype.constructor = gameInit;

	gameInit.prototype.start = function (input) {
		var self = this;
		if (self != false) {
			console.log('Start');
		}
		self.board = new board({id: Chance.guid(), verbose: self.verbose});

		self.board.setup(input)
		// console.log(self.board.tower.fireRange);
		self.board.tower.sayRange();

		//most important part
		while (self.board.Result.state === null) {
			self.board.nextTurn().playRound().checkState();
		}
		(self.verbose) ? self.board.logResult() : false;

		console.log('END!');
		console.log('==================================================================');

		return self;
	};
	module.exports = gameInit;
}).call(this);