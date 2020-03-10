document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid', 'list' ],
        header: {
            left: 'prev, today',
            center: 'title',
            right: 'dayGridMonth,listWeek,next'
        },
        editable: true,
        eventLimit: true,
        defaultDate: '2020-01-01',
        events: [
            {
                title: 'All Day Event',
                start: '2020-01-01',
                url: 'http://google.com/',
            },
            {
                title: 'Long Event',
                start: '2020-01-02',
                end: '2020-01-03'
            }
        ]
    });
    calendar.render();

});