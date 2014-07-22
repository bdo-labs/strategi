/**
 * Module dependencies.
 */
var angular = require('angular')

require('angular-ui-router');
require('services')
/**
 * Expose strategi.
 */
var strategi = module.exports = angular.module('strategi', ['ui.router', 'services']);

require('./strategyHomeController.js');

strategi.config(['$stateProvider', '$injector', function ($stateProvider, $injector) {
	$stateProvider
		.state('strategy', {
			url: '',
			controller: 'StrategyHomeController',
			menuLoader: function () {
				return [[{name: 'Strategi', state: 'strategy', routerObject: {}}]]
			}
		})
		.state('strategy.scorecard', {
			url: '/scorecard/:scorecardId?orgnode',
			menuLoader: ['toParams', 'scorecardService', function (toParams, scorecardService) {
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
					}]

				var scorecardQuery = scorecardService.query();

				var activeIndex = -1;

				var scorecards = scorecardQuery.map(function (val, index) {
					if (val.id == toParams.scorecardId) {
						activeIndex = index;
					}
					return {
						name: val.name,
						state: 'strategy.scorecard',
						routerObject: {
							'scorecardId': val.id
						}
					}
				});

				var temp = scorecards[0];
				scorecards[0] = scorecards[activeIndex];
				scorecards[activeIndex] = temp;

				return [scorecardMenu, scorecards];
			}]
		})
		.state('strategy.tasks', {
			url: '/tasks/:tasksId',
			menuLoader: function () {
			}
		})
		.state('strategy.scorecard.indicator', {
			url: '/indicator/:indicatorId',
			menuLoader: ['toParams', 'indicatorService', function (toParams, indicatorService) {

				var indicatorQuery = indicatorService.query();
				var activeIndex = -1;


				var indicators = indicatorQuery.map(function (val, index) {
					if (val.id == toParams.indicatorId) {
						activeIndex = index;
					}
					return {
						name: val.name,
						state: 'strategy.scorecard.indicator',
						routerObject: {
							'indicatorId': val.id
						}
					};
				});

				var temp = indicators[0];
				indicators[0] = indicators[activeIndex];
				indicators[activeIndex] = temp;

				return [indicators];
			}]
		})
}]);