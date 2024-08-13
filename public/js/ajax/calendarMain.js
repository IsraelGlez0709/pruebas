document.addEventListener("DOMContentLoaded", function () {
    let currentDate = new Date();

    function getCurrentMonth() {
        const options = { year: "numeric", month: "long" };
        return new Intl.DateTimeFormat("es-ES", options).format(currentDate);
    }

    const currentMonthElement = document.getElementById("current-month");
    const daysContainer = document.getElementById("calendarMain");
    const scheduleContainer = document.getElementById("schedule");
    const prevDaysButton = document.getElementById("prev-days");
    const nextDaysButton = document.getElementById("next-days");

    function fetchEvents() {
        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                action: "fetchEvents",
            },
            success: function (response) {
                const events = JSON.parse(response);
                renderCalendar(events);
                adjustDaySizes();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
        });
    }

    function renderCalendar(events) {
        daysContainer.innerHTML = "";
        const days = [];
        for (let i = -2; i <= 4; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            days.push(date);
        }

        days.forEach((date) => {
            const dayElement = document.createElement("div");
            dayElement.className = "day";
            dayElement.dataset.date = date.toISOString().split("T")[0];

            const dayName = document.createElement("div");
            dayName.textContent = date
                .toLocaleDateString("es-ES", { weekday: "short" })
                .substr(0, 3);
            dayElement.appendChild(dayName);

            const dayNumber = document.createElement("div");
            dayNumber.textContent = date.getDate();
            dayElement.appendChild(dayNumber);

            const taskList = document.createElement("div");
            taskList.className = "task-list";

            const tasksForDay = events.filter(
                (event) =>
                    event.start <= date.toISOString().split("T")[0] &&
                    event.end >= date.toISOString().split("T")[0]
            );

            tasksForDay.forEach((task) => {
                const taskName = document.createElement("div");
                taskName.textContent = task.titulo;
                taskList.appendChild(taskName);
            });

            dayElement.appendChild(taskList);

            dayElement.addEventListener("click", function () {
                document
                    .querySelectorAll(".calendar .day")
                    .forEach((day) => day.classList.remove("active"));
                this.classList.add("active");
                updateSchedule(this.dataset.date, events);
            });

            daysContainer.appendChild(dayElement);
        });

        currentMonthElement.textContent = getCurrentMonth();

        const todayDateString = new Date().toISOString().split("T")[0];
        const todayElement = daysContainer.querySelector(
            `.day[data-date='${todayDateString}']`
        );
        if (todayElement) {
            todayElement.classList.add("active");
            updateSchedule(todayDateString, events);
        } else {
            document
                .querySelector(".calendar .day:last-child")
                .classList.add("active");
            updateSchedule(
                days[days.length - 1].toISOString().split("T")[0],
                events
            );
        }
    }

    function adjustDaySizes() {
        const days = document.querySelectorAll(".calendar .day");
        let maxWidth = 0;
        let maxHeight = 0;

        days.forEach((day) => {
            maxWidth = Math.max(maxWidth, day.offsetWidth);
            maxHeight = Math.max(maxHeight, day.offsetHeight);
        });

        days.forEach((day) => {
            day.style.height = `${maxHeight}px`;
        });
    }

    function updateSchedule(date, events) {
        scheduleContainer.innerHTML = "";
        const filteredEvents = events.filter(
            (event) =>
                event.start <= new Date(date).toISOString().split("T")[0] &&
                event.end >= new Date(date).toISOString().split("T")[0]
        );

        if (filteredEvents.length > 0) {
            filteredEvents.forEach((event) => {
                const eventElement = document.createElement("div");
                eventElement.className =
                    "d-flex justify-content-between align-items-center mb-3";

                const timeLine = document.createElement("div");
                timeLine.className = "time-line";
                timeLine.style.backgroundColor = event.color;
                eventElement.appendChild(timeLine);

                const title = document.createElement("div");
                title.className = "title";
                title.textContent = event.titulo;
                eventElement.appendChild(title);

                const details = document.createElement("div");
                details.className = "details";

                const description = document.createElement("span");
                description.className = "description";
                description.textContent = event.descripcion;
                details.appendChild(description);
                eventElement.appendChild(details);

                const btnContainer = document.createElement("div");
                btnContainer.className = "btn-container";

                const button = document.createElement("a");
                let archivo = event.file ? event.file.replace("../../", "") : "";
                button.className = "btn btn-warning btn-sm";
                button.textContent = "Descargar archivo";
                button.href = archivo;
                if (archivo) {
                    button.setAttribute("download", `${event.titulo}.pdf`);
                }
                btnContainer.appendChild(button);
                eventElement.appendChild(btnContainer);

                scheduleContainer.appendChild(eventElement);
            });

            const activityCountElement = document.getElementById("activity-count");
            activityCountElement.textContent = `${filteredEvents.length} actividades en total`;
        } else {
            scheduleContainer.innerHTML = "<p>No hay actividades para este día.</p>";

            const activityCountElement = document.getElementById("activity-count");
            activityCountElement.textContent = "No hay actividades para mostrar";
        }
    }

    prevDaysButton.addEventListener("click", function () {
        currentDate.setDate(currentDate.getDate() - 7);
        fetchEvents();
    });

    nextDaysButton.addEventListener("click", function () {
        currentDate.setDate(currentDate.getDate() + 7);
        fetchEvents();
    });

    fetchEvents();
});
