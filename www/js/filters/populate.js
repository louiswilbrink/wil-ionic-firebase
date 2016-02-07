angular.module('filters.populate', [])
.filter('populate', function (Compose) {

  return function (input, message, details) {
    return Compose.message(message, details);
  };
});
