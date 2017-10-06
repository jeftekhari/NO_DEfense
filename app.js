
(function () {

    var Chance = require('chance').Chance(Math.random);
	var fs = require('fs');
	var input = undefined;
	var pkg = require('./package.json');
	var path    =   require('path');
    var gameInit = require('./events/gameInit');

	var dataSRC     =   undefined;
	var Args        =   process.argv.slice(2);
	var dataDefault =   path.resolve(pkg.options.dataSource.defaults.path, pkg.options.dataSource.defaults.file);

    dataSRC =   (Args.length && Args[0]) ? path.resolve(Args[0]) :   dataDefault;

    console.info('==================================================================');
    console.info('Input Source:\n--->' + dataSRC + '<---');

    console.info('==================================================================');
    input   =   (fs.readFileSync(dataSRC, pkg.options.dataSource.params)).trim().split('\n');
    console.info('Input Data:\n--->' + input + '<---');
    console.info('==================================================================');


    var newGame = new gameInit ({id: Chance.guid(), verbose: true});
    newGame.start(input);
    
}).call(this);