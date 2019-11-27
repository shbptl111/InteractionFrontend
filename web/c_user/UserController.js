myApp.controller("UserController", function($scope,$http,$location,$rootScope,$cookieStore){
	$scope.User={'loginName':'','password':'','username':'','emailid':'','mobileno':'','address':'','role':''};
	
	$scope.register=function(){
		console.log('Inside the register function');
		$http.post('http://localhost:8086/InteractionMiddleware/registerUser',$scope.User)
		.then(function(){
			console.log('Registered');
			$location.path("/login");
		});
	}
	
	$scope.logincheck=function(){
		console.log('Inside the login check function')
		$http.post('http://localhost:8086/InteractionMiddleware/checkUser', $scope.User)
		.then(function(response){
			console.log('Login Checked');
			$scope.User=response.data;
			$rootScope.currentUser=response.data;
			$cookieStore.put('userDetails',response.data);
			console.log($rootScope.currentUser);
			$location.path("/userhome");
		});
	}
	
	$scope.logout=function(){
		console.log('I am inside the logout function');
		delete $rootScope.currentUser;
		$cookieStore.remove('userDetails');
		$location.path("/logout");
	}
});