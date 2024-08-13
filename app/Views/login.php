<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Acceso</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <link rel="stylesheet" href="public/css/login.css">
    <script src="https://kit.fontawesome.com/15274bd2db.js" crossorigin="anonymous"></script>
</head>
<body>
    <section>
        <div class="row g-0">
            <div class="col-lg-5 d-flex flex-column align-items-end min-vh-100">
                <div class="px-lg-5 pt-lg-4 pb-lg-3 p-4 w-100 mb-auto">
                    <img src="public/img/dgeti.png" alt="" width="70">
                </div>
                <div class="px-lg-5 py-lg-4 p-4 w-100 align-self-center">
                    <h2 class="mb-4">Bienvenido al Sistema de Observación de Servicios Docentes</h2>
                    <form class="needs-validation" id="loginForm" novalidate>
                        <div id="loginMessage"></div>
                        <div class="input-group has-validation mb-2 form-floating">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="username" placeholder="Usuario" required>
                                <label for="username">Usuario</label>
                            </div>
                        </div>
                        <div class="input-group has-validation mb-2 form-floating">
                            <div class="form-floating">
                                <input type="password" class="form-control" id="password" placeholder="Contraseña" required>
                                <label for="password">Contraseña</label>
                            </div>
                            <span class="input-group-text px-4" id="inputGroupPrepend" onclick="mostrarPassword()"><i class="fas fa-eye-slash text-muted" id="iconEye"></i></span>
                        </div>
                        <a href="#" class="form-text text-muted text-decoration-none">¿Has olvidado tu contraseña?</a>
                        <div class="d-flex justify-content-end mt-3">
                            <button type="submit" class="btn btn-primary px-5 py-2">Ingresar</button>
                        </div>
                    </form>
                </div>
                <div class="text-center px-lg-5 pt-lg-3 pb-lg-4 p-4 w-100 mt-auto">
                    <p class="d-inline-block mb-0">Si no tienes una cuenta, ponte en contacto con un administrador.</p>
                </div>
            </div>
            <div class="col-lg-7 d-none d-lg-block">
                <div class="img-fondo"></div>
            </div>
        </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script>
        (() => {
            'use strict'
            const forms = document.querySelectorAll('.needs-validation')

            Array.from(forms).forEach(form => {
                form.addEventListener('keyup', event => {
                    form.classList.add('was-validated')
                }, false)
            })
        })()
    </script>
    <script>
        function mostrarPassword() {
        const passwordInput = document.getElementById("password");
        const eyeIcon = document.getElementById("iconEye");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.remove("fa-eye-slash");
            eyeIcon.classList.add("fa-eye");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.remove("fa-eye");
            eyeIcon.classList.add("fa-eye-slash");
        }
    }
    </script>
    <script src="public/js/ajax/login.js"></script>
</body>

</html>
