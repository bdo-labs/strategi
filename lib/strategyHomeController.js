/*global angular*/
angular.module('strategy').controller('StrategyHomeController', [
	'$scope', 'scorecardService', '$stateParams',
	function ($scope, scorecardService, $stateParams) {
		var scorecards = scorecardService.query();

		$scope.addScorecard = function () {
			alert('Not implemented');
		};

		$scope.orgnode = $stateParams.orgnode;

		$scope.$watchCollection(scorecards, function () {

			// Add scorecards
			$scope.boxes = scorecards.map(function (scorecard) {
				return {
					name: 'taskScorecardSummaryView',
					attributes: {
						scorecardId: scorecard.id,
						orgnode: 'orgnode'
					}
				};
			}).concat([
				// "Add" button
				{
					template:
						'<button class="centered" ng-click="addScorecard()">' +
							'<i class="fa fa-plus"></i>Legg til' +
						'</button>',
					attributes: {
						'class': 'breaking-box'
					}
				},

				// Info boxes at the  bottom
				'visionView',
				'valuesView',
				'goalsView'
			]);

		});
	}
]);