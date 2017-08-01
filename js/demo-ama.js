/**
 * demo-ama.js
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
			this.DOM.name = el.querySelector('.menu__item-name');
			this.colors = {
				active: window.getComputedStyle(this.DOM.el).getPropertyValue('--menu-item-color')
			};
			charming(this.DOM.name);
			this.DOM.nameLetters = Array.from(this.DOM.name.querySelectorAll('span'));
			this.colors.initial = window.getComputedStyle(this.DOM.nameLetters[0]).color;
			this.initEvents();
		}
		initEvents() {
			const duration = 150;

			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				anime.remove(this.DOM.nameLetters);
				anime({
					targets: this.DOM.nameLetters,
					delay: (t,i) => i*20,
					translateY: [
						{value: (t,i) => i%2===0?10:-10, duration: duration, easing: 'easeInSine'},
						{value: (t,i) => i%2===0?[-10,0]:[10,0], duration: duration+700, easing: 'easeOutElastic', elasticity: 600}
					],
					opacity: [
						{value: 0, duration: duration, easing: 'linear'},
						{value: 1, duration: duration, easing: 'linear'}
					],
					color: {
						value: this.colors.active, 
						duration: 1,
						delay:(t,i) => i*20+duration, 
						easing: 'linear'
					}
				});
			}, 50);

			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;

				anime.remove(this.DOM.nameLetters);
				anime({
					targets: this.DOM.nameLetters,
					delay: (t,i,l) => (l-i-1)*20,
					translateY: [
						{value: (t,i) => i%2===0?-10:10, duration: duration, easing: 'easeInSine'},
						{value: (t,i) => i%2===0?[10,0]:[-10,0], duration: duration+700, easing: 'easeOutElastic', elasticity: 600}
					],
					opacity: [
						{value: 0, duration: duration, easing: 'linear'},
						{value: 1, duration: duration, easing: 'linear'}
					],
					color: {
						value: this.colors.initial, 
						duration: 1,
						delay:(t,i,l) => (l-i-1)*20+duration, 
						easing: 'linear'
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