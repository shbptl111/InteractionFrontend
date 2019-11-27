var myApp = angular.module("myApp", [ 'ngRoute', 'ngCookies', 'ui.bootstrap']);
myApp.config(function($routeProvider) {

	$routeProvider.when("/AddBlog", {templateUrl : "c_blog/AddBlog.html"})
	.when("/login", {templateUrl : "c_user/Login.html"})
	.when("/logout", {templateUrl: "c_user/Login.html"})
	.when("/register", {templateUrl : "c_user/SignUp.html"})
	.when("/userhome", {templateUrl : "c_user/UserHome.html"})
	.when("/AdminBlog", {templateUrl : "c_blog/AdminBlog.html"})
	.when("/showBlog", {templateUrl : "c_blog/ShowBlogs.html"})
	.when("/profilepicture", {templateUrl : "c_user/ProfilePicture.html"})
	.when("/showFriendList", {templateUrl : "c_Friend/FriendList.html"})
	.when("/suggestedfriends", {templateUrl : "c_Friend/SuggestionList.html"})
	.when("/pendingrequest", {templateUrl : "c_Friend/PendingRequest.html"})
	.when("/chat", {templateUrl : "c_chat/Chat.html"})
	.when("/blog", {templateUrl : "c_blog/Blog.html"})
	.when("/adminHome", {templateUrl : "c_user/AdminHome.html"})
	.when("/showForum", {templateUrl : "c_forum/ShowForums.html"})
	.when("/showFriends", {templateUrl: "c_Friend/FriendList.html"});

});

myApp.run(function($rootScope, $cookieStore) {
	if ($rootScope.currentUser == undefined) {
		// console.log($cookieStore.get('userDetails'));
		$rootScope.currentUser = $cookieStore.get('userDetails');
	}
	// console.log($rootScope.currentUser);
});