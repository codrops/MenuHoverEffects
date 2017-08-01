/**
 * demo-mohe.js
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
			charming(this.DOM.name);
			this.DOM.nameLetters = Array.from(this.DOM.name.querySelectorAll('span'));
			this.initEvents();
		}
		initEvents() {
			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				anime.remove(this.DOM.nameLetters);
				anime({
					targets: this.DOM.nameLetters,
					duration: 800,
					easing: [0.7,0,0.3,1],
					scale: (t,i) => [1,anime.random(0,1) ? 0.8:1.4],
					translateX: (t,i) => {
						const elBounds = this.DOM.el.getBoundingClientRect();
						const x1 = elBounds.left + elBounds.width/2;
						const y1 = elBounds.top + elBounds.height/2;
						
						const targetBounds = t.getBoundingClientRect();
						const x2 = targetBounds.left + targetBounds.width/2;
						const y2 = targetBounds.top + targetBounds.height/2;

						const dist = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
						const maxDist = Math.sqrt(Math.pow(elBounds.left-x1,2) + Math.pow(elBounds.top-y1,2));
						const maxTX = x2<x1?-250:250;

						return maxTX/maxDist*dist;
					},
					translateY: (t,i) => [0,anime.random(-40,40)],
					rotateZ: (t,i) => [0,anime.random(-20,20)],
					opacity: (t,i) => 0.3,
				});	
			}, 50);

			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;
				anime.remove(this.DOM.nameLetters);
				anime({
					targets: this.DOM.nameLetters,
					duration: 800,
					easing: [0.7,0,0.3,1],
					scale: 1,
					translateX: 0,
					translateY: 0,
					rotateZ: 0,
					opacity: 1
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