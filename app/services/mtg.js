import Ember from 'ember';

export default Ember.Service.extend({
  allSets: Ember.computed(function() {
    return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
      promise: Ember.RSVP.resolve(Ember.$.ajax({
        url: 'http://mtgjson.com/json/AllSets-x.jsonp',
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'mtgjsoncallback'
      }))
    });
  }),
  isLoading: Ember.computed.readOnly('allSets.isPending'),
});
