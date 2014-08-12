angular.module('strategy').controller('IndicatorController', [
	'$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

		$scope.date = new Date($stateParams.date);
		if ($stateParams.date !== null && isNaN($scope.date)) {
			$state.go('strategy');
		}
		$scope.boxes = [{
			name: 'indicatorView',
			attributes: {
				indicatorId: $stateParams.indicatorId,
				date: 'date',
				organizationalNode: $stateParams.orgnode
			}
		}];

	}
]);