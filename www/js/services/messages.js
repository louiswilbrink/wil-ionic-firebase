(function () {
'use strict'

angular.module('services.messages', [])
  .service('Messages', messagesService);

  messagesService.$inject = [];

  function messagesService () {

    var messages = [{
      text: 'Hey ${p0} and ${p1}, wanted to introduce you guys since you\'re both in the real estate industry',
      blanks: {
        p: 2
      }
    }, {
      text: 'Hi ${p0}, wanted to introduce you to ${p1}.  ${p1} is a good friend of mine from college',
      blanks: {
        p: 2
      }
    }, {
      text: '${p0} and ${p1}, You guys should connect.',
      blanks: {
        p: 2
      }
    }];

    return {
      messages: messages,
    }
  };
})();
