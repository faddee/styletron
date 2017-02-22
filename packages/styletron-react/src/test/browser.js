const test = require('tape');
const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
const Styletron = require('styletron-server');
const {injectStyle} = require('styletron-utils');

const styled = require('../styled');
const Provider = require('../provider');
const FeaturedProvider = require('../featured-provider');

test('provider provides function', t => {
  const func = () => true;
  const MockComponent = (props, context) => {
    t.equal(context.injectStyle, func, 'inject style function provided');
    return React.createElement('div');
  };
  MockComponent.contextTypes = {injectStyle: React.PropTypes.func};
  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: func},
      React.createElement(MockComponent))
  );
  t.end();
});

test('provider throws when passing styletron instance', t => {
  t.plan(1);
  t.throws(() => ReactTestUtils.renderIntoDocument(React.createElement(Provider, {styletron: {}})), /styletron-react\/featured/);
});

test('featured provider applies styles', t => {
  const Widget = styled('div', () => {
    return {color: 'red'};
  });
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(FeaturedProvider, {styletron},
      React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('props passed to styled function', t => {
  t.plan(1);
  const mockProps = {
    prop1: 'foo'
  };
  const Widget = styled('div', props => {
    t.deepEqual(props, mockProps, 'props accessible in style fn');
    return {};
  });
  const styletron = new Styletron();
  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(Widget, mockProps))
  );
});

test('styled applies styles', t => {
  const Widget = styled('div', () => {
    return {color: 'red'};
  });
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('styled applies static styles', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('styled passes through valid props', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(Widget, {'data-bar': 'bar'}))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.getAttribute('data-bar'), 'bar', 'valid attribute prop passed through');
  t.end();
});

test('styled composition', t => {
  const Widget = styled('div', {color: 'red', 'display': 'inline'});
  const SuperWidget = styled(Widget, {display: 'block', background: 'black'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(SuperWidget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a b c', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}.b{display:block}.c{background:black}');
  t.end();
});

test('styled component', t => {
  const Widget = ({className}) => React.createElement('div', {className});
  const SuperWidget = styled(Widget, {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(SuperWidget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('innerRef works', t => {
  t.plan(1);

  const Widget = styled('button', {color: 'red'});
  const styletron = new Styletron();

  class TestComponent extends React.Component {
    componentDidMount() {
      t.ok(this.widgetInner instanceof HTMLButtonElement, 'is button');
    }

    render() {
      return React.createElement(Widget, {innerRef: c => {
        this.widgetInner = c;
      }});
    }
  }

  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(TestComponent))
  );
});

test('innerRef not passed', t => {
  t.plan(2);

  class InnerComponent extends React.Component {
    render() {
      t.deepEqual(this.props, {
        className: 'a',
        foo: 'bar'
      }, 'props match expected');
      return <button>InnerComponent</button>;
    }
  }

  const Widget = styled(InnerComponent, {color: 'red'});
  const styletron = new Styletron();

  class TestComponent extends React.Component {
    componentDidMount() {
      t.ok(
        ReactTestUtils.isCompositeComponentWithType(this.widgetInner, InnerComponent),
        'is InnerComponent'
      );
    }

    render() {
      return React.createElement(Widget, {
        foo: 'bar',
        innerRef: c => {
          this.widgetInner = c;
        }
      });
    }
  }

  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {injectStyle: injectStyle(styletron)},
      React.createElement(TestComponent))
  );
});
