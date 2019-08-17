import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


document.addEventListener('DOMContentLoaded', function() {
  
  //var data = course.courseModel.find({name: 'database'});
  //console.log(data);
  var calendarEl = document.getElementById('calendar');
  var button = document.getElementById('redirectbutton');
  var user = document.getElementById('user').innerText;
  var obj = JSON.parse(user,JSON.dateParser);
  

   console.log(obj);
  var calendar = new Calendar(calendarEl, {
    plugins: [timeGridPlugin ],
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      //info.dayEl.style.backgroundColor = 'red';
    },
    eventClick: function(info) {
      //alert('Event: ' + info.event.people);
      // change the border color just for fun
      info.el.style.borderColor = 'red';
      console.log(info.event.id);
      document.getElementById("redirectform").action = "/course/" + info.event.id;
      button.click();
    },
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    defaultDate: '2019-08-12',
    selectable: true,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events:obj
    //  [
    //   {
    //     //to pass the data, pass from the html, html from router
    //     id:"abc",
    //     title: 'All asdf Event\r\nhello',
    //     start: '2018-01-01',
    //     backgroundColor: "red",
        
    //   },
    //   {
    //     title: 'Long Eventd',
    //     start: '2018-01-07',
    //     end: '2018-01-10',
    //     people: '30',
    //   },
    //   {
    //     id: 999,
    //     title: 'Repeating Event',
    //     start: '2018-01-09T16:00:00'
    //   },
    //   {
    //     id: 999,
    //     title: 'Repeating Event',
    //     start: '2018-01-16T16:00:00'
    //   },
    //   {
    //     title: 'Conference',
    //     start: '2018-01-11',
    //     end: '2018-01-13'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2018-01-12T10:30:00',
    //     end: '2018-01-12T12:30:00'
    //   },
    //   {
    //     title: 'Click for Google',
    //     url: 'http://google.com/',
    //     start: '2018-01-28'
    //   }
    // ],
    
  });
 
  calendar.render();
});
