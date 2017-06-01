myApp.controller('MainCtrl', function MainCtrl($http,$scope,suggestions) {
    $scope.hotels = [];
    $scope.newHotel = {
        'name' : ""
    };
    $scope.googleSuggests = [];
    $scope.getHotels = function(val) {
        $scope.hotels = [];
        if(val) {
            suggestions.fetchSuggestions(val).then(function (response) {
                $scope.hotels = response.data;
            });
        }
    }

    $scope.getHotels("none");
    
    $scope.getGoogleSuggestions= function(val) {
        $scope.error = false;
        $scope.googleSuggests = [];
         if(val){
            var displaySuggestions = function (predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    $scope.error = true;
                    $scope.$digest();
                    return;
                }
                $scope.googleSuggests = predictions;
                $scope.$digest();
            };

            var service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({input: val}, displaySuggestions);
        }
 
    }
});