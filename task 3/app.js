(function () {
    'use strict';

    angular
        .module('menuChoice', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItemsDescription', FoundItemsDescription)
        .directive('foundItems', FoundItems);


    NarrowItDownController.$inject = ['$scope', 'MenuSearchService', '$filter'];

    function NarrowItDownController($scope, MenuSearchService, $filter) {

        var narrowed = this;


        narrowed.searchMenuItems = function () {
            var promise = MenuSearchService.getMenuItems();

            promise.then(function (response) {
                    narrowed.searchedItems = response.data.menu_items;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        }

        narrowed.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(narrowed.searchedItems, itemIndex);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;


        service.getMenuCategories = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });

            return response;
        };

        service.getMenuForCategory = function (shortName) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: shortName
                }
            });

            return response;
        };

        // Filtering after searchTerm
        service.getMenuItems = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            });

            return response;

        };

        service.removeItem = function (list, itemIndex) {
            list.splice(itemIndex, 1);
        };
    };

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html'
        };
        console.log('found items!');
        return ddo;
    }

    function FoundItemsDescription() {
        var ddo = {
            template: '{{ menuItem.name }}'
        };
        console.log('found items desc!');
        return ddo;
    }

})();