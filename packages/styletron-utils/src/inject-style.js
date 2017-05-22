import hyphenate from './hyphenate-style-name';

export default function injectStyle(styletron, styles, media, pseudo) {
  let classString = '';
  for (const key in styles) {
    const val = styles[key];
    const valType = typeof val;
    if (valType === 'string' || valType === 'number') {
      classString +=
        ' ' +
        styletron.injectDeclaration({
          prop: hyphenate(key),
          val,
          media,
          pseudo,
        });
      continue;
    }
    if (Array.isArray(val) && val.length > 0) {
      let arrVal = val[0];
      const hyphenated = hyphenate(key);
      for (let i = 1; i < val.length; i++) {
        arrVal += `;${hyphenated}:${val[i]}`;
      }
      classString +=
        ' ' +
        styletron.injectDeclaration({
          prop: hyphenated,
          val: arrVal,
          media,
          pseudo,
        });
      continue;
    }
    if (valType === 'object') {
      if (key[0] === ':') {
        classString += ' ' + injectStyle(styletron, val, media, key);
        continue;
      }
      if (key.substring(0, 6) === '@media') {
        classString += ' ' + injectStyle(styletron, val, key.substr(7), pseudo);
        continue;
      }
    }
  }
  // remove leading space on way out
  return classString.slice(1);
}
