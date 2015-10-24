angular.module("customFilters", [])
    .filter("unique", function () {
        return function (data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var results = [];
                var keys = {};
                angular.forEach(data, function (product) {
                    var val = product[propertyName];
                    if (angular.isUndefined(keys[val])) {
                        keys[val] = true;
                        results.push(product);
                    }
                });
                return results
            }
            else {
                return data;
            }
        };
    })
    .filter("range", ["$filter", function ($filter) {
      return function (data, page, size) {
          if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
              var startIndex = (page -1) * size;
              if (data.length < startIndex) {
                  return [];
              } else {
                  return $filter("limitTo")(data.splice(startIndex), size);
              }
          }
          return data;
      }
    }])
    .filter("pageCount", function () {
        return function(data, size) {
            if (angular.isArray(data)){
                var result = [];
                for (var i = 0; i<Math.ceil(data.length/size); i++) {
                    result.push(i);
                }
                return result;
            }
            return data;
        }
    });