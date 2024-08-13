<?php
    class Docente{
        private $conn;
        private $table_name = "docentes";
        public $rfc;
        public $email;
        public $id_usuario;

        public function __construct($db){
            $this -> conn = $db;
        }

        public function registrar(){
            $query = "INSERT INTO ". $this -> table_name. "(rfc, email, id_usuario) VALUES(:rfc, :email, :id_usuario)";

            $stmt = $this -> conn -> prepare($query);

            $this -> rfc = htmlspecialchars(strip_tags($this -> rfc));
            $this -> email = htmlspecialchars(strip_tags($this -> email));
            $this -> id_usuario = htmlspecialchars(strip_tags($this -> id_usuario));

            $stmt -> bindParam(":rfc", $this -> rfc);
            $stmt -> bindParam(":email", $this -> email);
            $stmt -> bindParam(":id_usuario", $this -> id_usuario);

            if($stmt -> execute()){
                return true;
            }
            return false;
        }

        public function editar(){
            $query = "UPDATE ". $this -> table_name. " SET rfc = :rfc, email = :email WHERE id_usuario = :id_usuario";
            $stmt = $this -> conn -> prepare($query);

            $this -> rfc = htmlspecialchars(strip_tags($this -> rfc));
            $this -> email = htmlspecialchars(strip_tags($this -> email));
            $this -> id_usuario = htmlspecialchars(strip_tags($this -> id_usuario));

            $stmt -> bindParam(":rfc", $this -> rfc);
            $stmt -> bindParam(":email", $this -> email);
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
