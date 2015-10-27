angular.module("sportsStoreAdmin")
    .constant("productUrl", "http://localhost:5500/products/")
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])
    .controller("ProductCtrl", ['$resource', 'productUrl', function ($resource, productUrl) {
        var productsResource = $resource(productUrl + ":id", {id: "@id"});
        this.products = productsResource.query();
        //this.editedProduct = null;
        var that = this;
        this.deleteProduct = function (product) {
            product.$delete().then(function (response) {
                that.products.splice(that.products.indexOf(product), 1);
            })
        };

        this.startEdit = function (product) {
            this.editedProduct = product;
        }

        this.updateProduct = function (product) {
            product.$save();
            this.editedProduct = null;
        }

        this.createProduct = function (product) {
            new productsResource(product).$save().then(function (newProduct) {
                that.products.push(newProduct);
                that.editedProduct = null;
            });
        }
    }]);