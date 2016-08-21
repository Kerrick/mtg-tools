import deckParser from 'playtest-cards/utils/deck-parser';
import { module, test } from 'qunit';

module('Unit | Utility | deck parser');

// Replace this with your real tests.
test('it works', function(assert) {
  const expected = {
    cards: [
      { number: 4, name: `Master of Waves` },
      { number: 2, name: `Tidebinder Mage` },
      { number: 4, name: `Master of the Pearl Trident` },
      { number: 2, name: `Dismember` },
      { number: 2, name: `Spell Pierce` },
      { number: 4, name: `Spreading Seas` },
      { number: 4, name: `Cursecatcher` },
      { number: 4, name: `Mutavault` },
      { number: 4, name: `Merrow Reejerey` },
      { number: 4, name: `Silvergill Adept` },
      { number: 2, name: `Kira, Great Glass-Spinner` },
      { number: 4, name: `Aether Vial` },
      { number: 16, name: `Island` },
      { number: 4, name: `Lord of Atlantis` },
    ],
    sideboard: [
      { number: 3, name: `Tectonic Edge` },
      { number: 2, name: `Relic of Progenitus` },
      { number: 2, name: `Gut Shot` },
      { number: 2, name: `Negate` },
      { number: 3, name: `Chalice of the Void` },
      { number: 3, name: `Hurkyl's Recall` },
    ]
  };


  const result1 = deckParser(`4 Master of Waves
2 Tidebinder Mage
4 Master of the Pearl Trident
2 Dismember
2 Spell Pierce
4 Spreading Seas
4 Cursecatcher
4 Mutavault
4 Merrow Reejerey
4 Silvergill Adept
2 Kira, Great Glass-Spinner
4 Aether Vial
16 Island
4 Lord of Atlantis

3 Tectonic Edge
2 Relic of Progenitus
2 Gut Shot
2 Negate
3 Chalice of the Void
3 Hurkyl's Recall`);


  const result2 = deckParser(`4 Master of Waves
2 Tidebinder Mage
4 Master of the Pearl Trident
2 Dismember
2 Spell Pierce
4 Spreading Seas
4 Cursecatcher
4 Mutavault
4 Merrow Reejerey
4 Silvergill Adept
2 Kira, Great Glass-Spinner
4 Aether Vial
16 Island
4 Lord of Atlantis

Sideboard
3 Tectonic Edge
2 Relic of Progenitus
2 Gut Shot
2 Negate
3 Chalice of the Void
3 Hurkyl's Recall`);


  const result3 = deckParser(`4x Master of Waves
2x Tidebinder Mage
4x Master of the Pearl Trident
2x Dismember
2x Spell Pierce
4x Spreading Seas
4x Cursecatcher
4x Mutavault
4x Merrow Reejerey
4x Silvergill Adept
2x Kira, Great Glass-Spinner
4x Aether Vial
16x Island
4x Lord of Atlantis

Sideboard:
3x Tectonic Edge
2x Relic of Progenitus
2x Gut Shot
2x Negate
3x Chalice of the Void
3x Hurkyl's Recall`);


  const result4 = deckParser(`4 Master of Waves
// Not sure if I want Tidebinder Mage in this metagame
2 Tidebinder Mage
4 Master of the Pearl Trident
2 Dismember
2 Spell Pierce
4 Spreading Seas
4 Cursecatcher
4 Mutavault
4 Merrow Reejerey
4 Silvergill Adept
# Removal is everywhere, gotta have these mainboard.
2 Kira, Great Glass-Spinner
4 Aether Vial
16 Island
4 Lord of Atlantis

3 Tectonic Edge
2 Relic of Progenitus
2 Gut Shot
2 Negate
3 Chalice of the Void
3 Hurkyl's Recall`);


  const result5 = deckParser(`

4 Master of Waves
2 Tidebinder Mage
4 Master of the Pearl Trident
2 Dismember
2 Spell Pierce
4 Spreading Seas
4 Cursecatcher
4 Mutavault
4 Merrow Reejerey
4 Silvergill Adept
2 Kira, Great Glass-Spinner
4 Aether Vial
16 Island
4 Lord of Atlantis

3 Tectonic Edge
2 Relic of Progenitus
2 Gut Shot
2 Negate
3 Chalice of the Void
3 Hurkyl's Recall

`);


  assert.propEqual(result1, expected, 'Simple list with sideboard after newline');
  assert.propEqual(result2, expected, 'Simple list with Sideboard label');
  assert.propEqual(result3, expected, 'List with 4x and "Sideboard:" label');
  assert.propEqual(result4, expected, 'Simple list with // and # comments');
  assert.propEqual(result5, expected, 'Simple list with extra newlines');
});
test('edge cases', function(assert) {
  assert.propEqual(deckParser(`4 Swords to Plowshares
4 Counterspell
26 Island
26 Plains`), {
    cards: [
      { number: 4, name: 'Swords to Plowshares' },
      { number: 4, name: 'Counterspell' },
      { number: 26, name: 'Island' },
      { number: 26, name: 'Plains' },
    ],
    sideboard: []
  }, 'No sideboard');


  assert.propEqual(deckParser(`Swords to Plowshares
Counterspell
Island
Plains`), {
    cards: [
      { number: 1, name: 'Swords to Plowshares' },
      { number: 1, name: 'Counterspell' },
      { number: 1, name: 'Island' },
      { number: 1, name: 'Plains' },
    ],
    sideboard: []
  }, 'One-ofs if unspecified');
});
