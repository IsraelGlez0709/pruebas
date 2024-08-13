<?php
    require_once "/xampp/htdocs/CBTIS/app/Controllers/usuario.controlador.php";

    $controller = new UsuarioController();
    $controller -> getExcelDocentes();
