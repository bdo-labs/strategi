angular.module('strategy').controller('ScorecardController',
	['$scope', '$stateParams', function ($scope, $stateParams) {

		$scope.boxes = [{
			name: 'scorecardView',
			attributes: {
				scorecardType: 'full',
				scorecardId: parseInt($stateParams.scorecardId, 10)
			}
		}];

	}]
);