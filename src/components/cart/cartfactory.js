angular.module("cart", [])
    .factory("cartFactory", function () {
        var cartData = [];
        return {
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
                angular.forEach(cartData, function (cart) {
                    for (var i = 0; i < cartData.length; i++) {
                        if (cartData[i].id == id) {
                            cartData[i].count++;
                            addedToExistingItem = true;
                            break;
                        }
                    }
                    if (!addedToExistingItem) {
                        cartData.push({count: 1, id: id, price: price, name: name});
                    }
                });
            },

            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },

            getProducts: function () {
                return cartData;
            }
        };
    })
    .directive("cartSummary", ["cartFactory", function (cartFactory) {
        return {
            restrict: "E",
            templateUrl:"components/cart/cartSummsary.html",
            bindToController: {

            },
            controllerAs:'ctrl',
            controller: function () {
                var cartData = cartFactory.getProducts();
            }
        }
    }]);