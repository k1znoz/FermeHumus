import { CATEGORY_VISIBILITY_WINDOWS } from '$lib/constants.js';

function toMonthDayNumber(month, day) {
	const m = Number(month);
	const d = Number(day);
	if (!Number.isInteger(m) || !Number.isInteger(d) || m < 1 || m > 12 || d < 1 || d > 31) {
		return null;
	}

	return m * 100 + d;
}

function isWithinWindow(date, start, end) {
	const current = date.getMonth() + 1;
	const today = date.getDate();
	const currentValue = current * 100 + today;

	const startValue = toMonthDayNumber(start?.month, start?.day);
	const endValue = toMonthDayNumber(end?.month, end?.day);

	if (startValue == null || endValue == null) {
		return true;
	}

	if (startValue <= endValue) {
		return currentValue >= startValue && currentValue <= endValue;
	}

	// Handles ranges crossing the year boundary (e.g. Nov -> Feb)
	return currentValue >= startValue || currentValue <= endValue;
}

function getProductWindow(product) {
	if (product.visibilityMode === 'always') {
		return null;
	}

	if (product.visibilityMode === 'custom') {
		return {
			start: {
				month: product.seasonStartMonth,
				day: product.seasonStartDay
			},
			end: {
				month: product.seasonEndMonth,
				day: product.seasonEndDay
			}
		};
	}

	return CATEGORY_VISIBILITY_WINDOWS[product.category] ?? null;
}

export function isProductVisibleToday(product, date = new Date()) {
	const window = getProductWindow(product);
	if (!window) {
		return true;
	}

	return isWithinWindow(date, window.start, window.end);
}
