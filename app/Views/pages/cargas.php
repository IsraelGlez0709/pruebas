<?php
require_once '/xampp/htdocs/CBTIS/app/Controllers/usuario.controlador.php';
$usuarioController = new UsuarioController();
?>
<div class="container-fluid">
    <h2 class="text-center fs-2 fw-bold mb-4">Distribución y Horario de Actividades Académicas</h2>
    <div class="header-info mb-4">
        <table class="table table-datos table-bordered">
            <tbody>
                <tr>
                    <td><strong>Nombre Completo:</strong></td>
                    <td>
                        <select class="form-select" id="nombreCompleto" onchange="fetchRFCAndAsignaturas(this.value)">
                            <option value="" selected disabled>-- Selecciona un maestro --</option>
                            <?php
                            $maestros = $usuarioController->getMaestros();
                            foreach ($maestros as $maestro) {
                                echo '<option value="' . htmlspecialchars($maestro['id_usuario']) . '">' . htmlspecialchars($maestro['nombre']) . '</option>';
                            }
                            ?>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><strong>RFC:</strong></td>
                    <td><input type="text" class="form-control" id="rfc" disabled></td>
                </tr>
                <tr>
                    <td><strong>Periodo Escolar:</strong></td>
                    <td><input type="text" class="form-control" id="periodoEscolar"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="section-title">I. Horario</div>
    <table class="table table-datos table-bordered mt-3">
        <thead class="table-secondary">
            <tr>
                <th>Asignatura</th>
                <th>Grupo</th>
                <th>No. Aula</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>T. Hrs.</th>
            </tr>
        </thead>
        <tbody id="tablaBodyHorario">

        </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center">
        <div class="section-title">II. Actividades Complementarias</div>
        <button id="addRowButton" class="btn btn-secondary btn-sm">Agregar Fila</button>
    </div>
    <table class="table table-actividades table-bordered mt-3">
        <thead class="table-secondary">
            <tr>
                <th>Descripción</th>
                <th>Lugar de realización</th>
                <th>Grupo</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>T. Hrs.</th>
            </tr>
        </thead>
        <tbody id="tablaBodyActividades">

        </tbody>
    </table>
    <div class="text-end my-4">
         <button id="guardarDatos" class="btn btn-secondary btn-sm">Guardar Todo</button>
    </div>
</div>
