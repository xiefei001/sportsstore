/*
 * It is the top-level controller. The main role of this controller is to define the data that will be used in the
 * different views that the application will display.
 *
 * AngularJS can have multiple controllers arranged in a hierarchy. Controllers arranged in this way can inherit data
 * and logic from controllers above them.
 *
 */
angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:5500/products")
    .constant("orderUrl", "http://localhost:5500/orders")
    .controller("SportsStoreCtrl", ['$http', '$location', 'dataUrl', 'orderUrl', 'cartFactory',
        function ($http, $location, dataUrl, orderUrl, cartFactory) {
            var that = this;
            that.data = {};
            $http.get(dataUrl).then(
                function (response) {
                    that.data.products = response.data;
                },
                function (error) {
                    that.data.error = error;
                    console.log("error status code:" + error.status + " text:" + error.statusText);
                });
            this.sendOrder = function (shippingDetails) {
                var order = angular.copy(shippingDetails);
                order.products = cartFactory.getProducts();
                $http.post(orderUrl, order).then(
                    function (response) {
                        that.data.orderId = response.data.id;
                        cartFactory.getProducts().length = 0;
                    },
                    function (error) {
                        this.data.orderError = error;
                    }
                ).finally(function () {
                        $location.path("/complete");
                    });
            };

            /*this.data = {
             products: [
             {
             name: "Product #1", description: "A product",
             category: "Category #1", price: 100
             },
             {
             name: "Product #2", description: "A product",
             category: "Category #1", price: 110
             },
             {
             name: "Product #3", description: "A product",
             category: "Category #2", price: 210
             },
             {
             name: "Product #4", description: "A product",
             category: "Category #3", price: 202
             }]
             };*/
        }]);