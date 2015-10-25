angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .controller("ProductListCtrl", ["productListActiveClass", "productListPageCount", "cartFactory",
        function (productListActiveClass, productListPageCount, cartFactory) {
            var selectedCategory = null;
            var selectedPage = 1;
            var pageSize = productListPageCount;

            console.log("product list ctrl wird aufgerufen!" + selectedCategory);

            this.selectCategory = function (newCategory) {
                selectedCategory = newCategory;
            };

            this.categoryFilterFn = function (product) {
                return selectedCategory == null || product.category == selectedCategory;
            };
            this.getCategoryClass = function (category) {
                return selectedCategory == category ? productListActiveClass : "";
            };

            this.selectPage = function (newPage) {
                selectedPage = newPage;
            };

            this.getselectedPage = function () {
                return selectedPage;
            };

            this.getPageSize = function () {
                return pageSize;
            };

            this.getPageClass = function (page) {
                return selectedPage == page ? productListActiveClass : "";
            };

            this.addProductToCart = function (product) {
                cartFactory.addProduct(product.id, product.name, product.price);
            };

        }]);