$(document).ready(function () {
    $("#submitDay").click(function () {
        const dayInput = $("#dayInput").val().toUpperCase();

        if (validateDay(dayInput)) {
            loadSchedule(dayInput);
        } else {
            alert("PLEASE ENTER A VALID DAY!");
        }
    });
});

function validateDay(day) {
    const days = ["A", "B", "C", "D", "E", "F", "G"];
    return days.includes(day);
}

function loadSchedule(dayInput) {
    $.ajax({
        type: 'GET',
        url: 'sched.json',
        dataType: 'json',
        success: function (data) {
            let scheduleDay = data.schedule.filter(classItem => classItem.Days.includes(dayInput));
            let htmlString = "";

            if (scheduleDay.length === 0) {
                htmlString = "<tr><td colspan='5' class='text-center'>No classes today</td></tr>";
            } else {
                scheduleDay.forEach(classItem => {
                    const times = getClassTimes(classItem.Period);
                    htmlString += `<tr>
                        <td>${classItem.Period}</td>
                        <td>${times}</td>
                        <td>${classItem.Class}</td>
                        <td>${classItem.Teacher}</td>
                        <td>${classItem.Room}</td>
                    </tr>`;
                });
            }

            $("#scheduleList").empty().append(htmlString);
        },
        error: function () {
            alert("Oh no! We cannot find your Schedule");
        }
    });
}

const bellSchedule = {
    1: "8:24 AM - 9:31 AM",
    2: "9:36 AM - 10:43 AM",
    3: "10:48 AM - 11:55 AM", 
    lunch: "12:00 PM - 12:35 PM",
    4: "12:41 PM - 1:48 PM",
    5: "1:53 PM - 3:00 PM"
};

function getClassTimes(period) {
    return bellSchedule[period] || "Time not available"; 
}
