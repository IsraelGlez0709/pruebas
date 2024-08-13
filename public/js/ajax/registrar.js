$(document).ready(function () {
    const editarDocente = document.getElementById("btnEditarDocente");
    const nombre = document.getElementById("nombreEditar");
    const ap_paterno = document.getElementById("ap_paternoEditar");
    const ap_materno = document.getElementById("ap_maternoEditar");
    const usuario = document.getElementById("usuarioEditar");
    const password = document.getElementById("passwordEditar");
    const rfc = document.getElementById("rfcEditar");
    const email = document.getElementById("emailEditar");
    const tipo_usuario = document.getElementById("tipo_usuarioEditar");
    const submitEditar = document.getElementById("submitEditar");

    let table = $("#docentesTable").DataTable();
    let docenteID = null;

    function fetchDocentes(){
        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                action: "getDocentes"
            },
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                table.clear().draw();
                $.each(response, function (index, docente) {
                    table.row.add([
                        docente.rfc,
                        docente.nombre,
                        docente.usuario,
                        docente.id_tipo_usuario,
                        `<button  type="button" class="btn btn-info btn-sm w-100" onclick="mostrarDocente(${docente.id_usuario})" data-bs-toggle="modal" data-bs-target="#mostrarDocente">Ver más</button>`
                    ]).draw(false);
                });
            }
        })
    }

    editarDocente.addEventListener("click", function() {
        nombre.disabled = !nombre.disabled;
        ap_paterno.disabled = !ap_paterno.disabled;
        ap_materno.disabled = !ap_materno.disabled;
        usuario.disabled = !usuario.disabled;
        password.disabled = !password.disabled;
        rfc.disabled = !rfc.disabled;
        email.disabled = !email.disabled;
        tipo_usuario.disabled = !tipo_usuario.disabled;
        submitEditar.disabled = !submitEditar.disabled;
    })

    $("#mostrarDocente").on("hidden.bs.modal", function () {
        nombre.disabled = true;
        ap_paterno.disabled = true;
        ap_materno.disabled = true;
        usuario.disabled = true;
        password.disabled = true;
        rfc.disabled = true;
        email.disabled = true;
        tipo_usuario.disabled = true;
        submitEditar.disabled = true;
        $("#mensajeEditar").removeClass("py-2 alert alert-success alert-danger").html("");
    })

    window.mostrarDocente = function(id_usuario) {
        docenteID = id_usuario;
        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                action: "mostrarDocente",
                id_usuario: docenteID
            },
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                $("#idEditar").val(response.id_usuario);
                $("#nombreEditar").val(response.nombre);
                $("#ap_paternoEditar").val(response.ap_paterno);
                $("#ap_maternoEditar").val(response.ap_materno);
                $("#usuarioEditar").val(response.usuario);
                $("#passwordEditar").val(response.password);
                $("#rfcEditar").val(response.rfc);
                $("#emailEditar").val(response.email);
                $("#tipo_usuarioEditar").val(response.id_tipo_usuario);
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })
    }

    $("#btnEliminarDocente").on("click", function(e) {
        console.log("Obteniendo usuario")
        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                action: "mostrarDocente",
                id_usuario: docenteID,
            },
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                let usuarioText = `${response.usuario} de ${response.nombre} ${response.ap_paterno}`;
                $("#deleteUsuario").empty().append(usuarioText);
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        });
    })

    $("#confirmDeleteDocente").on("click", function(e) {
        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                action: "eliminarDocente",
                id_usuario: docenteID
            },
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                if (response.status === "success") {
                    alert(response.message);
                    $("#eliminarDocente").modal("hide");
                    fetchDocentes();
                } else if (response.status === "error") {
                    $("#mensajeEliminar").removeClass("alert-success alert-danger");
                    $("#mensajeEliminar").addClass("alert py-2 alert-danger").html(response.message);
                }
            },
            error: function (error) {
                console.error("Error: ", error);
            }
        })
    })

    fetchDocentes();

    $("#excelDocentes").submit(function (e) {
        e.preventDefault();

        let formData = new FormData(this)
        let file = $("#hojaExcelDocentes")[0].files[0]

        formData.append("hojaExcelDocentes", file);
        formData.append("action", "uploadExcelDocentes");

        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                if(typeof response === "string"){
                    response = JSON.parse(response)
                }
                console.log("Respuesta del servidor:", response);
                $("#mensaje").removeClass("alert-success alert-danger");
                if (response.status === "success") {
                    $("#mensaje").addClass("alert py-2 alert-success").html(response.message);
                    fetchDocentes();
                } else if (response.status === "error") {
                    $("#mensaje").removeClass("alert-success alert-danger");
                    $("#mensaje").addClass("alert py-2 alert-danger").html(response.message);
                }
            },
            error: function (error) {
                console.error("Error: ", error);
                alert("Error al procesar el archivo.");
            },
        });
    })

    $("#modalRegister").on("hidden.bs.modal", function () {
        $("#mensaje").removeClass("alert py-2 alert-success alert-danger").empty();
        $("#hojaExcelDocentes").val("");
    });

    $("#registroForm").submit(function (e) {
        e.preventDefault();

        let nombre = $("#nombre").val();
        let ap_paterno = $("#ap_paterno").val();
        let ap_materno = $("#ap_materno").val();
        let rfc = $("#rfc").val();
        let email = $("#email").val();
        let tipo_usuario = $("#tipo_usuario").val();

        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                nombre: nombre,
                ap_paterno: ap_paterno,
                ap_materno: ap_materno,
                rfc: rfc,
                email: email,
                tipo_usuario: tipo_usuario,
                action: "create",
            },
            success: function (response) {
                $("#mensajeMaestros").removeClass("alert-success alert-danger");
                if (response.status === "success") {
                    $("#mensajeMaestros").addClass("alert py-2 alert-success").html(response.message);
                    $("#nombre").val("");
                    $("#ap_paterno").val("");
                    $("#ap_materno").val("");
                    $("#rfc").val("");
                    $("#email").val("");
                    $("#tipo_usuario").val($("#tipo_usuario option:first").val());
                    fetchDocentes();
                } else if (response.status === "error") {
                    $("#mensajeMaestros").removeClass("alert-success alert-danger");
                    $("#mensajeMaestros").addClass("alert py-2 alert-danger").html(response.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error: ", errorThrown);
            },
        });
    });

    $("#editarDocenteForm").submit(function (e) {
        e.preventDefault();
        console.log("Enviando datos editar...")

        let id_usuario = $("#idEditar").val();
        let nombre = $("#nombreEditar").val();
        let ap_paterno = $("#ap_paternoEditar").val();
        let ap_materno = $("#ap_maternoEditar").val();
        let rfc = $("#rfcEditar").val();
        let usuario = $("#usuarioEditar").val();
        let password = $("#passwordEditar").val();
        let email = $("#emailEditar").val();
        let tipo_usuario = $("#tipo_usuarioEditar").val();

        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                id_usuario: id_usuario,
                nombre: nombre,
                ap_paterno: ap_paterno,
                ap_materno: ap_materno,
                rfc: rfc,
                usuario: usuario,
                password: password,
                email: email,
                tipo_usuario: tipo_usuario,
                action: "editarDocente",
            },
            success: function (response) {
                if(typeof response === "string"){
                    response = JSON.parse(response)
                }
                $("#mensajeEditar").removeClass("alert-success alert-danger");
                if (response.status === "success") {
                    $("#mensajeEditar").addClass("alert py-2 alert-success").html(response.message);
                    $("#nombreEditar").prop("disabled", true);
                    $("#ap_paternoEditar").prop("disabled", true);
                    $("#ap_maternoEditar").prop("disabled", true);
                    $("#rfcEditar").prop("disabled", true);
                    $("#usuarioEditar").prop("disabled", true);
                    $("#passwordEditar").prop("disabled", true);
                    $("#emailEditar").prop("disabled", true);
                    $("#tipo_usuarioEditar").prop("disabled", true);
                    fetchDocentes();
                } else if (response.status === "error") {
                    $("#mensajeEditar").removeClass("alert-success alert-danger");
                    $("#mensajeEditar").addClass("alert py-2 alert-danger").html(response.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error: ", errorThrown);
            },
        });
    });

    $("#exampleModalToggle2").on("hidden.bs.modal", function () {
        $("#registroForm").trigger("reset");
        $("#mensaje").removeClass("py-2 alert alert-success alert-danger").html("");
    });
})
