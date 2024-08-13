<?php
    class Conexion{
        static public function db_connect(){
            $link = new PDO("mysql:host=localhost:3306;dbname=cbtis_prueba", "root", "");
            $link->exec("set names utf8");
            return $link;
        }
    }
