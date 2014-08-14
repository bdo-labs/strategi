angular.module('strategy').controller('IndicatorController', [
	'$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

		var dateString = $stateParams.date,
			indicatorId = $stateParams.indicatorId;

		$scope.date = new Date(dateString ? dateString : Date.now());

		if (dateString !== null && isNaN($scope.date)) {
			$state.go('strategy');
		}


		$scope.boxes = [
			{
				name: 'indicatorView',
				attributes: {
					indicatorId: indicatorId,
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
