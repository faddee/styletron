const React = require('react');
const createProvider = require('./create-provider.js');

module.exports = createProvider(
  ({styletron, injectStyle}) => {
    if (!injectStyle && styletron) {
      throw new Error('You need to switch to the exported `StyletronProvider` from `styletron-react/featured` in this upgraded version. For more info please visit: https://github.com/rtsao/styletron/');
    }
    return styletron ? {
      styletron,
      injectStyle
    } : {
      injectStyle
    };
  }, {
    styletron: React.PropTypes.object,
    injectStyle: React.PropTypes.func,
    children: React.PropTypes.element.isRequired
  }
);
