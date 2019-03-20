import Ember from "ember";
import { preferredPrinting } from "mtg-tools/services/mtg";

const printingFor = which =>
  Ember.computed(which, function() {
    return this.get("mtg")
      .cardsNamed(this.get(which))
      .sort(preferredPrinting)[0];
  });
export default Ember.Controller.extend({
  mtg: Ember.inject.service(),

  left: "",
  primary: "",
  right: "",

  leftPrinting: printingFor("left"),
  primaryPrinting: printingFor("primary"),
  rightPrinting: printingFor("right"),

  actions: {
    swap() {
      const left = this.get("left");
      const right = this.get("right");
      this.set("left", right);
      this.set("right", left);
    }
  }
});
