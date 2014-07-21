describe('strategi', function(){
	beforeEach(module('strategi'));

	var scope,
			controller,
			state,
			rootScope;

	beforeEach(inject(function ($controller, $rootScope, $state) {
		rootScope = $rootScope;
		state = $state;
		scope = $rootScope.$new();
		controller= $controller('StrategyHomeController', { $scope: scope });
	}));

	it('should get correct url from the state', function () {
		expect(state.href('strategy.scorecard')).toEqual('#/scorecard/');
	});

	it('should transition  to strategi.tasks', function () {
		state.transitionTo('strategy.tasks');
		rootScope.$apply();
		expect(state.current.name).toBe('strategy.tasks');
	});

});
