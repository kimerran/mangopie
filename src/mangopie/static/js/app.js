window.mangopie = angular.module('MangopieApp', ['MangopieControllers', 'MangopieServices', 'chieffancypants.loadingBar']);

// controller
var MangopieControllers = angular.module('MangopieControllers', []);

MangopieControllers.controller('MangopieCtrl', ['$scope', 'MangaFactory', 'ChapterFactory',
	function ($scope, MangaFactory, ChapterFactory, cfpLoadingBar) {
	    $scope.chapters = [];
	    $scope.cur_chapter = {};
	    $scope.cur_chapter_images = {};
	    $scope.cur_image = {};
	    $scope.cur_image_src = "";

	    // for now will only support Naruto
	    MangaFactory.get({ Id: '4e70ea03c092255ef70046f0' }, function (res) {
	        $scope.chapters = res.chapters;
	    });


	    $scope.changeSelected = function () {

	        ChapterFactory.get({ Id: $scope.cur_chapter[3] }, function (res) {
	            $scope.cur_chapter_images = res.images.slice().reverse();
	            $scope.loadImage($scope.cur_chapter_images[0][1]);
	        })

	    }

	    $scope.loadImage = function (param) {
	        $scope.cur_image_src = "/api/img/" + param.split('.')[0] + "/" + param.slice(-3);
	    }

	}]);


// services
angular.module('MangopieServices', ['ngResource'])
	.factory('MangaFactory', function ($resource) {
	    return $resource('/api/mng/:Id', { Id: '@Id' });
	})
    .factory('ChapterFactory', function ($resource) {
        return $resource('/api/chp/:Id', { Id: '@Id' });
    })
