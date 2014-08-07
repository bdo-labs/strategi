/**
 * Module dependencies.
 */
var angular = require('angular');

require('angular-ui-router');
require('services');
require('scorecard-view');
require('indicator-view');
require('task-scorecard-summary-view');
/**
 * Expose strategy.
 */
var strategy = module.exports = angular.module('strategy', [
	'ui.router',
	'services',
	'scorecardView',
	'indicatorView',
	'taskScorecardSummaryView'
]);

require('./strategyHomeController.js');
require('./scorecardController.js');
require('./indicatorController.js');
require('./tasksController.js');

strategy.config(['$stateProvider', '$injector', function ($stateProvider, $injector) {
	$stateProvider
		.state('strategy', {
			url: '/',
			controller: 'StrategyHomeController',
			topMenuLoader: function () {
				return [{name: 'Strategi', state: 'strategy'}];
			}
		})
		.state('strategy.scorecard', {
			url: 'scorecard/:scorecardId?orgnode&date',
			controller: 'ScorecardController',
			topMenuLoader: ['$q', 'toParams', 'scorecardService', function ($q, toParams, scorecardService) {
				return scorecardService.get(toParams.scorecardId).
						$promise.then(function (returnedScorecard) {
							return [
								{
									name: 'Målstyring',
									state: 'strategy.scorecard',
									routerObject: {
										'scorecardId': toParams.scorecardId
									},
									active: 'active'
								}, {
									name: 'Tiltak',
									state: 'strategy.tasks',
									routerObject: {
										'tags': returnedScorecard.name
									}
								}];
						});
			}],
			filterMenuLoader: ['toParams', 'scorecardService', function (toParams, scorecardService) {

				var scorecardQuery = scorecardService.query();

				var activeIndex = -1;

				var scorecards = scorecardQuery.map(function (val, index) {
					if (val.slug == toParams.scorecardId || val.id == toParams.scorecardId) {
						activeIndex = index;
					}
					return {
						name: val.name,
						state: 'strategy.scorecard',
						routerObject: {
							'scorecardId': val.slug
						}
					};
				});

				var temp = scorecards[0];
				scorecards[0] = scorecards[activeIndex];
				scorecards[activeIndex] = temp;
				scorecards.dropdown = true;

				return [scorecards]
			}]
		})
		.state('strategy.tasks', {
			url: 'tasks/?tags',
			controller: 'TasksController',
			topMenuLoader: ['$q', 'toParams', 'scorecardService', function ($q, toParams, scorecardService) {
				return scorecardService.query({name: toParams.tags}).$promise.then(
					function (returnedScorecard) {
						return [
							{
								name: 'Målstyring',
								state: 'strategy.scorecard',
								routerObject: {
									'scorecardId': returnedScorecard[0].slug
								}
							}, {
								name: 'Tiltak',
								state: 'strategy.tasks',
								routerObject: {
									'tags': toParams.tags
								},
								active: 'active'
							}];
					}
				)
			}]
		})
		.state('strategy.scorecard.indicator', {
			url: '/indicator/:indicatorId',
			controller: 'IndicatorController',
			filterMenuLoader: ['toParams', 'indicatorService', function (toParams, indicatorService) {

				var activeIndicator = indicatorService.get(parseInt(toParams.indicatorId) || toParams.indicatorId);
				var indicatorQuery = indicatorService.query({category: activeIndicator.category});
				var activeIndex = -1;


				var indicators = indicatorQuery.map(function (val, index) {
					if (val.id == toParams.indicatorId || val.slug == toParams.indicatorId) {
						activeIndex = index;
					}
					return {
						name: val.name,
						category: val.category,
						state: 'strategy.scorecard.indicator',
						routerObject: {
							'indicatorId': val.slug
						}
					};
				});

				var temp = indicators[0];
				indicators[0] = indicators[activeIndex];
				indicators[activeIndex] = temp;
				indicators.dropdown = true;

				return [indicators];
			}]
		});
}]);