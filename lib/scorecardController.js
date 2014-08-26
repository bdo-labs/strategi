
angular.module('strategy').controller('ScorecardController',
  ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

    $scope.date = $stateParams.date ? new Date($stateParams.date) : null;

    if ($stateParams.date !== null && isNaN($scope.date)) {
      $state.go('strategy');
    }

    var scorecardId = $stateParams.scorecardId;

    $scope.orgnode = $stateParams.orgnode;

    $scope.boxes = [
      {
        name: 'scorecardView',
        attributes: {
          scorecardType: 'full',
          scorecardId: parseInt(scorecardId, 10) || scorecardId,
          date: 'date',
          orgnode: 'orgnode'
        }
      },
      {
        name: 'eventsView',
        attributes: {
          class: 'large',
          filter: isNaN(scorecardId) ?
            '{\'indicator.scorecards.slug\': \'' + scorecardId + '\'}' :
            '{\'indicator.scorecards.id\': \'' + scorecardId + '\'}'

        }
      }
    ];

  }]
);

