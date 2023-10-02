/**
 * Get hash
 *
 * @param  {string} href Given href.
 *
 * @return String
 * @see https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js#L38
 */
export default function getHash(href: string): string {
	const index = href.indexOf('#');

	return -1 === index ? '' : href.substring(index + 1);
}
