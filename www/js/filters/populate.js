angular.module('filters.populate', [])
.filter('populate', function () {

  return function (input, message, details) {

    function compose (text, blank, detail) {
      var populatedMessage;
      var populatedMessage = _.replace(text, blank, detail);
      return populatedMessage;
    }

    return compose(input, message.blanks[0], details[0].name);
  };
});
