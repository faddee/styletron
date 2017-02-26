const React = require('react');
const {injectStylePrefixed} = require('styletron-utils');
const createProvider = require('./create-provider.js');

module.exports = createProvider(
  ({styletron, injectStyle}) => styletron ? {
      styletron,
      injectStylePrefixed
    } : {
      injectStylePrefixed
    }, {
    styletron: React.PropTypes.object,
    children: React.PropTypes.element.isRequired
  }
);
