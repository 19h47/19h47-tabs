import getOffset from 'Utils/getOffset';

export default function (elements) {
	return elements
		.map(object => getOffset(object).height)
		// eslint-disable-next-line
		.reduce((a, b) => {
			return a > b ? a : b;
		});
}
