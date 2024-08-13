$(document).ready(function () {
    cargarCarreras();

    $("#formCarreras").submit(function (e) {
        e.preventDefault();

        let formData = new FormData();
        let serializedData = $(this).serializeArray();

        let grupos = [];
        $.each(serializedData, function (index, obj) {
            if (obj.name === "grupos[]") {
                grupos.push(obj.value.toUpperCase());
            } else {
                formData.append(obj.name, obj.value);
            }
        });

        let gruposCBTIS = [];
        grupos.forEach(function (group) {
            for (let i = 1; i <= 6; i++) {
                gruposCBTIS.push(i + group);
            }
        });

        grupos.sort();

        let gruposSISEEMS = [];
        grupos.forEach(function (group, index) {
            let letter = String.fromCharCode(65 + index);
            for (let i = 1; i <= 6; i++) {
                gruposSISEEMS.push(i + letter);
            }
        });

        formData.append("gruposCBTIS", JSON.stringify(gruposCBTIS));
        formData.append("gruposSISEEMS", JSON.stringify(gruposSISEEMS));
        formData.append("action", "registrarCarrera");

        $.ajax({
            type: 'POST',
            url: 'app/core/ajaxConfig.php',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $("#mensajeCarreras").removeClass("alert-success alert-danger");
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                if (response.status === "success") {
                    $("#mensajeCarreras").addClass("alert py-2 alert-success").html(response.message);
                    clearAndDisableInputs();
                    cargarCarreras();
                } else if (response.status === "error") {
                    $("#mensajeCarreras").removeClass("alert-success alert-danger");
                    $("#mensajeCarreras").addClass("alert py-2 alert-danger").html(response.message);
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    });

    function clearAndDisableInputs() {
        $("#carrera").val("");
        $("input[name='grupos[]']").each(function () {
            $(this).val("");
        });
    }

    function cargarCarreras(){
        $.ajax({
            type: 'POST',
            url: 'app/core/ajaxConfig.php',
            data: {action: "cargarCarreras"},
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                console.log(response);
                $("#asignatura_carrera").empty();
                $("#asignatura_carrera").append(
                    $("<option>", {
                        value: "",
                        text: "Selecciona una opción",
                        disabled: true,
                        selected: true,
                    })
                );

                $.each(response, function (index, carrera) {
                    $("#asignatura_carrera").append(
                        $("<option>", {value: carrera.carrera, text: carrera.carrera})
                    );
                });

                $("#asignatura_carrera").on('change', function() {
                    let carrera = $(this).val();
                    if(carrera){
                        cargarGrupos(carrera);
                    }else{
                        $("#grupo_asignatura").empty();
                    }
                })
            },
            error: function (error) {
                console.error(error);
            }
        })
    }

    function cargarGrupos(carrera) {
        $.ajax({
            type: 'POST',
            url: 'app/core/ajaxConfig.php',
            data: {
                carrera: carrera,
                action: 'cargarGrupos'
            },
            dataType: 'json',
            success: function(response) {
                if (response.length > 0) {
                    let gruposJSON = response[0].grupos_cbtis;

                    let grupos = JSON.parse(gruposJSON);

                    $('#grupo_asignatura').empty();
                    $('#grupo_asignatura').append($('<option>', {
                        value: '',
                        text: 'Selecciona una opción',
                        disabled: true,
                        selected: true
                    }));

                    grupos.forEach(function(grupo) {
                        $('#grupo_asignatura').append($('<option>', {
                            value: grupo,
                            text: grupo
                        }));
                    });
                } else {
                    console.error('No se encontraron datos de grupos para la carrera seleccionada.');
                }
            },
            error: function(error) {
                console.error('Error al cargar los grupos:', error);
            }
        });
    }
});
