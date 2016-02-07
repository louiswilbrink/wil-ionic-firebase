(function () {
'use strict'

angular.module('services.messages', [])
  .service('Messages', messagesService);

  messagesService.$inject = [];

  function messagesService () {

    var messages = [{
      text: 'Hey ${person1} and ${person2}, wanted to introduce you guys since you\'re both in the ${industry} industry',
      blanks: ['${person1}', '${person2}', '${industry}']
    }, {
      text: 'Hi ${person1}, wanted to introduce you to ${person2}.  ${person2} is a good friend of mine from ${location}',
      blanks: ['${person1}', '${person2}', '${location}']
    }, {
      text: '${person1} and ${person2}, You guys should connect.',
      blanks: ['${person1}', '${person2}']
    }];

    return {
      messages: messages,
    }
  };
})();
