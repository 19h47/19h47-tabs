/**
 * Get offset x, y, width and height
 *
 * @param	el		DOM element
 * @return	obj		x and y
 */
export default function (el) {
	return {
		x: el.getBoundingClientRect().left,
		y: el.getBoundingClientRect().top,
		width: el.getBoundingClientRect().width,
		height: el.getBoundingClientRect().height,
	};
}
