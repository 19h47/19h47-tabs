/**
 * [description]
 * @param  {[type]} href [description]
 * @return {[type]}      [description]
 * @see https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js#L38
 */
export default function (href) {
	const hashIndex = href.indexOf('#');

	return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}
