myApp.controller("FriendController", function($scope, $http, $location, $rootScope, $cookieStore){
	
	$scope.friend={'friendId':0, 'loginname':'', 'friendloginname':'', 'status':'' };
	$scope.friendList;
	$scope.pendingFriendList;
	$scope.suggestedFriendList;
	
	function showFriendList(){
		console.log('I am in the show Friend List');
		loginname=$rootScope.currentUser.loginName;
		console.log(loginname);
		$http.get('http://localhost:8086/InteractionMiddleware/showFriendList/' + loginname)
		.then(function(response){
			$scope.friendList = response.data;
			console.log($scope.friendList);
		});
	}
	
	function showPendingFriendList(){
		console.log('I am in the pending Friend method');
		loginname=$rootScope.currentUser.loginName;
		$http.get('http://localhost:8086/InteractionMiddleware/showPendingFriendRequest/' + loginname)
		.then(function(response){
			$scope.pendingFriendList=response.data;
			console.log($scope.pendingFriendList);
		});
	}
	
	function showSuggestedFriendList(){
		console.log('I am in suggested Friend List');
		loginname=$rootScope.currentUser.loginName;
		$http.get('http://localhost:8086/InteractionMiddleware/showSuggestedFriendList/' + loginname)
		.then(function(response){
			$scope.suggestedFriendList=response.data;
			console.log($scope.suggestedFriendList);
		});
	}
	
	$scope.sendFriendRequest=function(loginname1){
		$scope.friend.loginname=$rootScope.currentUser.loginName;
		$scope.friend.friendloginname=loginname1;
		console.log($scope.friend);
		console.log(loginname1);
		$http.post('http://localhost:8086/InteractionMiddleware/sendFriendRequest', $scope.friend)
		.then(function(response){
			console.log('friend request sent');
			$location.path("/suggestedfriends");
		});
	}
	
	$scope.unfriend=function(friendId){
		console.log('I am in unfriend method');
		$http.get('http://localhost:8086/InteractionMiddleware/deleteFriendRequest/' + friendId)
		.then(function(response){
			console.log('Successful'+response.statusText);
			$location.path("/showfriendList");
		});
	}
	
	$scope.accept=function(friendId){
		console.log('I am inside the accept friend request method');
		$http.get('http://localhost:8086/InteractionMiddleware/acceptFriendRequest/' + friendId)
		.then(function(response){
			console.log('Accepted the friend request'+response.statusText);
			$location.path("/showfriendList");
		});
	}
	
	showFriendList();
	showPendingFriendList();
	showSuggestedFriendList();
});