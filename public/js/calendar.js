document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const myModal = new bootstrap.Modal(document.getElementById("form"));
    const dangerAlert = document.getElementById("danger-alert");
    const close = document.querySelector(".btn-close");

    function fetchEvents() {
        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                action: "fetchEvents",
            },
            success: function (response) {
                console.log(response)
                const events = JSON.parse(response).map(event => ({
                    id: event.id,
                    title: event.titulo,
                    start: event.start,
                    end: event.end,
                    backgroundColor: event.color,
                    description: event.descripcion
                }));
                calendar.addEventSource(events);
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
        });
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: "es",
        customButtons: {
            customButton: {
                text: "Agregar Evento",
                click: function () {
                    myModal.show();
                    const modalTitle = document.getElementById("modal-title");
                    const submitButton = document.getElementById("submit-button");
                    modalTitle.innerHTML = "Agregar Evento";
                    submitButton.innerHTML = "Agregar Evento";
                    submitButton.classList.remove("btn-primary");
                    submitButton.classList.add("btn-success");

                    close.addEventListener("click", () => {
                        myModal.hide();
                    });
                },
            },
        },
        header: {
            center: "customButton",
            right: "today, prev,next",
        },
        plugins: ["dayGrid", "interaction"],
        editable: true,
        selectable: true,
        displayEventTime: false,
        events: [],
        eventRender: function (info) {
            info.el.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                let existingMenu = document.querySelector(".context-menu");
                existingMenu && existingMenu.remove();
                let menu = document.createElement("div");
                menu.className = "context-menu";
                menu.innerHTML = `<ul>
                    <li><i class="fas fa-edit"></i>Editar</li>
                    <li><i class="fas fa-trash-alt"></i>Eliminar</li>
                </ul>`;

                document.body.appendChild(menu);
                menu.style.top = e.pageY + "px";
                menu.style.left = e.pageX + "px";

                // Editar menú contextual
                menu.querySelector("li:first-child").addEventListener(
                    "click",
                    function () {
                        menu.remove();

                        const editModal = new bootstrap.Modal(
                            document.getElementById("form")
                        );
                        const modalTitle = document.getElementById("modal-title");
                        const titleInput = document.getElementById("event-title");
                        const startDateInput = document.getElementById("start-date");
                        const endDateInput = document.getElementById("end-date");
                        const colorInput = document.getElementById("event-color");
                        const descriptionInput =
                            document.getElementById("event-description");
                        const submitButton =
                            document.getElementById("submit-button");
                        const cancelButton =
                            document.getElementById("cancel-button");

                        modalTitle.innerHTML = "Editar Evento";
                        titleInput.value = info.event.title;
                        startDateInput.value = moment(info.event.start).format(
                            "YYYY-MM-DD"
                        );
                        endDateInput.value = info.event.end
                            ? moment(info.event.end).format("YYYY-MM-DD")
                            : "";
                        colorInput.value = info.event.backgroundColor;
                        descriptionInput.value =
                            info.event.extendedProps.description || "";

                        submitButton.innerHTML = "Guardar Cambios";
                        editModal.show();

                        submitButton.classList.remove("btn-success");
                        submitButton.classList.add("btn-primary");

                        submitButton.addEventListener("click", function () {
                            const updatedEvent = {
                                id: info.event.id,
                                title: titleInput.value,
                                start: startDateInput.value,
                                end: endDateInput.value
                                    ? moment(endDateInput.value)
                                          .add(1, "day")
                                          .format("YYYY-MM-DD")
                                    : null,
                                backgroundColor: colorInput.value,
                                extendedProps: {
                                    description:
                                        descriptionInput.value.trim() || null,
                                },
                            };

                            if (
                                updatedEvent.end &&
                                updatedEvent.end <= updatedEvent.start
                            ) {
                                dangerAlert.style.display = "block";
                                return;
                            }

                            const eventIndex = myEvents.findIndex(
                                (event) => event.id === updatedEvent.id
                            );
                            myEvents.splice(eventIndex, 1, updatedEvent);
                            localStorage.setItem("events", JSON.stringify(myEvents));

                            // Actualizar el evento en el calendario
                            const calendarEvent = calendar.getEventById(
                                info.event.id
                            );
                            calendarEvent.setProp("title", updatedEvent.title);
                            calendarEvent.setStart(updatedEvent.start);
                            calendarEvent.setEnd(updatedEvent.end);
                            calendarEvent.setProp(
                                "backgroundColor",
                                updatedEvent.backgroundColor
                            );
                            calendarEvent.setExtendedProp(
                                "description",
                                updatedEvent.extendedProps.description
                            );

                            editModal.hide();
                        });
                    }
                );

                // Menú Eliminar
                menu.querySelector("li:last-child").addEventListener(
                    "click",
                    function () {
                        const deleteModal = new bootstrap.Modal(
                            document.getElementById("delete-modal")
                        );
                        const modalBody =
                            document.getElementById("delete-modal-body");
                        const cancelModal = document.getElementById("cancel-button");

                        modalBody.innerHTML = `¿Estás seguro de que deseas eliminar el evento <b>"${info.event.title}"</b>?`;
                        deleteModal.show();

                        const deleteButton =
                            document.getElementById("delete-button");
                        deleteButton.addEventListener("click", function () {
                            myEvents.splice(eventIndex, 1);
                            localStorage.setItem("events", JSON.stringify(myEvents));
                            calendar.getEventById(info.event.id).remove();
                            deleteModal.hide();
                            menu.remove();
                        });

                        cancelModal.addEventListener("click", function () {
                            deleteModal.hide();
                        });
                    }
                );

                document.addEventListener("click", function () {
                    menu.remove();
                });
            });
        },

        eventDrop: function (info) {
            const eventIndex = myEvents.findIndex(
                (event) => event.id === info.event.id
            );
            const updatedEvent = {
                ...myEvents[eventIndex],
                id: info.event.id,
                title: info.event.title,
                start: moment(info.event.start).format("YYYY-MM-DD"),
                end: info.event.end
                    ? moment(info.event.end).format("YYYY-MM-DD")
                    : null,
                backgroundColor: info.event.backgroundColor,
                extendedProps: {
                    description: info.event.extendedProps.description || null,
                },
            };

            myEvents.splice(eventIndex, 1, updatedEvent);
            localStorage.setItem("events", JSON.stringify(myEvents));
        },
    });

    calendar.on("select", function (info) {
        const startDateInput = document.getElementById("start-date");
        const endDateInput = document.getElementById("end-date");

        startDateInput.value = info.startStr;
        endDateInput.value = info.endStr
            ? moment(info.endStr).subtract(1, "day").format("YYYY-MM-DD")
            : "";

        if (startDateInput.value === endDateInput.value) {
            endDateInput.value = "";
        }
    });

    calendar.render();
    fetchEvents();

    const form = document.querySelector("#myForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", uuidv4());
        formData.append("title", document.querySelector("#event-title").value);
        formData.append("startDate", moment(document.querySelector("#start-date").value, "YYYY-MM-DD").format("YYYY-MM-DD"));
        formData.append("endDate", moment(document.querySelector("#end-date").value, "YYYY-MM-DD").format("YYYY-MM-DD"));
        formData.append("color", document.querySelector("#event-color").value);
        formData.append("description",document.querySelector("#event-description").value.trim() || null);

        const fileInput = document.querySelector("#file-info");
        formData.append("file", fileInput.files[0]);

        formData.append("action", "addEvent");

        const newEvent = {
            id: formData.get("id"),
            title: formData.get("title"),
            start: formData.get("startDate"),
            end: formData.get("endDate") ? moment(formData.get("endDate")).add(1, "day").format("YYYY-MM-DD") : null,
            backgroundColor: formData.get("color"),
            description: formData.get("description"),
        };

        if (newEvent.end && newEvent.end <= newEvent.start) {
            dangerAlert.style.display = "block";
            return;
        }

        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                console.log(response);
                if (response.status === "success") {
                    calendar.addEvent(newEvent);
                    myModal.hide();
                    form.reset();
                } else {
                    alert(response.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            },
        });
    });

    myModal._element.addEventListener("hide.bs.modal", function () {
        dangerAlert.style.display = "none";
        form.reset();
    });
});
