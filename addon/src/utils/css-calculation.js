/**
  Gets a numeric border-spacing values for a given element.

  @method getBorderSpacing
  @param {Element} element
  @return {Object}
  @private
*/
export function getBorderSpacing(el) {
  let css = getComputedStyle(el).borderSpacing; // '0px 0px'
  let [horizontal, vertical] = css.split(' ');

  return {
    horizontal: parseFloat(horizontal),
    vertical: parseFloat(vertical),
  };
}

/**
  Gets numeric gap values for a given element

  @method getGap
  @param {Element} element
  @return {Object}
  @private
*/
export function getGap(el) {
  let { columnGap, rowGap } = getComputedStyle(el);

  columnGap = parseFloat(columnGap); // '0px' or 'normal'
  rowGap = parseFloat(rowGap); // '0px' or 'normal'

  if (isNaN(columnGap)) {
    columnGap = 0;
  }

  if (isNaN(rowGap)) {
    rowGap = 0;
  }

  return {
    horizontal: columnGap,
    vertical: rowGap,
  };
}
