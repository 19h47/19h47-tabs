/**
 * Get hash
 *
 * @param  String href Given href.
 * @return String
 * @see https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js#L38
 */
export default function getHash(href) {
	const hashIndex = href.indexOf('#');

	return -1 === hashIndex ? '' : href.substring(hashIndex + 1);
}
