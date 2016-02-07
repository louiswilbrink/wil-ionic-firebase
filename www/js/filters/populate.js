angular.module('filters.populate', [])
.filter('populate', function () {

  return function (input, message, details) {
    var blanks, 
        introductees = {};

    function compose (text, blanks, introductees) {
      var populatedMessage = text;

      angular.forEach(blanks, function (blank) {
        if (!introductees[blank]) {
          return;
        }
        populatedMessage = _.replace(populatedMessage, blank, introductees[blank])
      });

      return populatedMessage;
    }

    // Get total number of blanks in a message, based on the text only.
    var blanks = input.match(/\${[pil][0-9]}/gi);

    angular.forEach(message.blanks, function (total, type) {
      for(i = 0; i < total; i++) {
        introductees['${' + type + i + '}'] = details[i].name;
      }
    });

    return compose(input, blanks, introductees);
  };
});
