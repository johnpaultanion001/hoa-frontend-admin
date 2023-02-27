import FullCalendar from '@fullcalendar/vue'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
    components: {FullCalendar},
    data() {
        return {
            full_calendar: null,
            calendar_option: {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                    interactionPlugin, // needed for dateClick
                ],
                headerToolbar: {
                    left: ((window.innerWidth <= 768) ? null : 'prev,today,next'),
                    center: 'title',
                    right: ((window.innerWidth <= 768) ? null : 'timeGridDay,timeGridWeek,dayGridMonth')
                },
                footerToolbar: {
                    center: ((window.innerWidth >= 768) ? null : 'timeGridDay,timeGridWeek,dayGridMonth')
                },
                buttonText: {
                    today: 'Today',
                    month: 'Monthly',
                    week: 'Weekly',
                    day: 'Daily',
                    listDay: 'Daily',
                    listWeek: 'Weekly',
                    listMonth: 'Monthly'
                },
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                select: this.set_date,
                eventClick: this.set_date,
                eventsSet: this.event_set,
                draggable: false,
                customButtons: {
                    prev: { // this overrides the prev button
                        text: "Month",
                        click: () => {

                            let calendarApi = this.$refs.fullCalendar.getApi();
                            calendarApi.prev();
                            console.log('test');
                        }
                    }
                }
                /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
            },
            config: { },
            data: {}
        }
    },
    methods: {

        async event_set($event) {
            this.full_calendar = this.$refs.fullCalendar.getApi();

            setTimeout(() => this.full_calendar.render(), 1);

        },
        async set_date($event) {

            this.$emit('event',{date:$event.startStr});
        },
    }
}