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
function createProvider(childContext, PropTypes) {
  class StyletronProvider extends React.Component {
    getChildContext() {
      return this.childContext;
    }
    constructor(props) {
      super(props);
      this.childContext = childContext(props);
    }
    render() {
      return React.Children.only(this.props.children);
    }
  }

  StyletronProvider.PropTypes = PropTypes;

  StyletronProvider.childContextTypes = {
    styletron: React.PropTypes.object,
    injectStyle: React.PropTypes.func
  };

  return StyletronProvider;
}

module.exports = createProvider;
