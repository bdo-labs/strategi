
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
require('./departmentController.js');

strategi.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('strategy', {
			url: '/strategy',
			controller: 'StrategyHomeController'
		})
		.state('strategy.department', {
			url: '/department',
			controller: 'DepartmentController'
		})
}]);



