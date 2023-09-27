# @19h47/tabs

> Tabulation partout, tabulation nulle part

## Installation

```
yarn add @19h47/tabs
```

## Usage

```js
import Tabs from '@19h47/tabs';

const $element = document.querySelector('.js-tabs');
const tabs = new Tabs($element);

tabs.init();
```

### Tablist

The element that serves as a container for the set of tabs. The `role="tablist"` attribute is required.  
The `aria-label=""` attribute provides a label that describes the purpose of the set of tabs.

```html
<ul role="tablist" aria-label="navigation">
	<li>
		<button
			type="button"
			class="is-active"
			role="tab"
			aria-selected="true"
			aria-controls="home-tab"
			id="home"
		>
			Home
		</button>
	</li>
	<li>
		<button
			type="button"
			role="tab"
			aria-selected="false"
			aria-controls="project-tab"
			id="project"
			tabindex="-1"
		>
			Project
		</button>
	</li>
	<li>
		<button
			type="button"
			role="tab"
			aria-selected="false"
			aria-controls="contact-tab"
			id="contact"
			tabindex="-1"
			data-deletable=""
		>
			Contact
		</button>
	</li>
</ul>
```

You can change the tablist orientation with the attribute `aria-orientation` on the `tablist` element:

```html
<ul role="tablist" aria-orientation="vertical"></ul>
```

### Tab

An element in the tab list that serves as a label for one of the tab panels and can be activated to display that panel.

```html
<button
	type="button"
	role="tab"
	aria-selected="false"
	aria-controls="foo-tab"
	id="foo"
	tabindex="-1"
>
	Project
</button>
```

The `role="tab"` attribute is required.

The `aria-controls="foo-tab"` refers to the id of the tabpanel element associated with the tab.

Since an HTML button element is used for the tab, it is not necessary to set `tabindex="0"` on the selected (active) tab element.

Is the tabulation deletable ? You can set up this option by adding the `data-deletable` attribute on button.

To active the button on first load, add a `is-active` class to the button, remove the `tabindex` attribute and switch to `true` the `aria-selected` attribute.

### Tabpanel

The element that contains the content associated with a tab.

```html
<section tabindex="0" role="tabpanel" aria-labelledby="foo" id="foo-tab">
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil hic, vero. Fugiat voluptas
		ex consequatur hic nemo officia iure placeat non, pariatur, dolore natus nobis, tempore
		dolores dicta nisi inventore.
	</p>
</section>
```

To active panel on first load, add a `is-active` class to it.

## Keyboard support

| Key                       | Function                                                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tab                       | <ul><li>When focus moves into the tab list, places focus on the active tab element</li><li>When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the <code>tabpanel</code> element.</li></ul> |
| Enter<br>Space            | When a tab has focus, activates the tab, causing its associated panel to be displayed.                                                                                                                                         |
| Right Arrow               | When a tab has focus:<ul><li>Moves focus to the next tab.</li><li>If focus is on the last tab, moves focus to the first tab.</li></ul>                                                                                         |
| Left Arrow                | When a tab has focus:<ul><li>Moves focus to the previous tab.</li><li>If focus is on the first tab, moves focus to the last tab.</li></ul>                                                                                     |
| Home<br>`fn + left arrow` | When a tab has focus, moves focus to the first tab.                                                                                                                                                                            |
| End<br>`fn + right arrow` | When a tab has focus, moves focus to the last tab.                                                                                                                                                                             |
| Delete                    | When focus is on the **Contact** tab, removes the tab from the tab list and places focus on the previous tab.                                                                                                                  |

## Options

| Option   | Type     | Default  | Description                                                                                                                                                    |
| -------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delay    | integer  | 0        | Determine whether there should be a delay when user navigates with the arrow keys                                                                              |
| hash     | boolean  | true     |                                                                                                                                                                |
| callback | function | () => {} | A callback fired right before `Tab.activate` event. Useful for animation or to fetch data for instance. Don't use arrow function if you need to access `this`. |

```javascript
import Tabs from '@19h47/tabs';

const $element = document.querySelector('.js-tabs');
const tabs = new Tabs.default($el, {
	callback() {
		return new Promise(resolve => {
			// animate, fetch data, use this, do your stuff, etc.
			resolve();
		});
	},
});

tabs.init();
```

## Events

| Event        | Arguments | Description                                                            |
| ------------ | --------- | ---------------------------------------------------------------------- |
| Tab.activate | event     | Object containing current **controls** id, and current DOM **element** |
| Tab.delete   | event     | Object containing current **controls** id, and current DOM **element** |

```javascript
import Tabs from '@19h47/tabs';

const $element = document.querySelector('.js-tabs');
const tabs = new Tabs($element);

tabs.init();

tabs.tabs.forEach($tab => {
	$tab.on('Tab.activate', ({ controls, element }) => {
		console.log(controls, element);
	});
	$tab.on('Tab.delete', ({ controls, element }) => {
		console.log(controls, element);
	});
});
```

## Methods

| Method      |         |
| ----------- | ------- |
| `destroy()` | Destroy |
| `init()`    | Create  |
| `create()`  | Create  |

## Build Setup

```bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn start

# build for production
$ yarn prod

```

## Example

An example is located right [here](https://19h47.github.io/19h47-tabs/), see [sources](/docs/index.html).

## Acknowledgments

-   [Deciding When to Make Selection Automatically Follow Focus](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus)
-   [Example of Tabs with Manual Activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/)
-   [Example of Tabs with Automatic Activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/)
-   [Keycode](https://keycode.info/) by [Wes Bos](https://wesbos.com/)
