import defaultSort from './sortFunction/default';
import numericSort from './sortFunction/numeric';
import dateSort from './sortFunction/date';
import staticRegister from '../../utils/staticRegister';

export const DO_NOT_SWAP = 0;
export const FIRST_BEFORE_SECOND = -1;
export const FIRST_AFTER_SECOND = 1;

const NUMERIC_DATA_TYPE = 'numeric';
const DATE_DATA_TYPE = 'date';
const DEFAULT_DATA_TYPE = 'default';

const {
  register: registerGloballyCompareFunctionFactory,
  getItem: getGloballyCompareFunctionFactory,
  hasItem: hasGloballyCompareFunctionFactory,
} = staticRegister('sorting.compareFunctionFactory');

let mainSortComparator;
let sortConfigNormalizator;

/**
 * Register compare function factory.
 *
 * @param {String} dataType
 * @param {Function} compareFunctionFactory
 */
export function registerCompareFunctionFactory(dataType, compareFunctionFactory) {
  registerGloballyCompareFunctionFactory(dataType, compareFunctionFactory);
}

/**
 * Gets sort function for the particular column basing on it's settings.
 *
 * @param {Object} columnMeta Column meta object.
 * @param {Object} columnPluginSettings Plugin settings for the column.
 * @returns {Function}
 */
export function getCompareFunctionFactory(columnMeta, columnPluginSettings) {
  if (columnPluginSettings.compareFunctionFactory) {
    return columnPluginSettings.compareFunctionFactory;
  }

  if (hasGloballyCompareFunctionFactory(columnMeta.type)) {
    return getGloballyCompareFunctionFactory(columnMeta.type);
  }

  return getGloballyCompareFunctionFactory(DEFAULT_DATA_TYPE);
}

/**
 * Register sort config normalizator.
 *
 * @param {Function} normalizator Function which normalize sort config.
 */
export function registerSortConfigNormalizator(normalizator) {
  sortConfigNormalizator = normalizator;
}

/**
 * Get sort config normalizator.
 *
 * @returns {Function} Function which normalize sort config.
 */
export function getSortConfigNormalizator() {
  return sortConfigNormalizator;
}

/**
 * Register main sort comparator.
 *
 * @param {Function} comparator Function which compare sorted values.
 */
export function registerMainSortComparator(comparator) {
  mainSortComparator = comparator;
}

/**
 * Get main sort comparator.
 *
 * @returns {Function} Function which compare sorted values.
 */
export function getMainSortComparator() {
  return mainSortComparator;
}

registerGloballyCompareFunctionFactory(NUMERIC_DATA_TYPE, numericSort);
registerGloballyCompareFunctionFactory(DATE_DATA_TYPE, dateSort);
registerGloballyCompareFunctionFactory(DEFAULT_DATA_TYPE, defaultSort);
