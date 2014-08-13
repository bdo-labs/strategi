angular.module('strategy').controller('IndicatorController', [
	'$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

		$scope.date = new Date($stateParams.date);

		if ($stateParams.date !== null && isNaN($scope.date)) {
			$state.go('strategy');
		}

		var indicatorId = $stateParams.indicatorId;

		$scope.boxes = [
			{
				name: 'indicatorView',
				attributes: {
					indicatorId: $stateParams.indicatorId,
					date: 'date',
					organizationalNode: $stateParams.orgnode
				}
			},
			{
				name: 'eventsView',
				attributes: {
					filter: isNaN(indicatorId) ?
						'{\'indicator.slug\': \'' + indicatorId + '\'}' :
							'{\'indicator.id\': ' + indicatorId + '}',
					class: 'medium'
				}
			}
		];

	}
]);
