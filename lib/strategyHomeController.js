angular.module('strategy').controller('StrategyHomeController',
	['$scope', 'scorecardService', function ($scope, scorecardService) {
		var scorecards = scorecardService.query();
		$scope.boxes = [];

		for (var i = 0; i < scorecards.length; i++) {
			$scope.boxes.push({
				name: 'scorecardView',
				attributes: {
					scorecardType: '\'summary\'',
					scorecardId: scorecards[i].id
				}
			});
		}
	}]
);