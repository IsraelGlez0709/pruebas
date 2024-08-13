<?php
    require_once "app/Controllers/plantilla.controlador.php";
    require_once "app/Controllers/usuario.controlador.php";
    require_once "app/Models/maestros.modelo.php";
    require_once "app/Models/usuario.modelo.php";

    $plantilla = new ControladorPlantilla();
    $plantilla -> ctrMostrarPlantilla();
