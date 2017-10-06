(function () {


	var tower = require('./tower');
	var bot = require('./bots');

	var _ = require('lodash');
	var Chance = require('chance').Chance(Math.random);


	var board = function board (options) {
		var self = this;
		var defs = {
			id: Chance.hash(),
			Bots: [],
			Result: {
				state: null,
				message: ''
			},
			tower: {},
			Turn: 0,
			States: [
				'WIN',
				'LOSE'
			]
		};

		_.extend(self, true, defs, options || {});
	};

	board.prototype = Object.create(Object.prototype);
	board.prototype.constructor = board;

	board.prototype.setup = function (data) {
		var self = this;
		_.extend(self, true, self.defs);

		var towerFireRange = parseInt(data[0]);
		self.tower = new tower({
			fireRange: towerFireRange,
			id: Chance.guid(),
			verbose: self.verbose
		});

		var listUnits = _.drop(data);
		
		_.each(listUnits, function(sInput) {
			var botData = sInput.split(' ');
			var botOpts =  {
				id: Chance.guid(),
				name: botData[0],
				distCurrent: parseInt(botData[1]),
				speed: parseInt(botData[2])
			};

			var oUnit = new bot(botOpts);
			self.Bots.push(oUnit);
		});

		return self;
	};

	board.prototype.nextTurn = function () {
		var self = this;
		self.Turn++;
		return self;
	};

	board.prototype.playRound = function () {
		var self = this;
		self.shot().moveBots();
		return self;
	};

	board.prototype.shot = function () {
		var self = this;

		var Enemies = _.sortBy(self.getBots(), ['distCurrent', function (o) {
			return -1 * o.speed;
		}]);
		console.log(self.Enemies);

		_.each(Enemies, function (oEnemy) {
			if (oEnemy.distCurrent <= self.tower.fireRange) {
				oEnemy.killed = true;
				var Msg = 'The Tower killed ~' + oEnemy.name + '~ on turn ~' + self.Turn + '~ at a distance of ~' + oEnemy.distCurrent + 'm~';
				self.notify(Msg);
				return false;
			}
		});
		return self;
	};

	board.prototype.getBots = function () {
		var self = this;
		return _.filter(self.Bots, {killed: false});
	};

	board.prototype.moveBots = function () {
		var self = this;
		_.each(self.Bots, function (oEnemy) {
			oEnemy.move();
		});
		return self;
	};

	board.prototype.checkState = function () {
		var self = this;
		// console.log('bot-length is: ' + self.getBots().length);
		if (self.getBots().length === 0) {
			self.Result = {
				state: 0,
				message: 'Tower won in ' + self.Turn + 'turns!'
			}
		}

		if (self.Result.state === null) {
			_.each(self.Enemies, function (oEnemy) {
				if (oEnemy.distCurrent === 0) {
					self.Result = {
						state: 1,
						message: oEnemy.name + 'reaches the Tower!\n Game over at turn' + self.Turn
					}

					return false;
				}
			});
		}

		if (self.Result.state !== null) {
			self.Result.message = 'You ' + self.States[self.Result.state] + ':' + self.Result.message;
		}
	};

	board.prototype.notify = function (sText) {
		var self = this;
		return (self.verbose ? console.log(sText || 'Turn: ' + self.Turn) : true);
	};

	board.prototype.logResult = function () {
		var self = this;
		return self.notify(self.Result.message);
	};

	module.exports = board;
}).call(this);