<?php
    class ControladorPlantilla{
        static public function ctrMostrarPlantilla(){
            session_start();
            if(isset($_SESSION['validarIngreso']) && $_SESSION['validarIngreso'] == "ok"){
                include "app/Views/dashboard_layout.php";
            }else{
                include "app/Views/login.php";
            }
        }
    }
