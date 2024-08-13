$(document).ready(function(){
    $("#excelConfig").submit(function (e) {
        e.preventDefault();
        console.log("Datos recibidos")
        let formData = new FormData(this);
        let file = $("#hojaExcelConfig")[0].files[0];
        formData.append("hojaExcelConfig", file);
        formData.append("action", "uploadConfig");

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("#progressBar").css("width", percentComplete + "%");
                        $("#progressBar").text(percentComplete + "%");
                        if (percentComplete === 100) {
                            $("#progressBar").text("Procesando...");
                        }
                    }
                }, false);
                return xhr;
            },
            type: "POST",
            url: "app/core/ajaxConfig.php",
            processData: false,
            contentType: false,
            data: formData,
            success: function(response){
                console.log("Respuesta servidor: ", response);
                if(typeof response === "string"){
                    response = JSON.parse(response)
                }
                $("#mensajeConfig").removeClass("alert-success alert-danger");
                if (response.status === "success") {
                    $("#mensajeConfig").addClass("alert py-2 alert-success").html(response.message);
                } else if (response.status === "error") {
                    $("#mensajeConfig").removeClass("alert-success alert-danger");
                    $("#mensajeConfig").addClass("alert py-2 alert-danger").html(response.message);
                }
                $("#progressBar").css("width", "0%");
                $("#progressBar").text("0%");
            },
            error: function (error) {
                console.error("Error: ", error);
                alert("Error al procesar el archivo.");
                $("#progressBar").css("width", "0%");
                $("#progressBar").text("0%");
            },
        });
    });
});
