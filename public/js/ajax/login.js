$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        let usuario = $("#username").val();
        let password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "app/core/ajaxConfig.php",
            data: {
                usuario: usuario,
                password: password,
                action: "login",
            },
            success: function (response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    console.error("Error al analizar JSON:", e);
                    $("#loginMessage").html("Error al procesar la respuesta del servidor.");
                    return;
                }
                console.log(response);
                if (response.status === "success") {
                    window.location.href = response.url;
                } else if (response.status === "error") {
                    $("#loginMessage").html(response.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#loginMessage").html(
                    "Error: " + textStatus + " - " + errorThrown
                );
            },
        });
    });
});
