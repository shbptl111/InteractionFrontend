myApp.controller("BlogController", function($scope,$http,$location,$rootScope){
	$scope.blog={'blogId':0, 'blogName':'','blogDesc':'','createDate':'','loginname':'','status':'' };
	$scope.blogComment={'blogId':0, 'commentDate': '', 'commendId': '', 'commentText':'','loginName':''};
	$scope.blogdata;
	$scope.blogCommentData;
	$rootScope.getblog;
	$rootScope.getComments;
	
	$scope.addBlogComment=function(blogId) {
		console.log('Adding Blog Comment');
		console.log($scope.blogComment);
		$scope.blogComment.blogId=blogId;
		$http.post('http://localhost:8086/InteractionMiddleware/addComment', $scope.blogComment)
		.then(function(response){
			console.log('getting the blog comments');
			$rootScope.getComments=response.data;
			console.log(response.data);
		})
		.then(function(){
			console.log('calling getBlog');
			$scope.getBlog(blogId);
		});
	}
	
	$scope.addBlog=function(){
		$http.post('http://localhost:8086/InteractionMiddleware/addBlog', $scope.blog)
		.then(function(response){
			console.log(response);
			$location.path("/AddBlog");
			return listBlog();
		});
	}
	
	$scope.approve=function(blogId){
		$http.get('http://localhost:8086/InteractionMiddleware/approveBlog/'+blogId)
		.then(function(response){
			return listBlog();
		})
		.then(function(response){
			$scope.blogdata=response;
		});
	}
	
	$scope.reject=function(blogId){
		$http.get('http://localhost:8086/InteractionMiddleware/rejectBlog/'+blogId)
		.then(function(response){
			return listBlog();
		})
		.then(function(response){
			$scope.blogdata=response;
		});
	}
	
	$scope.incrementLike=function(blogId){
		$http.get('http://localhost:8086/InteractionMiddleware/incrementLike/'+blogId)
		.then(function(response){
			console.log('Response from Increment likes Middleware controller');
			console.log(response.data);
		});
	}
	
	$scope.incrementDisLike=function(blogId){
		$http.get('http://localhost:8086/InteractionMiddleware/incrementDisLike/'+blogId)
		.then(function(response){
			console.log('Response from Increment dislikes Middleware controller');
			console.log(response.data);
			$rootScope.getblog=response.data;
		});
	}
	
	$scope.getBlog=function(blogId){
		$http.get('http://localhost:8086/InteractionMiddleware/getBlog/'+blogId)
		.then(function(response){
			$rootScope.getblog=response.data;
			$location.path("/blog");
		});
	}
	
	function listBlog(){
		$http.get('http://localhost:8086/InteractionMiddleware/showAllBlogs')
		.then(function(response){
			$scope.blogdata=response.data;
		});
	}
	
	$scope.listBlogComments=function(blogId){
		$http.get('http://localhost:8086/InteractionMiddleware/listBlogComments/'+blogId)
		.then(function(response){
			console.log('listBlogComments: ');
			$rootScope.getComments=response.data;
		});
	}
	listBlog();
});