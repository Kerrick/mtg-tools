import Component from '@ember/component';
import { set, computed } from '@ember/object';

const SPACING = 10;
const WIDTH = 240;
const HEIGHT = 936 / 672 * WIDTH;

const makeListener = fn => computed(function() {
        return function(event) {
            if (event.target !== this.element.parentNode) {
                return;
            }
            fn.call(this, event);
        }.bind(this);
    });

export default Component.extend({
    tagName: 'card-preview',
    isHovering: false,
    width: WIDTH,
    mouseenterListener: makeListener(function(event) {
        set(this, 'isHovering', true);
    }),
    mouseleaveListener: makeListener(function(event) {
        set(this, 'isHovering', false);
    }),
    mousemoveListener: computed(function() {
        return function(event) {
            const rightEdge = event.clientX + SPACING + WIDTH;
            const bottomEdge = event.clientY + SPACING + HEIGHT;
            set(this, 'x', (rightEdge <= window.innerWidth) ? (event.clientX + SPACING) : event.clientX - SPACING - WIDTH);
            set(this, 'y', (bottomEdge <= window.innerHeight) ? (event.clientY + SPACING) : event.clientY - SPACING - HEIGHT);
        }.bind(this);
    }),
    didInsertElement() {
        this.element.parentNode.addEventListener('mouseenter', this.mouseenterListener);
        this.element.parentNode.addEventListener('mouseleave', this.mouseleaveListener);
        this.element.parentNode.addEventListener('mousemove', this.mousemoveListener);
    },
    willDestroylement() {
        this.element.parentNode.removeEventListener('mouseenter', this.mouseenterListener);
        this.element.parentNode.removeEventListener('mouseleave', this.mouseleaveListener);
        this.element.parentNode.removeEventListener('mousemove', this.mousemoveListener);
    }
});
