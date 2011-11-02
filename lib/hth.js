window.spade.require('sproutcore');
window.spade.require('sproutcore-datastore');

var HTH = SC.Application.create();

HTH.Offerable = SC.Record.extend({
  title: SC.Record.attr(String),
  offers: SC.Record.toMany('HTH.Offer',{
    isMaster: YES,
    inverse: 'offerable'
  })
});

HTH.Offer = SC.Record.extend({
  tutor: SC.Record.attr(String),
  tuition_rate: SC.Record.attr(String),
  offerable: SC.Record.toOne('HTH.Offerable', {
    isMaster: NO,
    inverse: 'offers'
  })
});

HTH.Offerable.FIXTURES = [ { guid: 1, title: 'Help me please!', offers: [1,2]}, 
                           { guid: 2, title: 'I like to be helped'}];
HTH.Offer.FIXTURES    = [{ guid: 1, tutor: 'jack sprat', tuition_rate: 2032, offerable: 1}, 
                         { guid: 2, tutor: 'albert einstein', tuition_rate: 3302, offerable: 1}];

HTH.store = SC.Store.create().from(SC.Record.fixtures);

HTH.offerablesController = SC.ArrayProxy.create({
  content: HTH.store.find(HTH.Offerable),
  selection: function(i){
    return this.content.get('firstObject').get('offers');
  }.property('content')
});

HTH.offersController = SC.ArrayController.create({
  contentBinding: 'HTH.offerablesController.selection'
});
