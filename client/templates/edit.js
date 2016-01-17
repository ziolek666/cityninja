Template.editReport.onCreated(trackPageView);
Template.editReport.onRendered(function() {
  var tags = makeTagInput('#edit-report-tags');
  this.data.tags.forEach(function(key) {
    tags.materialtags('add', {
      id: key,
      name: Tags.findOne({key}).name
    });
  });
});

Template.editReport.events({
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call('updateReport', this._id, Router.current().params.token, {
      text: evt.target['edit-report-text'].value,
      tags: evt.target['edit-report-tags'].value.split(',').filter(nonEmpty)
    });
  },
});

Template.editAnnouncement.events({
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'updateAnnouncement', this._id, Router.current().params.token, {
        aux: evt.target.aux.value,
        text: evt.target.text.value,
        dismisslabel: evt.target.dismisslabel.value,
        ctalabel: evt.target.ctalabel.value,
        ctaroute: evt.target.ctaroute.value,
      });
    toast(pickRandom(toasts.created));
  },
});
