const React = require('react');
const createProvider = require('./create-provider.js');

module.exports = createProvider(
  ({injectStyle, styletron}) => {
    if (!injectStyle && styletron) {
      throw new Error('You need to switch to the exported `StyletronProvider` from `styletron-react/featured` in this upgraded version. For more info please visit: https://github.com/rtsao/styletron/');
    }
    return injectStyle;
  }, {
    injectStyle: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired
  }
);
