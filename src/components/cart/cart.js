angular.module("cart", [])
    .factory("cartFactory", function () {
        var cartData = [];
        return {
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
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
            },
            total: function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].price * cartData[i].count);
                }
                return total;
            }
        };
    })
    .directive("cartSummary", ["cartFactory", function (cartFactory) {
        return {
            restrict: "E",
            templateUrl: "components/cart/cartSummsary.html",
            scope: {},
            bindToController: {},
            controllerAs: 'ctrl',
            controller: function () {
                var cartData = cartFactory.getProducts();
                this.total = cartFactory.total;

                this.itemCount = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                };
            }
        }
    }]);