angular.module('strategy').controller('ScorecardController',
	['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

		$scope.date = $stateParams.date ? new Date($stateParams.date) : null;
		if ($stateParams.date !== null && isNaN($scope.date)) {
			$state.go('strategy');
		}

		$scope.boxes = [{
			name: 'scorecardView',
			attributes: {
				scorecardType: 'full',
				scorecardId: parseInt($stateParams.scorecardId, 10) || $stateParams.scorecardId,
				date: 'date'
			}
		}];

	}]
);