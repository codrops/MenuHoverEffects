/**
 * demo-salal.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	const items = Array.from(document.querySelectorAll('.menu > .menu__item'));

	class Item {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.label = el.querySelector('.menu__item-label');
			this.colors = {
				active: window.getComputedStyle(this.DOM.el).getPropertyValue('--menu-item-color')
			};
			charming(this.DOM.label);
			this.DOM.labelLetters = Array.from(this.DOM.label.querySelectorAll('span'));
			this.colors.initial = window.getComputedStyle(this.DOM.labelLetters[0]).color;
			this.initEvents();
		}
		initEvents() {
			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				anime.remove(this.DOM.labelLetters);
				anime({
					targets: this.DOM.labelLetters,
					delay: (t,i) => i*7,
					translateY: [
						{value: 10, duration: 150, easing: 'easeInQuad'},
						{value: [-10,0], duration: 150, easing: 'easeOutQuad'}
					],
					opacity: [
						{value: 0, duration: 150, easing: 'linear'},
						{value: 1, duration: 150, easing: 'linear'}
					],
					color: {
						value: this.colors.active,
						duration: 1,
						delay: (t,i,l) => i*7+150
					}
				});
			}, 50);

			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;

				anime.remove(this.DOM.labelLetters);
				anime({
					targets: this.DOM.labelLetters,
					delay: (t,i,l) => (l-i-1)*7,
					translateY: [
						{value: 10, duration: 150, easing: 'easeInQuad'},
						{value: [-10,0], duration: 150, easing: 'easeOutQuad'}
					],
					opacity: [
						{value: 0, duration: 150, easing: 'linear'},
						{value: 1, duration: 150, easing: 'linear'}
					],
					color: {
						value: this.colors.initial,
						duration: 1,
						delay: (t,i,l) => (l-i-1)*7+150
					}
				});
			};

			this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
			this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
			this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
			this.DOM.el.addEventListener('touchend', this.mouseleaveFn);
		}
	};

	items.forEach(item => new Item(item));
};