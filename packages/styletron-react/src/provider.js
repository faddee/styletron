const React = require('react');
const createProvider = require('./create-provider.js');

module.exports = createProvider(({injectStyle}) => injectStyle, {
  injectStyle: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired
});
