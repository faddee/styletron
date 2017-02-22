const React = require('react');

/**
 * @class StyletronProvider
 * @packagename styletron-react
 * @description React component
 * @example
 * const Styletron = require('styletron');
 *
 * function render() {
 *   return React.renderToString(
 *     <StyletronProvider styletron={new Styletron()}>
 *       <App/>
 *     </StyletronProvider>
 *   );
 * }
 *
 * @property {object} styletron - Styletron instance
 * @property {ReactElement} children - children
 * @extends ReactClass
 */
function createProvider(getInjectStyle, PropTypes) {
  class StyletronProvider extends React.Component {
    getChildContext() {
      return {injectStyle: this.injectStyle};
    }
    constructor(props, context) {
      super(props, context);
      this.injectStyle = getInjectStyle(props);
    }
    render() {
      return React.Children.only(this.props.children);
    }
  }

  StyletronProvider.PropTypes = PropTypes;

  StyletronProvider.childContextTypes = {
    injectStyle: React.PropTypes.func.isRequired
  };

  return StyletronProvider;
}

module.exports = createProvider;
