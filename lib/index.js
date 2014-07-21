// Mock data
var indicators = {
	'timepris': {
		name: 'Timepris',
		state: 'strategy.scorecard.indicator',
		routerObject: {
			'indicatorId': 0
		}
	},
	'omsetning': {
		name: 'Omsetning',
		state: 'strategy.scorecard.indicator',
		routerObject: {
			'indicatorId': 1
		}
	},
	'resultat': {
		name: 'Resultatmargin',
		state: 'strategy.scorecard.indicator',
		routerObject: {
			'indicatorId': 2
		}
	}
}

var scorecards = {
	'raad': {
		name: 'Rådgivning',
		state: 'strategy.scorecard',
		routerObject: {
			'scorecardId': 0
		}
	},
	'revisjon': {
		name: 'Revisjon',
		state: 'strategy.scorecard',
		routerObject: {
			'scorecardId': 1
		}
	},
	'foretak': {
		name: 'Foretaksservice',
		state: 'strategy.scorecard',
		routerObject: {
			'scorecardId': 2
		}
	},
	'skatt': {
		name: 'Skatt & avgift',
		state: 'strategy.scorecard',
		routerObject: {
			'scorecardId': 3
		}
	},
}
/**
 * Module dependencies.
 */
var angular = require('angular')
	,	ui_router = require('angular-ui-router');
/**
 * Expose strategi.
 */
var strategi = module.exports = angular.module('strategi', [ui_router]);

require('./strategyHomeController.js');

strategi.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('strategy', {
			url: '',
			controller: 'StrategyHomeController',
			menuLoader: function ($state, toParams) {
				return [[{name: 'Strategi', state: 'strategy', routerObject: {}}]]
			}
		})
		.state('strategy.scorecard', {
			url: '/scorecard/:scorecardId?orgnode',
			menuLoader: function ($state, toParams) {
				var scorecardMenu = [
					{
						name: 'Målstyring',
						state: 'strategy.scorecard',
						routerObject: {
							'scorecardId': toParams.scorecardId
						}
					}, {
						name: 'Tiltak',
						state: 'strategy.tasks',
						routerObject: {
							'tasksId': toParams.scorecardId
						}
					}];
				var siblings = [];

				var menuItems = $state.get('strategy').menuLoader($state, toParams);

				switch(toParams.scorecardId) {
					case '0':
						siblings.push(scorecards['raad']);
						siblings.push(scorecards['revisjon']);
						siblings.push(scorecards['foretak']);
						siblings.push(scorecards['skatt']);
						break;
					case '1':
						siblings.push(scorecards['revisjon']);
						siblings.push(scorecards['raad']);
						siblings.push(scorecards['foretak']);
						siblings.push(scorecards['skatt']);
						break;
					case '2':
						siblings.push(scorecards['foretak']);
						siblings.push(scorecards['raad']);
						siblings.push(scorecards['revisjon']);
						siblings.push(scorecards['skatt']);
						break;
					case '3':
						siblings.push(scorecards['skatt']);
						siblings.push(scorecards['raad']);
						siblings.push(scorecards['revisjon']);
						siblings.push(scorecards['foretak']);
						break;
				}
				menuItems.push(siblings);
				menuItems.push(scorecardMenu);

				return menuItems;
			}
		})
		.state('strategy.tasks', {
			url: '/tasks/:tasksId',
			menuLoader: function ($state, toParams) {
			}
		})
		.state('strategy.scorecard.indicator', {
			url: '/indicator/:indicatorId',
			menuLoader: function ($state, toParams) {

				var siblings = [];

				var menuItems = $state.get('strategy.scorecard').menuLoader($state, toParams);

				switch (toParams.indicatorId) {
					case '0':
						siblings.push(indicators['timepris']);
						siblings.push(indicators['omsetning']);
						siblings.push(indicators['resultat']);
						break;
					case '1':
						siblings.push(indicators['omsetning']);
						siblings.push(indicators['timepris']);
						siblings.push(indicators['resultat']);
						break;
					case '2':
						siblings.push(indicators['resultat']);
						siblings.push(indicators['omsetning']);
						siblings.push(indicators['timepris']);
						break;
				}

				menuItems.push(siblings);
				return menuItems;
			}
		})
}]);