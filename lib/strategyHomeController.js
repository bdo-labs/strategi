/*global angular*/
angular.module('strategy').controller('StrategyHomeController', [
  '$scope', 'scorecardService', '$stateParams', '$state',
  function ($scope, scorecardService, $stateParams, $state) {
    var scorecards = scorecardService.query();

    $scope.addScorecard = function () {
      alert('Not implemented');
    };

    // Change date when the date picker has detected a change.
    $scope.$on('dateChanged', function (event, newDate) {
      // NOT IMPLEMENTED YET
    });

    $scope.orgnode = $stateParams.orgnode;

    $scope.$watchCollection(scorecards, function () {

      // Add scorecards
      $scope.boxes = scorecards.map(function (scorecard) {
        return {
          name: 'taskScorecardSummaryView',
          attributes: {
            scorecardId: scorecard.id,
            orgnode: 'orgnode'
          }
        };
      })

      $scope.boxes.push({
        attributes: { 'class': 'medium btn' },
        template: '<div class="primary-box"><button class="centered" ng-click="addScorecard()"><i class="fa fa-plus"></i>Legg til</button></div>'
      });

    });
  }
]);
