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
		expect(state.href('strategy')).toEqual('#/strategy');
	});

	it('should transition  to strategi.department', function () {
		state.transitionTo('strategy.department');
		rootScope.$apply();
		expect(state.current.name).toBe('strategy.department');
	});

});
