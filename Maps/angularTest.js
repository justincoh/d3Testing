'use strict';

console.log('this ever hit?')

angular.module('mapApp')


    .controller('MainCtrl',function($scope){

      $scope.bool = false;

      $scope.boolToggle = function(){
        if($scope.bool===true){
          $scope.bool=false;
          console.log('condition 1')
        } else {
          $scope.bool = true
          console.log('condition 2')
        }
      }

    });


