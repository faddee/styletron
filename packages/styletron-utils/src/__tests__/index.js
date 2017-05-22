import injectStyle from '../inject-style';
import injectStylePrefixed from '../inject-style-prefixed';
import test from 'tape';

test('test injection', t => {
  const decls = [];
  const spy = {
    injectDeclaration: decl => {
      decls.push(decl);
      return decls.length;
    },
  };
  const classString = injectStyle(spy, {
    color: 'red',
    backgroundColor: 'blue',
    '@media (max-width: 500px)': {
      color: 'purple',
    },
    ':hover': {
      background: 'orange',
    },
  });
  t.equal(classString, '1 2 3 4');
  t.deepEqual(decls, [
    {prop: 'color', val: 'red', media: undefined, pseudo: undefined},
    {
      prop: 'background-color',
      val: 'blue',
      media: undefined,
      pseudo: undefined,
    },
    {
      prop: 'color',
      val: 'purple',
      media: '(max-width: 500px)',
      pseudo: undefined,
    },
    {prop: 'background', val: 'orange', media: undefined, pseudo: ':hover'},
  ]);
  t.end();
});

test('test injection array', function(t) {
  const decls = [];
  const spy = {
    injectDeclaration: function(decl) {
      decls.push(decl);
      return decls.length;
    },
  };
  const classString = injectStyle(spy, {
    color: ['red', 'blue'],
    '@media (max-width: 500px)': {
      color: ['purple', 'orange'],
    },
    ':hover': {
      color: ['green', 'yellow'],
    },
  });
  t.equal(classString, '1 2 3 4 5 6');
  t.deepEqual(decls, [
    {prop: 'color', val: 'red;color:blue', media: undefined, pseudo: undefined},
    {
      prop: 'color',
      val: 'purple;color:orange',
      media: '(max-width: 500px)',
      pseudo: undefined,
    },
    {
      prop: 'color',
      val: 'green;color:yellow',
      media: undefined,
      pseudo: ':hover',
    },
  ]);
  t.end();
});

test('test injection prefixed', function(t) {
  const decls = [];
  const spy = {
    injectDeclaration: function(decl) {
      decls.push(decl);
      return decls.length;
    },
  };
  const classString = injectStylePrefixed(spy, {
    width: 'calc(100%)',
    height: ['min-content', 'calc(50%)'],
    boxSizing: 'border-box',
  });
  t.equal(classString, '1 2 3');
  t.deepEqual(decls, [
    {media: undefined, prop: 'width', pseudo: undefined, val: 'calc(100%)'},
    {
      media: undefined,
      prop: 'height',
      pseudo: undefined,
      val: '-webkit-min-content;height:-moz-min-content;height:min-content;height:calc(50%)',
    },
    {
      media: undefined,
      prop: 'box-sizing',
      pseudo: undefined,
      val: 'border-box',
    },
  ]);
  t.end();
});
