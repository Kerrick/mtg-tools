import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: '',
    bgStyle: computed('card.printings.firstObject.{types.[],colors.[]}', function() {
        const printing = this.card.printings.firstObject;
        if (printing.colors.length === 1) {
            return printing.colors.firstObject;
        }
        if (printing.types.includes('Artifact')) {
            return 'A';
        }
        if (printing.types.includes('Land')) {
            if (printing.colorIdentity.length === 0) {
                return 'L';
            }
            if (printing.colorIdentity.length === 1) {
                return printing.colorIdentity.firstObject;
            }
            return 'M';
        }
        return 'UNKNOWN';
    }),
});
