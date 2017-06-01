var myAppDev = angular.module('myAppE2E', ['myApp', 'ngMockE2E']);

    myAppDev.run(function($httpBackend,$http) {

        $httpBackend.whenPOST('/Hotels').respond(function (method, url, data) {
            var predictions1 = [];
            Hotels.forEach(function(hotel){
                if(hotel.name.toLowerCase().indexOf(JSON.parse(data).name.toLowerCase()) !== -1){
                    predictions1.push(hotel);
                }
            });
            return [200, predictions1, {}];
        });

        $http.get('data.json').then(function (res) {
            Hotels = res.data;
            setTimeout(function () {
                $httpBackend.flush();
            });
        });

        $httpBackend.whenPOST('/Hotels').passThrough();
        $httpBackend.whenGET('data.json').passThrough();
        $httpBackend.whenGET('html/landing.html').passThrough();

    });
