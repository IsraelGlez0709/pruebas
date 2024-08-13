<?php
    class Usuario{
        private $conn;
        private $table_name = "usuarios";
        public $id_usuario;
        public $token;
        public $nombre;
        public $ap_paterno;
        public $ap_materno;
        public $usuario;
        public $password;
        public $id_tipo_usuario;

        public function __construct($db){
            $this -> conn = $db;
        }

        public function registrar(){
            $query = "INSERT INTO " . $this -> table_name ."(token, nombre, ap_paterno, ap_materno, usuario, password, id_tipo_usuario) VALUES(:token, :nombre, :ap_paterno, :ap_materno, :usuario, :password, :id_tipo_usuario)";

            $stmt = $this -> conn -> prepare($query);

            $this -> token = htmlspecialchars(strip_tags($this -> token));
            $this -> nombre = htmlspecialchars(strip_tags($this -> nombre));
            $this -> ap_paterno = htmlspecialchars(strip_tags($this -> ap_paterno));
            $this -> ap_materno = htmlspecialchars(strip_tags($this -> ap_materno));
            $this -> usuario = htmlspecialchars(strip_tags($this -> usuario));
            $this -> password = htmlspecialchars(strip_tags($this -> password));
            $this -> id_tipo_usuario = htmlspecialchars(strip_tags($this -> id_tipo_usuario));

            $stmt -> bindParam(":token", $this -> token);
            $stmt -> bindParam(":nombre", $this -> nombre);
            $stmt -> bindParam(":ap_paterno", $this -> ap_paterno);
            $stmt -> bindParam(":ap_materno", $this -> ap_materno);
            $stmt -> bindParam(":usuario", $this -> usuario);
            $stmt -> bindParam(":password", $this -> password);
            $stmt -> bindParam(":id_tipo_usuario", $this -> id_tipo_usuario);

            if($stmt -> execute()){
                return true;
            }
            return false;
        }

        public function login(){
            $query = "SELECT * FROM ". $this -> table_name. " WHERE usuario = :usuario AND password = :password";
            $stmt = $this -> conn -> prepare($query);

            $this -> usuario = htmlspecialchars(strip_tags($this -> usuario));
            $this -> password = htmlspecialchars(strip_tags($this -> password));

            $stmt -> bindParam(":usuario", $this -> usuario);
            $stmt -> bindParam(":password", $this -> password);

            if($stmt -> execute()){
                $user = $stmt -> fetch(PDO::FETCH_ASSOC);
                return $user;
            }
            return false;
        }

        public function editar(){
            $query = "UPDATE ". $this -> table_name. " SET nombre = :nombre, ap_paterno = :ap_paterno, ap_materno = :ap_materno, usuario = :usuario, password = :password, id_tipo_usuario = :id_tipo_usuario WHERE id_usuario = :id_usuario";
            $stmt = $this -> conn -> prepare($query);

            $this -> nombre = htmlspecialchars(strip_tags($this -> nombre));
            $this -> ap_paterno = htmlspecialchars(strip_tags($this -> ap_paterno));
            $this -> ap_materno = htmlspecialchars(strip_tags($this -> ap_materno));
            $this -> usuario = htmlspecialchars(strip_tags($this -> usuario));
            $this -> password = htmlspecialchars(strip_tags($this -> password));
            $this -> id_tipo_usuario = htmlspecialchars(strip_tags($this -> id_tipo_usuario));
            $this -> id_usuario = htmlspecialchars(strip_tags($this -> id_usuario));

            $stmt -> bindParam(":nombre", $this -> nombre);
            $stmt -> bindParam(":ap_paterno", $this -> ap_paterno);
            $stmt -> bindParam(":ap_materno", $this -> ap_materno);
            $stmt -> bindParam(":usuario", $this -> usuario);
            $stmt -> bindParam(":password", $this -> password);
            $stmt -> bindParam(":id_tipo_usuario", $this ->id_tipo_usuario);
            $stmt -> bindParam(":id_usuario", $this -> id_usuario);

            if($stmt -> execute()){
                return true;
            }
            return false;
        }

        public function eliminar(){
            $query = "DELETE FROM ". $this -> table_name. " WHERE id_usuario = :id_usuario";
            $stmt = $this -> conn -> prepare($query);
            $this -> id_usuario = htmlspecialchars(strip_tags($this -> id_usuario));
            $stmt -> bindParam(":id_usuario", $this -> id_usuario);
            if($stmt -> execute()){
                return true;
            }
            return false;
        }
    }
