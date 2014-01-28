function RiddleController($scope) {
  $scope.riddles = [];

  $scope.chineseFilter = { type : chinese };
  $scope.italianFilter = { type : italian };

  $scope.setRiddles = function(riddles) {
    $scope.riddles = riddles;
  };
}