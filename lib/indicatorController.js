angular.module('strategy').controller('IndicatorController', [
	'$scope', '$stateParams', function ($scope, $stateParams) {

		$scope.boxes = [{
			name: 'indicatorView',
			attributes: {
				indicatorId: $stateParams.indicatorId
			}
		}];

	}
]);