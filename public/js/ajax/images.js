$(document).ready(function() {
    function getImages(){
        $.ajax({
            type: 'POST',
            url: 'app/core/ajaxConfig.php',
            data: {
                action: 'getImages'
            },
            success: function(response) {
                if(typeof response === "string"){
                    response = JSON.parse(response)
                }
                $("#imageContainer").empty();
                $.each(response, function (index, imagen) {
                    let url = imagen.url.replace("../../", "");
                    let card = `
                    <div class="col-sm-6 mb-3">
                        <div class="card card-image">
                            <div class="card-body p-0">
                                <img src="${url}" alt="">
                                <div class="overlay">
                                    <div class="overlay-text px-3">${imagen.descripcion}</div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    $("#imageContainer").append(card)
                });
            },
            error: function(error){
                console.log('Error al obtener las imagenes: ', error)
            }
        })
    }

    getImages();


    $('#subirImagen').submit(function(e) {
        e.preventDefault();

        let formData = new FormData(this)
        let fileImage = $('#fileImage')[0].files[0]
        let descripcion = $('#descripcion').val()

        formData.append('fileImage', fileImage)
        formData.append('descripcion', descripcion)
        formData.append('action', 'uploadImage')

        $.ajax({
            type: 'POST',
            url: 'app/core/ajaxConfig.php',
            contentType: false,
            processData: false,
            data: formData,
            success: function(response) {
                $("#mensaje").removeClass("alert-success alert-danger");
                if(typeof response === "string"){
                    response = JSON.parse(response);
                }
                if (response.status === "success") {
                    $("#mensaje").addClass("alert py-2 alert-success").html(response.message);
                    $("#fileImage").val("");
                    $("#descripcion").val("");
                    getImages();
                } else if (response.status === "error") {
                    $("#mensaje").removeClass("alert-success alert-danger");
                    $("#mensaje").addClass("alert py-2 alert-danger").html(response.message);
                }
            },
            error: function(error) {
                console.error(error)
            }
        })
    })
})
