import Object from '@ember/object';
import { A } from '@ember/array';
import Service, {
  inject as service
} from '@ember/service';
import { preferredPrinting } from 'mtg-tools/services/mtg';

export default Service.extend({
  mtg: service(),
  init() {
    this.set(
      'cardNames',
      Object.create({})
    );
    this.set('cardPrintings', A([]));
  },
  preferName(
    oracleName,
    preferredName
  ) {
    this.get('cardNames').set(
      oracleName,
      preferredName
    );
  },
  preferPrinting(oracleName, printing) {
    const found = this.cardPrintings.findBy(
      'name',
      oracleName
    );
    if (found) {
      this.cardPrintings.removeObject(
        found
      );
    }
    this.get('cardPrintings').addObject(
      { name: oracleName, printing }
    );
  },
  preferredPrintingFor(
    oracleName,
    userPreferenceService = this,
    mtgService = this.get('mtg')
  ) {
    const found = userPreferenceService
      .get('cardPrintings')
      .findBy('name', oracleName);
    return (
      (found && found.printing) ||
      mtgService
        .cardsNamed(oracleName)
        .sort(preferredPrinting)[0]
    );
  }
});
