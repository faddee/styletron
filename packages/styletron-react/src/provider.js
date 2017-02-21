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
class StyletronProvider extends React.Component {
  getChildContext() {
    return {injectStyle: this.props.injectStyle};
  }
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

StyletronProvider.PropTypes = {
  injectStyle: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired
};

StyletronProvider.childContextTypes = {
  injectStyle: React.PropTypes.func.isRequired
};

module.exports = StyletronProvider;
