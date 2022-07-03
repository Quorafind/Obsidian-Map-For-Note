export function invariant(check: boolean, message: string, scope = 'ss-graph') {
  if (!check) {
    throw new Error(`${scope ? '[' + scope + ']' : ''} Invariant failed: ${message}`);
  }
}

// https://github.com/lodash/lodash/blob/3.0.8-npm-packages/lodash.isfunction/index.js
const funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]';
const objectToString = Object.prototype.toString;

function isObject(value: any) {
  const type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

export function isFunction(value: any): boolean {
  const tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * 判断对象是否存在
 * @param {*} val - 待判断的对象
 * @param {bool} andString - 也要考虑字符串的 'undefined' 和 'null' 情况
 */
export function isExist(val: any, andString = true): boolean {
  const result = typeof val !== 'undefined' && val !== null;

  if (andString) {
    return result && val !== 'undefined' && val !== 'null';
  } else {
    return result;
  }
}

export const wrapAround = (value: number, size: number): number => {
  return ((value % size) + size) % size;
};
