module.exports = function () {
  var element = document.createElement('h1');
  console.log('yeees')
  element.className = 'pure-button';

  element.innerHTML = 'Helloooo world';

  return element;
};
