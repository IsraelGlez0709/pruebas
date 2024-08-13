<?php
    if (isset($_SESSION['token']) && is_array($_SESSION['token'])) {
        $nombre = $_SESSION['token']['nombre'];
    } else {
        header("Location: index.php?page=logout");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="public/js/modalAlumnos.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@fullcalendar/core@4.2.0/main.min.css'>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@4.3.0/main.min.css'>
    <link rel="stylesheet" href="public/css/dataTables.css" />
    <link rel="stylesheet" href="public/css/dashboard.css">
    <link rel="stylesheet" href="public/v6.5.2/css/all.css">
    <link rel="stylesheet" href="public/v6.5.2/css/sharp-solid.css">
    <link rel="stylesheet" href="public/v6.5.2/css/sharp-regular.css">
    <link rel="stylesheet" href="public/v6.5.2/css/sharp-light.css">
    <title>Gestión Docente | <?php echo ucfirst($_GET['page']) ?></title>
</head>
<body>
    <div class="wrapper">
        <div class="body-overlay"></div>
        <!-- Sidebar begins -->
        <div id="sidebar">
            <div class="sidebar-header">
                <h3><img src="public/img/dgeti.png" alt="" class="img-fluid"><span>Sistema de observación</span></h3>
            </div>
            <ul class="list-unstyled component m-0">
                <div class="menu-item py-2">
                    <div class="menu-content"><span class="menu-heading fw-bold text-uppercase">Principal</span></div>
                </div>
                <?php if(isset($_GET['page'])): ?>
                    <?php if($_GET['page'] == 'main'): ?>
                        <li class="active">
                            <a href="index.php?page=main" class="dashboard">
                                <i class="fa-duotone fa-grid-2"></i>
                                Dashboard
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="">
                            <a href="index.php?page=main" class="dashboard">
                                <i class="fa-duotone fa-grid-2"></i>
                                Dashboard
                            </a>
                        </li>
                    <?php endif; ?>
                    <li class="dropdown">
                        <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <i class="fa-duotone fa-file-doc"></i>
                            Calificaciones
                        </a>
                        <ul class="collapse list-unstyled menu" id="homeSubmenu1">
                            <?php if($_GET['page'] == 'manage'): ?>
                                <li class="active"><a href="#">Gestionar</a></li>
                            <?php else: ?>
                                <li><a href="#">Gestionar</a></li>
                            <?php endif; ?>
                            <?php if($_GET['page'] == 'consult'): ?>
                                <li class="active"><a href="#">Consultar</a></li>
                            <?php else: ?>
                                <li><a href="#">Consultar</a></li>
                            <?php endif; ?>
                        </ul>
                    </li>
                    <?php if ($_GET['page'] == 'students'): ?>
                        <li class="active">
                            <a href="index.php?page=students" class="dashboard">
                                <i class="fa-duotone fa-users"></i>
                                Alumnos
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="">
                            <a href="index.php?page=students" class="dashboard">
                                <i class="fa-duotone fa-users"></i>
                                Alumnos
                            </a>
                        </li>
                    <?php endif; ?>

                    <?php if ($_GET['page'] == 'teachers'): ?>
                        <li class="active">
                            <a href="index.php?page=teachers" class="dashboard">
                                <i class="fa-duotone fa-user"></i>
                                Maestros
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="">
                            <a href="index.php?page=teachers" class="dashboard">
                                <i class="fa-duotone fa-user"></i>
                                Maestros
                            </a>
                        </li>
                    <?php endif; ?>
                    <div class="menu-item py-2">
                        <div class="menu-content"><span class="menu-heading fw-bold text-uppercase">Recursos</span></div>
                    </div>
                    <?php if ($_GET['page'] == 'calendar'): ?>
                        <li class="active">
                            <a href="index.php?page=calendar" class="dashboard">
                                <i class="fa-duotone fa-calendars"></i>
                                Calendario
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="">
                            <a href="index.php?page=calendar" class="dashboard">
                                <i class="fa-duotone fa-calendars"></i>
                                Calendario
                            </a>
                        </li>
                    <?php endif; ?>

                    <?php if ($_GET['page'] == 'tasks'): ?>
                        <li class="active">
                            <a href="#" class="dashboard">
                                <i class="fa-duotone fa-list-check"></i>
                                Tareas
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="">
                            <a href="#" class="dashboard">
                                <i class="fa-duotone fa-list-check"></i>
                                Tareas
                            </a>
                        </li>
                    <?php endif; ?>

                    <?php if ($_GET['page'] == 'config'): ?>
                        <li class="active">
                            <a href="index.php?page=config" class="dashboard">
                                <i class="fa-duotone fa-gear"></i>
                                Configuración
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="">
                            <a href="index.php?page=config" class="dashboard">
                                <i class="fa-duotone fa-gear"></i>
                                Configuración
                            </a>
                        </li>
                    <?php endif; ?>
                <?php else: ?>
                    <li class="active">
                        <a href="index.php?page=main</a>" class="dashboard">
                            <i class="fa-duotone fa-grid-2"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="dropdown">
                        <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <i class="fa-duotone fa-file-doc"></i>
                            Calificaciones
                        </a>
                        <ul class="collapse list-unstyled menu" id="homeSubmenu1">
                            <li><a href="index.php?page=gestionar">Gestionar</a></li>
                            <li><a href="index.php?page=consultar">Consultar</a></li>
                        </ul>
                    </li>
                    <li class="">
                        <a href="index.php?page=students" class="dashboard">
                            <i class="fa-duotone fa-users"></i>
                            Alumnos
                        </a>
                    </li>
                    <li class="">
                        <a href="index.php?page=teachers" class="dashboard">
                            <i class="fa-duotone fa-user"></i>
                            Maestros
                        </a>
                    </li>
                    <div class="menu-item py-2">
                        <div class="menu-content"><span class="menu-heading fw-bold text-uppercase">Recursos</span></div>
                    </div>
                    <li class="">
                        <a href="index.php?page=calendar" class="dashboard">
                            <i class="fa-duotone fa-calendars"></i>
                            Calendario
                        </a>
                    </li>
                    <li class="">
                        <a href="index.php?page=config" class="dashboard">
                            <i class="fa-duotone fa-gear"></i>
                            Configuración
                        </a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
        <!-- Sidebar ends -->

        <!-- Sidebar design close begins -->
        <!-- Page content begins -->
        <div id="content">
            <!-- Top navbar begins -->
            <div class="top-navbar">
                <div class="xp-topbar">
                    <div class="row">
                        <div class="col-2 col-md-1 col-lg-1 order-2 order-md-1 align-self-center">
                            <div class="xp-menubar">
                                <i class="fa-duotone fa-bars text-white"></i>
                            </div>
                        </div>
                        <div class="col-md-5 col-lg-3 order-3 order-md-2">
                            <div class="xp-searchbar">
                                <form action="">
                                    <div class="input-group">
                                        <input type="search" class="form-control" placeholder="Buscar..." name="" id="">
                                        <div class="input-group-append">
                                            <button class="btn" type="submit" id="button-addon2"><i
                                                    class="fa-duotone fa-magnifying-glass"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-10 col-md-6 col-lg-8 order-1 order-md-3">
                            <div class="xp-profilebar d-flex justify-content-end">
                                <nav class="navbar p-0">
                                    <ul class="nav navbar-nav flex-row ml-auto">
                                        <li class="dropdown nav-item active">
                                            <a href="#" class="nav-link" data-toggle="dropdown">
                                                <i class="fa-duotone fa-bell"></i>
                                                <span class="notification">4</span>
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a href="#">Tienes 4 mensajes nuevos</a></li>
                                                <li><a href="#">Tienes 4 mensajes nuevos</a></li>
                                                <li><a href="#">Tienes 4 mensajes nuevos</a></li>
                                                <li><a href="#">Tienes 4 mensajes nuevos</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link">
                                                <i class="fa-duotone fa-comments"></i>
                                            </a>
                                        </li>
                                        <li class="dropdown nav-item">
                                            <a href="#" class="nav-link" data-toggle="dropdown">
                                                <img src="public/img/dgeti.png" alt=""
                                                    style="width: 40px; border-radius: 50%;">
                                                <span class="xp-user-live"></span>
                                            </a>
                                            <ul class="dropdown-menu small-menu">
                                                <li><a href="#">
                                                        <i class="fa-duotone fa-user"></i>
                                                        Mi perfil
                                                    </a></li>
                                                <li><a href="#">
                                                        <i class="fa-duotone fa-gear"></i>
                                                        Configuración
                                                    </a></li>
                                                <li><a href="index.php?page=logout">
                                                        <i class="fa-duotone fa-left-from-bracket"></i>
                                                        Cerrar sesión
                                                    </a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="xp-breadcrumbbar text-center">
                        <h4 class="page-title my-2" id="bienvenida"></h4>
                    </div>
                </div>
            </div>
            <!-- Top navbar ends -->
            <!-- Main Content begins -->
            <div class="main-content">
                <?php
                    if(isset($_GET['page'])){
                        if($_GET['page'] == "main" || $_GET['page'] == "students" || $_GET['page'] == "search" || $_GET['page'] == "teachers" || $_GET['page'] == "logout" || $_GET['page'] == "calendar" || $_GET['page'] == "config" || $_GET['page'] == "asignar_materias" || $_GET['page'] == "cargas"){
                            include_once "pages/".$_GET['page'].".php";
                        }else{
                            include_once "pages/404.php";
                        }
                    }else{
                        include_once "pages/main.php";
                    }
                ?>
            </div>
            <!-- Main content ends -->
        </div>
        <!-- Page content ends -->
        <!-- Sidebar design close ends -->
    </div>
    <script src="public/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="public/js/dataTables.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".xp-menubar").on('click', function () {
                $("#sidebar").toggleClass("active");
                $("#content").toggleClass('active')
            });

            $(".xp-menubar, .body-overlay").on('click', function () {
                $("#sidebar, .body-overlay").toggleClass("show-nav");
            });
        });
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const bienvenidaElement = document.getElementById("bienvenida");
            const nombre = "<?php echo $nombre; ?>";
            const fecha = new Date();
            const horas = fecha.getHours();
            let bienvenida = "";

            if (horas >= 0 && horas < 12) {
                bienvenida = "Buenos días";
            } else if (horas >= 12 && horas < 18) {
                bienvenida = "Buenas tardes";
            } else {
                bienvenida = "Buenas noches";
            }

            bienvenidaElement.textContent = `${bienvenida}, ${nombre}`;
        });
    </script>
    <script>
        new DataTable('#docentesTable'),
        new DataTable('#studentsTable', {
            scrollX: true
        })
    </script>
    <script type="text/javascript">
        const ctx = document.getElementById('doughnut');
        const bar_chart = document.getElementById('bart');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        new Chart(bar_chart, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
    <script src='public/js/ajax/registrar.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/core@4.2.0/main.min.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@4.2.0/main.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/interaction@4.2.0/main.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuidv4.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core/locales/es.js"></script>
    <script src="public/js/calendar.js"></script>
    <script src="public/js/activeButtons.js"></script>
    <script src="public/js/ajax/images.js"></script>
    <script src="public/js/ajax/calendarMain.js"></script>
    <script src="public/js/ajax/configuracion.js"></script>
    <script src="public/js/ajax/config.js"></script>
    <script src="public/js/ajax/asignar.js"></script>
</body>
</html>
