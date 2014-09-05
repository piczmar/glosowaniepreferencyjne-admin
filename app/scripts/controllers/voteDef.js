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




app.controller('VoteDefCreateCtrl', function (BASE_URL,$scope, $http, $location, VoteDefFactory) {
    $scope.voteDefs = VoteDefFactory.voteDefs;
	$scope.voteDef = {
		// id: idGen.next(),
		description: 'some description',
        email: 'some@test.com',
		fields: [
		{id: 1, value: 'Option one ..'},
		{id: 2, value: 'Option two.. '}
		]
	};

	$scope.createNewVoteDef = function(){
		console.log('Create vote definition.. ');

        $http.post(
            BASE_URL+'/api/voteDefs',
            $scope.voteDef,
            {headers: {'Content-Type': 'application/json'}}
        )
        .success(function(data, status, headers, config){
            console.log("Success: ",data);
            VoteDefFactory.voteDefs.push(data);
            $location.path('/edit/' +data._id);
            $scope.voteDef = {};
        })
        .error(function(data, status, headers, config){
            console.log("Error: ", data);
        });

		
	};
});


app.controller('VoteDefEditCtrl', function (BASE_URL,$scope, $http, $routeParams, $location, VoteDefFactory) {
        $scope.init = function () {
            if ($routeParams.id) {
                $http.get(
                    BASE_URL+'/api/voteDefs/'+ $routeParams.id,
                    {headers: {'Content-Type': 'application/json'}}
                )
                .success(function(data, status, headers, config){
                    console.log("Success: ",data);
                    $scope.voteDef = data;
                })
                .error(function(data, status, headers, config){
                    console.log("Error: ", data);
                });
            } else {
                //create a new object
            }
        }
        $scope.init();

        $scope.voteDef;

        $scope.updateVoteDef = function () {
            // VoteDefFactory.update($scope.voteDef);
            console.log('Upadting vote ' + $scope.voteDef._id);
            $http.put(
                BASE_URL+'/api/voteDefs',
                $scope.voteDef,
                {headers: {'Content-Type': 'application/json'}}
            )
            .success(function(data, status, headers, config){
                console.log("Success: ",data);
                $scope.voteDef = data;
                $location.path('/edit/'+ $scope.voteDef._id);
            })
            .error(function(data, status, headers, config){
                console.log("Error: ", data);
            });
            
        };
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

