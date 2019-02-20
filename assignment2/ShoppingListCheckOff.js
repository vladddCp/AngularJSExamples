(function () {
    'use strict';

    angular
        .module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    
        
    ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function ToBuyController($scope, ShoppingListCheckOffService) {
             
        var itemAdder = this;

        itemAdder.name = "";
        itemAdder.qty = "";

        itemAdder.addItem = function(){
          /* to be implemented */
        }

        itemAdder.getItems = function(){
            return ShoppingListCheckOffService.getNeededItems();
        }

        itemAdder.buyItem = function(item){
            ShoppingListCheckOffService.buyItem(item);
        }

        itemAdder.isListEmpty = function(){
            return ShoppingListCheckOffService.getNeededItems().length == 0;
        }
    }

    AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
        var showList = this;

        showList.getItems = function(){
            return ShoppingListCheckOffService.getBoughtItems();
        }
        
        showList.isListEmpty = function(){
            return ShoppingListCheckOffService.getBoughtItems().length == 0;
        }
    }

    ShoppingListCheckOffService.$inject = [];
    function ShoppingListCheckOffService() {
        var service = this;
        var neededItems = [{ name: "cookies", qty: 10 },
                           { name: "cookies", qty: 10 },
                           { name: "cookies", qty: 10 },
                           { name: "cookies", qty: 10 },
                           { name: "cookies", qty: 10 }];
        var boughtItems = [];

        service.addItem = function (itemName, itemQty) {
            // item = {
            //     name : itemName,
            //     qty : itemQty
            // }

            // neededItems.push(item);
        };

        

        service.buyItem = function(selectedItem){
            neededItems = neededItems.filter(item => item !== selectedItem);
            boughtItems.push(selectedItem)
        };

        service.getNeededItems = function(){
            return neededItems;
        };

        service.getBoughtItems = function(){
            return boughtItems;
        };
    }
})();