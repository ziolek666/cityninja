Template.detail.onCreated(trackPageView);
Template.detail.onRendered(observeComments);

function observeComments() {
  Reports.find(this.data._id).observeChanges({
    changed(_, fields) {
      Tracker.afterFlush(() => {
        if (!fields.lastComment) {
          return;
        }

        const id = fields.lastComment.createdAt.valueOf();
        const commentCard = document.getElementById(id);
        commentCard.classList.add('nj-card--new');

        const comments = document.querySelector('.nj-detail__comments');
        comments.scrollTop = comments.scrollHeight;
      });
    }
  });
}

Template.detail.helpers({
  isTweet: isTweet,
});

Template.detail.events({
  'keyup #comment-text': function(evt, template) {
    const input = template.find('#comment-text');
    const button = template.find('.nj-card__send');
    const method = input.value.trim() ?
      button.removeAttribute('disabled') :
      button.setAttribute('disabled', 'disabled');
  },
  'submit form': function(evt, template) {
    evt.preventDefault();
    const input = template.find('#comment-text');
    const text = input.value.trim();

    if (!text) {
      toast(pickRandom(toasts.emptyComment));
      return;
    }

    const reportId = template.find('#report-id').value;
    Meteor.call('commentReport', reportId, text);

    evt.currentTarget.reset();
  },
});
