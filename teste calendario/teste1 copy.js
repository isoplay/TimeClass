let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

1
document.getElementById('monthSelect').addEventListener('change', (e) => {
    month = e.target.value;
    drawCalendar();
});


function getMonthName(month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
}

function getDayOfWeek(date) {
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayOfWeek[date.getDay()];
}

function drawCalendar() {
    const calendarTable = document.getElementById('calendarTable');
    const monthName = getMonthName(month);
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = getDayOfWeek(firstDayOfMonth);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfWeek = getDayOfWeek(lastDayOfMonth);
    const totalDaysInMonth = lastDayOfMonth.getDate();

    let daysInFirstWeek = 7 - firstDayOfWeek.length;
    let daysInLastWeek = lastDayOfWeek.length;

    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach((row) => row.remove());

    let row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.colSpan = firstDayOfWeek.length;
    row.appendChild(cell);

    let currentDay = 1;
    while (currentDay <= totalDaysInMonth) {
        cell = document.createElement('td');
        cell.className = 'available';
        cell.innerText = currentDay;
        cell.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
        });

        if (getDayOfWeek(new Date(year2021, month, currentDay)) === 'Saturday' || getDayOfWeek(new Date(year, month, currentDay)) === 'Sunday') {
            cell.className = 'booked';
        }

        row.appendChild(cell);
        currentDay++;

        if (row.cells.length === 7) {
            calendarTable.appendChild(row);
            row = document.createElement('tr');
        }
    }

    let emptyCells = 7 - row.cells.length;
    for (let i = 0; i < emptyCells; i++) {
        cell = document.createElement('td');
        row.appendChild(cell);
    }

    calendarTable.appendChild(row);

    document.getElementById('calendarMonth').innerText = monthName + ' ' + year;
}

document.getElementById('prevMonth').addEventListener('click', () => {
    if (month === 0) {
        month = 11;
        year--;
    } else {
        month--;
    }

    drawCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (month === 11) {
        month = 0;
        year++;
    } else {
        month++;
    }

    drawCalendar();
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
document.getElementById('calendar').addEventListener('click', (event) => {
    if (event.target.classList.contains('day')) {
        // Handle click event for cell here
    }
});

function storeEvent(eventDate, eventDetails) {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    storedEvents[eventDate] = eventDetails;
    localStorage.setItem('events', JSON.stringify(storedEvents));
}

function retrieveEvent(eventDate) {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    return storedEvents[eventDate];
}

function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

cell.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const eventDate = `${year}-${month + 1}-${currentDay}`;
    const storedEvent = retrieveEvent(eventDate);
    if (storedEvent) {
        modal.innerText = storedEvent;
    } else {
        modal.innerText = 'No event scheduled for this date.';
    }
});



drawCalendar();