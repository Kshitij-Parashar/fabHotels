myApp.service('suggestions',function($http){

    this.fetchSuggestions = function (val){

        return $http.post('/Hotels', {'name': val})
    }
    
});
