function filterByCarrera(){
    const carreraId = document.getElementById('carreraFiltro').value;
    const grupoId = document.getElementById('grupoFiltro').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/CBTIS/app/core/ajaxConfig.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(xhr.status === 200){
            document.getElementById("tablaBody").innerHTML = xhr.responseText;
            if(carreraId) {
                loadGrupos(carreraId, grupoId);
            }
        }else{
            console.error('Error:', xhr.status);
        }
    };

    let params = 'action=gruposLoad';
    if (carreraId) {
        params += '&carrera_id=' + carreraId;
    }
    if (grupoId) {
        params += '&grupo_id=' + grupoId;
    }

    xhr.send(params);
}

function loadGrupos(carreraId, selectedGrupoId = null) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/CBTIS/app/core/ajaxConfig.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('grupoFiltro').innerHTML = xhr.responseText;
            if (selectedGrupoId) {
                document.getElementById('grupoFiltro').value = selectedGrupoId;
            }
        } else {
            console.error('Error al cargar los grupos:', xhr.status);
        }
    };
    xhr.send('action=getGruposByCarrera&carrera_id=' + carreraId);
}

function filterByGrupo(){
    const grupoId = document.getElementById('grupoFiltro').value;

    if(grupoId){
        filterByCarrera();
    }
}

function guardarAsignacion(profesorId, grupoId, asignaturaId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/CBTIS/app/core/ajaxConfig.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                const mensajeDiv = document.getElementById("mensajeAsignacion");

                mensajeDiv.classList.remove("alert-success", "alert-danger");

                if (response.status === "success") {
                    mensajeDiv.classList.add("alert", "py-2", "alert-success");
                    mensajeDiv.innerHTML = response.message;
                } else if (response.status === "error") {
                    mensajeDiv.classList.add("alert", "py-2", "alert-danger");
                    mensajeDiv.innerHTML = response.message;
                }
            } catch (e) {
                console.error("Error al analizar JSON:", e);
                console.log("Respuesta del servidor:", xhr.responseText);
                alert("Error inesperado al procesar la respuesta del servidor.");
            }
        } else {
            alert("Error al guardar la asignación");
            console.log("Error:", xhr.status);
        }
    };
    xhr.send('action=guardarAsignacion&profesor_id=' + profesorId + '&grupo_id=' + grupoId + '&asignatura_id=' + asignaturaId);
}

function fetchRFCAndAsignaturas(usuarioId) {
    if (usuarioId) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/CBTIS/app/core/ajaxConfig.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    document.getElementById('rfc').value = response.rfc;

                    console.log("Horarios: ", response)

                    const tablaBodyHorario = document.getElementById('tablaBodyHorario');
                    if (tablaBodyHorario) {
                        tablaBodyHorario.innerHTML = '';

                        if (response.asignaturas.length > 0) {
                            response.asignaturas.forEach(asignatura => {
                                const row = document.createElement('tr');
                                row.setAttribute('data-asignatura-id', asignatura.asignatura_id);
                                row.setAttribute('data-grupo-id', asignatura.id_grupo);

                                let horarioInputs = '';
                                ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].forEach(dia => {
                                    const horario = response.Horarios.find(h => h.dia.toLowerCase() === dia.toLowerCase()) || {};
                                    horarioInputs += `
                                        <td>
                                            <div class="time-inputs">
                                                <input type="time" class="form-control" value="${horario.hora_inicio || ''}" placeholder="Inicio">
                                                <input type="time" class="form-control" value="${horario.hora_fin || ''}" placeholder="Fin">
                                            </div>
                                        </td>`;
                                });
                                row.innerHTML = `
                                    <td>${asignatura.asignatura}</td>
                                    <td>${asignatura.grupo}</td>
                                    <td><input type="text" class="form-control" value="${response.Horarios[0]?.aula || ''}" placeholder="No. Aula"></td>
                                    ${horarioInputs}
                                    <td>${response.Horarios[0]?.total_horas || '--:--'}</td>
                                `;
                                tablaBodyHorario.appendChild(row);
                            });
                            const subtotalRow = document.createElement("tr");
                            subtotalRow.className = "hours-subtotal";
                            subtotalRow.innerHTML = `
                                <td colspan="3" class="subtotal">Subtotal</td>
                                ${['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map(dia => {
                                    const horasDia = response.Horarios.filter(h => h.dia.toLowerCase() === dia.toLowerCase())
                                        .map(h => h.subtotales_horarios)
                                        .reduce((total, subtotales_horarios) => {
                                            if (subtotales_horarios) {
                                                const [hours, minutes] = subtotales_horarios.split(':').map(Number);
                                                return total + hours * 60 + minutes;
                                            }
                                            return total;
                                        }, 0);

                                    const totalHours = Math.floor(horasDia / 60);
                                    const totalMinutes = horasDia % 60;

                                    return `<td>${totalHours}:${totalMinutes < 10 ? '0' : ''}${totalMinutes}</td>`;
                                }).join('')}
                                <td>${response.Horarios[0]?.total_horas || '--:--'}</td>
                            `;
                            tablaBodyHorario.appendChild(subtotalRow);
                        } else {
                            const row = document.createElement('tr');
                            row.innerHTML = '<td colspan="9" class="text-center">No hay asignaturas asignadas.</td>';
                            tablaBodyHorario.appendChild(row);
                        }
                    } else {
                        console.error('El elemento tablaBodyHorario no se encuentra en el DOM.');
                    }

                    if (tablaBodyActividades) {
                        tablaBodyActividades.innerHTML = '';
                        if (response.Actividades.length > 0) {
                            const actividadesAgrupadas = {};

                            response.Actividades.forEach(actividad => {
                                const key = `${actividad.descripcion}-${actividad.aula}-${actividad.grupo_id}`;
                                if (!actividadesAgrupadas[key]) {
                                    actividadesAgrupadas[key] = { ...actividad, dias: {} };
                                }
                                actividadesAgrupadas[key].dias[actividad.dia.toLowerCase()] = actividad;
                            });

                            Object.values(actividadesAgrupadas).forEach(actividad => {
                                const row = document.createElement('tr');
                                row.setAttribute('data-grupo-id', actividad.grupo_id);

                                let actividadInputs = '';
                                ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].forEach(dia => {
                                    const actividadDia = actividad.dias[dia] || {};
                                    actividadInputs += `
                                        <td>
                                            <div class="time-inputs">
                                                <input type="time" name="${dia}_inicio[]" class="hora ${dia} form-control" value="${actividadDia.hora_inicio || ''}" placeholder="Inicio">
                                                <input type="time" name="${dia}_fin[]" class="hora ${dia} form-control" value="${actividadDia.hora_fin || ''}" placeholder="Fin">
                                            </div>
                                        </td>`;
                                });

                                row.innerHTML = `
                                    <td><textarea name="descripcion[]" class="descripcion form-control">${actividad.descripcion || ''}</textarea></td>
                                    <td><input type="text" name="lugar[]" class="lugar form-control" value="${actividad.aula || ''}" placeholder="Lugar"></td>
                                    <td><input type="text" name="grupo[]" class="grupo form-control" value="${actividad.grupo_id || ''}" placeholder="Grupo"></td>
                                    ${actividadInputs}
                                    <td>${actividad.total_horas || '--:--'}</td>
                                `;
                                tablaBodyActividades.appendChild(row);
                            });

                            const subtotalRow = document.createElement("tr");
                            subtotalRow.className = "hours-subtotal-actividades";
                            subtotalRow.innerHTML = `
                                <td colspan="3" class="subtotal">Subtotal</td>
                                ${['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map(dia => {
                                    const horasDia = response.Actividades.filter(a => a.dia.toLowerCase() === dia.toLowerCase())
                                        .map(a => a.subtotales_actividades)
                                        .reduce((total, subtotales_actividades) => {
                                            if (subtotales_actividades) {
                                                const [hours, minutes] = subtotales_actividades.split(':').map(Number);
                                                return total + hours * 60 + minutes;
                                            }
                                            return total;
                                        }, 0);

                                    const totalHours = Math.floor(horasDia / 60);
                                    const totalMinutes = horasDia % 60;

                                    return `<td>${totalHours}:${totalMinutes < 10 ? '0' : ''}${totalMinutes}</td>`;
                                }).join('')}
                                <td>${response.Actividades[0]?.total_horas || '--:--'}</td>
                            `;
                            tablaBodyActividades.appendChild(subtotalRow);

                            const subtotalHorarioRow = document.querySelector(".hours-subtotal");
                            const subtotalActividadesRow = document.querySelector(".hours-subtotal-actividades");
                            const totalMinutesByDay = calculateTotalHoursByDay(subtotalHorarioRow, subtotalActividadesRow);

                            const totalRow = document.createElement("tr");
                            totalRow.className = "hours-total-actividades";
                            totalRow.innerHTML = `
                                <td colspan="3" class="total">Total</td>
                                ${totalMinutesByDay.map(minutes => {
                                    const totalHours = Math.floor(minutes / 60);
                                    const totalMinutesRemainder = minutes % 60;
                                    return `<td>${totalHours}:${totalMinutesRemainder < 10 ? '0' : ''}${totalMinutesRemainder}</td>`;
                                }).join('')}
                                <td></td>
                            `;

                            tablaBodyActividades.appendChild(totalRow);
                            attachEventListenersToTimeInputs();
                        } else {
                            const row = document.createElement('tr');
                            row.innerHTML = '<td colspan="9" class="text-center">No hay actividades complementarias asignadas.</td>';
                            tablaBodyActividades.appendChild(row);
                        }
                    } else {
                        console.error('El elemento tablaBodyActividades no se encuentra en el DOM.');
                    }
                } else {
                    alert(response.message);
                }
            } else {
                console.error('Error al cargar los datos:', xhr.status);
            }
        };
        xhr.send('action=getRFCAndAsignaturasByUsuario&usuario_id=' + usuarioId);
    }
}

function attachEventListenersToTimeInputs() {
    document
        .querySelectorAll('#tablaBodyActividades input[type="time"]')
        .forEach(function (input) {
            input.addEventListener("change", function () {
                const row = input.closest("tr");
                updateTotalHoursActividades(row);
                updateSubtotalActividades();
                updateTotalFinal();
            });
        });
}

function calculateTotalHoursByDay(subtotalHorarioRow, subtotalActividadesRow) {
    let totalMinutesByDay = Array(5).fill(0);

    if (subtotalHorarioRow) {
        for (let i = 1; i <= 5; i++) {
            const subtotalTime = subtotalHorarioRow.cells[i].textContent.split(":").map(Number);
            totalMinutesByDay[i - 1] += (subtotalTime[0] || 0) * 60 + (subtotalTime[1] || 0);
        }
    }

    if (subtotalActividadesRow) {
        for (let i = 1; i <= 5; i++) {
            const subtotalTime = subtotalActividadesRow.cells[i].textContent.split(":").map(Number);
            totalMinutesByDay[i - 1] += (subtotalTime[0] || 0) * 60 + (subtotalTime[1] || 0);
        }
    }

    return totalMinutesByDay;
}

function calculateTimeDifference(start, end) {
    const startTime = start.split(':');
    const endTime = end.split(':');

    const startHours = parseInt(startTime[0], 10);
    const startMinutes = parseInt(startTime[1], 10);

    const endHours = parseInt(endTime[0], 10);
    const endMinutes = parseInt(endTime[1], 10);

    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;

    let difference = endInMinutes - startInMinutes;

    if (difference < 0) {
        difference += 24 * 60;
    }

    return difference;
}

function updateTotalFinal() {
    const subtotalHorarioRow = document.querySelector(".hours-subtotal");
    const subtotalActividadesRow = document.querySelector(".hours-subtotal-actividades");
    const totalRow = document.querySelector(".hours-total-actividades");

    let totalMinutesByDay = Array(5).fill(0);

    for (let i = 0; i < 5; i++) {
        const horarioTime = subtotalHorarioRow.cells[i + 1].textContent.split(":").map(Number);
        const actividadesTime = subtotalActividadesRow.cells[i + 1].textContent.split(":").map(Number);

        const horarioMinutes = (horarioTime[0] || 0) * 60 + (horarioTime[1] || 0);
        const actividadesMinutes = (actividadesTime[0] || 0) * 60 + (actividadesTime[1] || 0);

        totalMinutesByDay[i] = horarioMinutes + actividadesMinutes;

        const totalHours = Math.floor(totalMinutesByDay[i] / 60);
        const totalMinutesRemainder = totalMinutesByDay[i] % 60;

        totalRow.cells[i + 1].textContent = totalHours + ":" + (totalMinutesRemainder < 10 ? "0" : "") + totalMinutesRemainder;
    }

    const totalMinutesFinal = totalMinutesByDay.reduce((acc, minutes) => acc + minutes, 0);
    const totalHoursFinal = Math.floor(totalMinutesFinal / 60);
    const totalMinutesFinalRemainder = totalMinutesFinal % 60;

    totalRow.cells[totalRow.cells.length - 1].textContent = totalHoursFinal + ":" + (totalMinutesFinalRemainder < 10 ? "0" : "") + totalMinutesFinalRemainder;
}

function updateTotalHoursHorario(row) {
    let totalMinutes = 0;

    const inputs = row.querySelectorAll('input[type="time"]');
    for (let i = 0; i < inputs.length; i += 2) {
        const start = inputs[i].value;
        const end = inputs[i + 1].value;

        if (start && end) {
            totalMinutes += calculateTimeDifference(start, end);
        }
    }

    const totalHours = Math.floor(totalMinutes / 60);
    const totalMinutesRemainder = totalMinutes % 60;

    const totalHrsCell = row.querySelector('td:last-child');
    totalHrsCell.textContent = totalHours + ':' + (totalMinutesRemainder < 10 ? '0' : '') + totalMinutesRemainder;
}

function updateSubtotalHorario() {
    const rows = document.querySelectorAll("#tablaBodyHorario tr:not(.hours-subtotal)");
    const subtotalRow = document.querySelector(".hours-subtotal");

    let subtotalMinutesByDay = Array(5).fill(0);
    let subtotalTotalMinutes = 0;

    rows.forEach((row) => {
        const inputs = row.querySelectorAll('input[type="time"]');

        for (let i = 0; i < inputs.length; i += 2) {
            const start = inputs[i].value;
            const end = inputs[i + 1].value;

            if (start && end) {
                const dayIndex = i / 2;
                subtotalMinutesByDay[dayIndex] += calculateTimeDifference(start, end);
            }
        }

        const totalHoursCell = row.querySelector("td:last-child");
        const totalHoursText = totalHoursCell.textContent.split(":");
        subtotalTotalMinutes += parseInt(totalHoursText[0]) * 60 + parseInt(totalHoursText[1]);
    });

    for (let i = 0; i < subtotalMinutesByDay.length; i++) {
        const totalHours = Math.floor(subtotalMinutesByDay[i] / 60);
        const totalMinutesRemainder = subtotalMinutesByDay[i] % 60;
        subtotalRow.cells[i + 1].textContent = totalHours + ":" + (totalMinutesRemainder < 10 ? "0" : "") + totalMinutesRemainder;
    }

    const totalHours = Math.floor(subtotalTotalMinutes / 60);
    const totalMinutesRemainder = subtotalTotalMinutes % 60;
    subtotalRow.cells[subtotalRow.cells.length - 1].textContent = totalHours + ":" + (totalMinutesRemainder < 10 ? "0" : "") + totalMinutesRemainder;

    updateTotalFinal();
}

document.addEventListener("input", function (event) {
    if (event.target.closest("#tablaBodyHorario") && event.target.matches('input[type="time"]')) {
        const row = event.target.closest("tr");
        updateTotalHoursHorario(row);
        updateSubtotalHorario();
    }
});

function agregarNuevaFilaActividades() {
    const tabla = document.getElementById("tablaBodyActividades");
    const mensajeNoActividades = tabla.querySelector('tr > td.text-center');
    if (mensajeNoActividades && mensajeNoActividades.textContent.includes('No hay actividades complementarias asignadas.')) {
        mensajeNoActividades.parentElement.remove();
    }
    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
        <td><textarea name="descripcion[]" class="descripcion form-control"></textarea></td>
        <td><input type="text" name="lugar[]" class="lugar form-control"></td>
        <td><input type="text" name="grupo[]" class="grupo form-control"></td>
        <td>
            <div class="time-inputs">
                <input type="time" name="lunes_inicio[]" class="hora lunes form-control" placeholder="Inicio">
                <input type="time" name="lunes_fin[]" class="hora lunes form-control" placeholder="Fin">
            </div>
        </td>
        <td>
            <div class="time-inputs">
                <input type="time" name="martes_inicio[]" class="hora martes form-control" placeholder="Inicio">
                <input type="time" name="martes_fin[]" class="hora martes form-control" placeholder="Fin">
            </div>
        </td>
        <td>
            <div class="time-inputs">
                <input type="time" name="miercoles_inicio[]" class="hora miercoles form-control" placeholder="Inicio">
                <input type="time" name="miercoles_fin[]" class="hora miercoles form-control" placeholder="Fin">
            </div>
        </td>
        <td>
            <div class="time-inputs">
                <input type="time" name="jueves_inicio[]" class="hora jueves form-control" placeholder="Inicio">
                <input type="time" name="jueves_fin[]" class="hora jueves form-control" placeholder="Fin">
            </div>
        </td>
        <td>
            <div class="time-inputs">
                <input type="time" name="viernes_inicio[]" class="hora viernes form-control" placeholder="Inicio">
                <input type="time" name="viernes_fin[]" class="hora viernes form-control" placeholder="Fin">
            </div>
        </td>
        <td class="total-horas">--:--</td>
    `;

    if (!document.querySelector(".hours-subtotal-actividades")) {
        const subtotalRow = document.createElement("tr");
        subtotalRow.className = "hours-subtotal-actividades";
        subtotalRow.innerHTML = `
            <td colspan="3" class="subtotal">Subtotal</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td id="subtotalHorasActividades">--:--</td>
        `;
        tabla.appendChild(subtotalRow);
    }

    if (!document.querySelector(".hours-total-actividades")) {
        const totalRow = document.createElement("tr");
        totalRow.className = "hours-total-actividades";
        totalRow.innerHTML = `
            <td colspan="3" class="total">Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td id="totalHorasActividades">--:--</td>
        `;
        tabla.appendChild(totalRow);
    }

    const subtotalRow = document.querySelector(".hours-subtotal-actividades");
    tabla.insertBefore(nuevaFila, subtotalRow);

    nuevaFila.querySelectorAll(".hora").forEach(function (input) {
        input.addEventListener("change", function () {
            updateTotalHoursActividades(nuevaFila);
            updateSubtotalActividades();
        });
    });
}

function updateTotalHoursActividades(row) {
    let totalMinutes = 0;

    const inputs = row.querySelectorAll('input[type="time"]');
    for (let i = 0; i < inputs.length; i += 2) {
        const start = inputs[i].value;
        const end = inputs[i + 1].value;

        if (start && end) {
            totalMinutes += calculateTimeDifference(start, end);
        }
    }

    const totalHours = Math.floor(totalMinutes / 60);
    const totalMinutesRemainder = totalMinutes % 60;

    const totalHrsCell = row.querySelector('td:last-child');
    totalHrsCell.textContent = totalHours + ':' + (totalMinutesRemainder < 10 ? '0' : '') + totalMinutesRemainder;
}

function updateSubtotalActividades() {
    const rows = document.querySelectorAll("#tablaBodyActividades tr:not(.hours-subtotal-actividades):not(.hours-total-actividades)");
    const subtotalRow = document.querySelector(".hours-subtotal-actividades");
    const totalRow = document.querySelector(".hours-total-actividades");

    let subtotalMinutesByDay = Array(5).fill(0);
    let subtotalTotalMinutes = 0;

    rows.forEach((row) => {
        const inputs = row.querySelectorAll('input[type="time"]');

        for (let i = 0; i < inputs.length; i += 2) {
            const start = inputs[i].value;
            const end = inputs[i + 1].value;

            if (start && end) {
                const dayIndex = i / 2;
                subtotalMinutesByDay[dayIndex] += calculateTimeDifference(start, end);
            }
        }

        const totalHoursCell = row.querySelector("td:last-child");
        const totalHoursText = totalHoursCell.textContent.split(":");
        subtotalTotalMinutes += parseInt(totalHoursText[0]) * 60 + parseInt(totalHoursText[1]);
    });

    for (let i = 0; i < subtotalMinutesByDay.length; i++) {
        const totalHours = Math.floor(subtotalMinutesByDay[i] / 60);
        const totalMinutesRemainder = subtotalMinutesByDay[i] % 60;
        subtotalRow.cells[i + 1].textContent = totalHours + ":" + (totalMinutesRemainder < 10 ? "0" : "") + totalMinutesRemainder;
    }

    const totalHours = Math.floor(subtotalTotalMinutes / 60);
    const totalMinutesRemainder = subtotalTotalMinutes % 60;
    subtotalRow.cells[subtotalRow.cells.length - 1].textContent = totalHours + ":" + (totalMinutesRemainder < 10 ? "0" : "") + totalMinutesRemainder;

    const totalMinutes = Array.from(subtotalRow.cells)
        .slice(1, -1)
        .reduce((total, cell) => {
            const [hours, minutes] = cell.textContent.split(":").map(Number);
            return total + (hours * 60) + minutes;
        }, 0);

    const totalHoursFinal = Math.floor(totalMinutes / 60);
    const totalMinutesFinalRemainder = totalMinutes % 60;

    totalRow.cells[totalRow.cells.length - 1].textContent = totalHoursFinal + ":" + (totalMinutesFinalRemainder < 10 ? "0" : "") + totalMinutesFinalRemainder;

    updateTotalFinal();
}

document.addEventListener("DOMContentLoaded", function () {
    agregarNuevaFilaActividades();

    document.getElementById("addRowButton").addEventListener("click", function () {
        agregarNuevaFilaActividades();
    });

    document.querySelectorAll('#tablaBodyActividades input[type="time"]').forEach(function(input) {
        input.addEventListener('change', function() {
            const row = input.closest("tr");
            updateTotalHoursActividades(row);
            updateSubtotalActividades();
        });
    });
});

document.getElementById('guardarDatos').addEventListener('click', function(){
    console.log("Enviando datos...")
    const usuarioId = document.getElementById('nombreCompleto').value;
    const periodoEscolar = document.getElementById('periodoEscolar').value;

    if(!usuarioId){
        alert('Por favor, selecciona un maestro.');
        return;
    }

    const horarios = [];
    const actividadesComplementarias = [];

    const horarioRows = document.querySelectorAll('#tablaBodyHorario tr:not(.hours-subtotal)');
    horarioRows.forEach(row => {
        const asignaturaId = row.getAttribute("data-asignatura-id");
        const grupoId = row.getAttribute("data-grupo-id");
        const aula = row.cells[2].querySelector("input").value.trim();
        const lunesInicio = row.cells[3].querySelectorAll("input")[0].value;
        const lunesFin = row.cells[3].querySelectorAll("input")[1].value;
        const martesInicio = row.cells[4].querySelectorAll("input")[0].value;
        const martesFin = row.cells[4].querySelectorAll("input")[1].value;
        const miercolesInicio = row.cells[5].querySelectorAll("input")[0].value;
        const miercolesFin = row.cells[5].querySelectorAll("input")[1].value;
        const juevesInicio = row.cells[6].querySelectorAll("input")[0].value;
        const juevesFin = row.cells[6].querySelectorAll("input")[1].value;
        const viernesInicio = row.cells[7].querySelectorAll("input")[0].value;
        const viernesFin = row.cells[7].querySelectorAll("input")[1].value;
        const totalHoras = row.cells[8].textContent.trim();

        const subtotalRow = document.querySelector(".hours-subtotal");
        let horarioSubtotal = {
            lunes: "0:00",
            martes: "0:00",
            miercoles: "0:00",
            jueves: "0:00",
            viernes: "0:00",
        };
        console.log("Filas totales ", subtotalRow.cells.length);
        if (subtotalRow && subtotalRow.cells.length >= 7) {
            horarioSubtotal.lunes = subtotalRow.cells[1].textContent.trim();
            horarioSubtotal.martes = subtotalRow.cells[2].textContent.trim();
            horarioSubtotal.miercoles = subtotalRow.cells[3].textContent.trim();
            horarioSubtotal.jueves = subtotalRow.cells[4].textContent.trim();
            horarioSubtotal.viernes = subtotalRow.cells[5].textContent.trim();
        } else {
            console.error(
                "No se encontró la fila de subtotal o no tiene suficientes celdas."
            );
        }

        if(asignaturaId && grupoId && aula){
            horarios.push({
                asignatura_id: asignaturaId,
                grupo_id: grupoId,
                aula: aula,
                lunesInicio: lunesInicio,
                lunesFin: lunesFin,
                martesInicio: martesInicio,
                martesFin: martesFin,
                miercolesInicio: miercolesInicio,
                miercolesFin: miercolesFin,
                juevesInicio: juevesInicio,
                juevesFin: juevesFin,
                viernesInicio: viernesInicio,
                viernesFin: viernesFin,
                subtotalesHorario: horarioSubtotal,
                totalHoras: totalHoras
            });
        }
    });

    const actividadesRows = document.querySelectorAll('#tablaBodyActividades tr:not(.hours-subtotal-actividades):not(.hours-total-actividades)');
    if (actividadesRows.length === 1 && actividadesRows[0].querySelector('td.text-center')) {
        console.log("No se procesarán actividades complementarias porque no hay ninguna asignada.");
    } else {
        actividadesRows.forEach(row => {
            const descripcion = row.cells[0].querySelector("textarea").value.trim();
            const lugar = row.cells[1].querySelector("input").value.trim();
            const grupoId = 166;
            const lunesInicio = row.cells[3].querySelectorAll("input")[0].value;
            const lunesFin = row.cells[3].querySelectorAll("input")[1].value;
            const martesInicio = row.cells[4].querySelectorAll("input")[0].value;
            const martesFin = row.cells[4].querySelectorAll("input")[1].value;
            const miercolesInicio = row.cells[5].querySelectorAll("input")[0].value;
            const miercolesFin = row.cells[5].querySelectorAll("input")[1].value;
            const juevesInicio = row.cells[6].querySelectorAll("input")[0].value;
            const juevesFin = row.cells[6].querySelectorAll("input")[1].value;
            const viernesInicio = row.cells[7].querySelectorAll("input")[0].value;
            const viernesFin = row.cells[7].querySelectorAll("input")[1].value;
            const totalHoras = row.cells[8].textContent.trim();

            const actividadesSubtotalRow = document.querySelector(".hours-subtotal-actividades");
            let actividadesSubtotal = {
                lunes: "0:00",
                martes: "0:00",
                miercoles: "0:00",
                jueves: "0:00",
                viernes: "0:00"
            };

            if (actividadesSubtotalRow && actividadesSubtotalRow.cells.length >= 7) {
                actividadesSubtotal.lunes = actividadesSubtotalRow.cells[1].textContent.trim();
                actividadesSubtotal.martes = actividadesSubtotalRow.cells[2].textContent.trim();
                actividadesSubtotal.miercoles = actividadesSubtotalRow.cells[3].textContent.trim();
                actividadesSubtotal.jueves = actividadesSubtotalRow.cells[4].textContent.trim();
                actividadesSubtotal.viernes = actividadesSubtotalRow.cells[5].textContent.trim();
            } else {
                console.error("No se encontró la fila de subtotal en actividades o no tiene suficientes celdas.");
            }

            if(descripcion && lugar && grupoId){
                actividadesComplementarias.push({
                    descripcion: descripcion,
                    lugar: lugar,
                    grupo: grupoId,
                    lunesInicio: lunesInicio,
                    lunesFin: lunesFin,
                    martesInicio: martesInicio,
                    martesFin: martesFin,
                    miercolesInicio: miercolesInicio,
                    miercolesFin: miercolesFin,
                    juevesInicio: juevesInicio,
                    juevesFin: juevesFin,
                    viernesInicio: viernesInicio,
                    viernesFin: viernesFin,
                    subtotalesActividades: actividadesSubtotal,
                    totalHoras: totalHoras
                });
            }
        });
    }

    const data = {
        usuario_id: usuarioId,
        periodo_escolar: periodoEscolar,
        horarios: horarios,
        actividades: actividadesComplementarias
    };

    console.log(data);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/CBTIS/app/core/ajaxConfig.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Respuesta del servidor:", xhr.responseText);
                try {
                    if (xhr.responseText) {
                        const result = JSON.parse(xhr.responseText);
                        if (result.status === "success") {
                            alert("Datos guardados correctamente.");
                        } else {
                            alert("Error al guardar los datos: " + result.message);
                        }
                    } else {
                        console.error("Respuesta vacía del servidor.");
                        alert("Error: La respuesta del servidor está vacía.");
                    }
                } catch (e) {
                    console.error("Error al analizar JSON:", e);
                    alert("Error inesperado al procesar la respuesta del servidor.");
                }
            } else {
                alert("Error al guardar los datos. Estado HTTP: " + xhr.status);
            }
        }
    };
    const params = "action=guardarHorarios&data=" + encodeURIComponent(JSON.stringify(data));

    console.log("Datos enviados:", decodeURIComponent(params));

    xhr.send(params);
});
