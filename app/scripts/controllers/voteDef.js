'use strict';

Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] > max) {
			max = this[i];
		}
	}
	return max;
};

var idGen = {
    ids : [0],
    next : function(){
        var next = this.ids.max() +1;
        this.ids.push(next);
        return next;
    }
};

var app = angular.module('clientAdminApp');




app.controller('VoteDefCreateCtrl', function ($scope, $location, VoteDefFactory) {
    $scope.voteDefs = VoteDefFactory.voteDefs;
	$scope.voteDef = {
		id: idGen.next(),
		description: 'some description',
        email: 'some@test.com',
		fields: [
		{id: 1, value: 'Option one ..'},
		{id: 2, value: 'Option two.. '}
		]
	};

	$scope.createNewVoteDef = function(){
		console.log('Create vote definition.. ');
        $scope.voteDef.createdAt = Date.now();
		VoteDefFactory.voteDefs.push($scope.voteDef);
		$location.path('/edit/' + $scope.voteDef.id);
		$scope.voteDef = {};
	};
});


app.controller('VoteDefEditCtrl', function ($scope, $routeParams, $location, VoteDefFactory) {

        $scope.updateVoteDef = function () {
            // VoteDefFactory.update($scope.voteDef);
            console.log('Upadting vote ' + $scope.voteDef.id);
            $scope.voteDef.updatedAt = Date.now();
            $location.path('/edit/'+ $scope.voteDef.id);
        };
        $scope.voteDef = VoteDefFactory.voteDefs.filter(function(e){ 
        	console.log(e.id + ', ' + $routeParams.id);
        	return ''+e.id === $routeParams.id ;
        })[0];
});


app.controller('VoteFieldCtrl', function ($scope){

	$scope.addField = function(voteDef){
		console.log('Adding field..');
		var next = $scope.voteDef.fields.map(function(e){return e.id;}).max()+1;
		voteDef.fields.push({id: next, value: ''});
	};

	$scope.removeField = function(id, voteDef){
		console.log('remove field..'  + id);
		voteDef.fields = voteDef.fields.filter(function(e){return e.id !== id;});
	};
});

app.factory('VoteDefFactory', function(){

	return {
		voteDefs : []
	};

});


var ValidSubmit = ['$parse', function ($parse) {
        return {
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink(scope, element, iAttrs, controller) {
                        var form = element.controller('form');
                        form.$submitted = false;
                        var fn = $parse(iAttrs.validSubmit);
                        element.on('submit', function(event) {
                            scope.$apply(function() {
                                element.addClass('ng-submitted');
                                form.$submitted = true;
                                if(form.$valid) {
                                    fn(scope, {$event:event});
                                }
                            });
                        });
                        scope.$watch(function() { return form.$valid; }, function(isValid) {
                            if(form.$submitted === false) {
                                return;
                            }
                            if(isValid) {
                                element.removeClass('has-error').addClass('has-success');
                            } else {
                                element.removeClass('has-success');
                                element.addClass('has-error');
                            }
                        });
                    }
                }
            }
        }
    }]

    app.directive('validSubmit', ValidSubmit);

