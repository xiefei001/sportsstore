angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:5500/users/login")
    .constant("ordersUrl", "http://localhost:5500/orders")
    .controller("AuthCtrl", ['$http', '$location', 'authUrl',
        function ($http, $location, authUrl) {
            var that = this;
            this.authenticationError = null;
            this.authenticate = function (username, password) {
                $http.post(authUrl, {
                    username: username,
                    password: password
                }, {
                    withCredentials: true
                }).then(function (response) {
                    $location.path("/main");
                }, function (error) {
                    that.authenticationError = error;
                });
            };
        }])
    .controller("MainCtrl", function () {
        this.screens = ["Products", "Orders"];
        this.current = this.screens[0];
        this.setScreen = function (index) {
            this.current = this.screens[index];
        };

        this.getScreen = function () {
            return this.current == this.screens[0] ? "/sportsstore/src/views/adminProducts.html" :
                "/sportsstore/src/views/adminOrders.html";
        };
    })
    .controller("OrdersCtrl", ['$http', 'ordersUrl', function ($http, ordersUrl) {
        var that = this;
        $http.get(ordersUrl).then(
            function (response) {
                that.orders = response.data;
            },
            function (error) {
                that.error = error;
            }
        );
        that.selectedOrder = null;
        this.selectOrder = function (order) {
            that.selectedOrder = order;
        };

        this.calcTotal = function (order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++) {
                total += order.products[i].count * order.products[i].price;
            }
            return total;
        }
    }]);