angular.module("sportsStore")
    .controller("CartSummaryController", ["cartFactory", function (cartFactory) {
       this.cartData = cartFactory.getProducts();
        this.total = cartFactory.total;
        this.remove = function (id) {
            cartFactory.removeProduct(id);
        };
    }]);