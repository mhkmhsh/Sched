$(document).ready(function () {
    $("#submitDay").click(function () {
        const dayInput = $("#dayInput").val().toUpperCase();

        if (validateDay(dayInput)) {
            loadSchedule(dayInput)

        } else {
            alert("PLEASE ENTER A VALID DAY!")
        }

    })
})

function validateDay(day) {
    const days = ["A", "B", "C", "D", "E", "F", "G"]
    return days.includes(day);
}

function loadSchedule(dayInput) {
    $.ajax({
        type: 'GET',
        url: `https://www.npoint.io/docs/0305d4b97747641f89cb`,
        data: "data",
        dataType: "json",
        success: function (data) {
            let scheduleDay = data.schedule.filter((classItem) => classItem.days.includes(dayInput)
            )
            let htmlString = "<tr>"
            scheduleDay.forEach((classItem) => {
                htmlString += `<td> ${classItem.period}</td>
                <td> 'NOT DONE YET' </td>
                <td>${classItem.class}</td>`
            })
            htmlString += "</tr>"
            $("scheduleList").append(htmlString)
        }

    })


}