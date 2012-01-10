$(document).ready(function() {
    Trello.authorize({
        type: "popup",
        success: onAuthorize
    });

    function onAuthorize() {
        if (!Trello.authorized()) return Trello.authorize();

        Trello.get('/members/my/cards/all').done(function(cards) {

            var calendar = $('#calendar').fullCalendar({});

            _(cards).each(function(card) {
                Trello.cards.get(card.id).done(function(card) {
                    if (!card.badges.due) return;
                    calendar.fullCalendar('renderEvent', {
                        id: card.id,
                        title: card.name,
                        start: card.badges.due,
                        color: 'red'
                    }, true);
                });
            });
        });
    }
});