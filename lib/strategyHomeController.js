/*global angular*/
angular.module('strategy').controller('StrategyHomeController', [
	'$scope', 'scorecardService',
	function ($scope, scorecardService) {
		var scorecards = scorecardService.query();

		$scope.$watchCollection(scorecards, function () {

			// Add scorecards
			$scope.boxes = scorecards.map(function (scorecard) {
				return {
					name: 'taskScorecardSummaryView',
					attributes: {
						scorecardId: scorecard.id
					}
				};
			}).concat(
				// ... and the grey boxes at the bottom
				['visionView', 'valuesView', 'goalsView']
			);

		});
	}
]);
