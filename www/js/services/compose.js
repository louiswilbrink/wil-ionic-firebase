(function () {
'use strict'

angular.module('services.compose', [])
  .service('Compose', composeService);

  composeService.$inject = [];

  function composeService () {

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

    return {
      message: function (message, details) {

        var introductees = {};

        // Get total number of blanks in a message, based on the text only.
        var blanks = message.text.match(/\${[pil][0-9]}/gi);

        angular.forEach(message.blanks, function (total, type) {
          for(var i = 0; i < total; i++) {
            if (!details[i]) {
              return;
            }
            introductees['${' + type + i + '}'] = details[i].name;
          }
        });

        return compose(message.text, blanks, introductees);
      }
    }
  };
})();
