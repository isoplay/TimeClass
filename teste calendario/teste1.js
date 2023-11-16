$(document).ready(function () {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['13:10', '14:00', '14:50', '15:40', '16:30', '16:50', '17:40', '18:30', '19:30'];
    const calendarBody = $('#calendar-body');
    const modal = $('#myModal');
    const nameInput = $('#name');
    const subjectInput = $('#subject');
    const timeInput = $('#time');
    const saveBtn = $('#saveBtn');

    // Function to generate the calendar dynamically
    function generateCalendar(month) {
        // Clear previous content
        calendarBody.empty();

        // ... (Generate the calendar content here)

        // Example: Generate a row with empty spaces
        for (let i = 0; i < 5; i++) {
            const row = $('<tr></tr>');

            for (let j = 0; j < 5; j++) {
                const cell = $('<td class="empty-space"></td>');
                cell.click(function () {
                    openModal($(this));
                });
                row.append(cell);
            }

            calendarBody.append(row);
        }
    }

    // Function to open the modal
    function openModal(cell) {
        modal.show();
        nameInput.val('');
        subjectInput.val('');
        timeInput.val(times[cell.index()]);
        saveBtn.off('click').on('click', function () {
            saveInformation(cell);
        });
    }

    // Function to save information and update cell style
    function saveInformation(cell) {
        const name = nameInput.val();
        const subject = subjectInput.val();

        // ... (Save the information and update cell style here)

        cell.removeClass('empty-space').addClass('red-space');
        modal.hide();
    }

    // Close modal when clicking on the close button
    $('.close').click(function () {
        modal.hide();
    });

    // Initial calendar generation
    generateCalendar(0);

    // Change calendar on month selection
    $('#month').change(function () {
        generateCalendar($(this).val());
    });
});
