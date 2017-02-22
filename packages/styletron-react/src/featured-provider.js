const React = require('react');
const {injectStylePrefixed} = require('styletron-utils');
const createProvider = require('./create-provider.js');

module.exports = createProvider(({styletron}) => injectStylePrefixed(styletron), {
  styletron: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired
});
