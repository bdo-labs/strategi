angular.module('strategy').controller('StrategyHomeController',
	['$scope', 'scorecardService', function ($scope, scorecardService) {
		var scorecards = scorecardService.query();
		$scope.boxes = [];

		for (var i = 0; i < scorecards.length; i++) {
			$scope.boxes.push({
				name: 'taskScorecardSummaryView',
				attributes: {
					scorecardId: scorecards[i].id
				}
			});
		}
	}]
);