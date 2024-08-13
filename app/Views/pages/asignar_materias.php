<?php
    require_once '/xampp/htdocs/CBTIS/app/Controllers/usuario.controlador.php';
    $usuarioController = new UsuarioController();
?>
<div class="container-fluid">
    <div class="d-flex mb-4 justify-content-between align-items-center">
        <h2 class="fs-3 fw-bold">Asignación de maestros</h2>
        <a href="index.php?page=cargas" class="btn btn-danger">Cargas externos</a>
    </div>
    <div id="mensajeAsignacion" class="mt-3"></div>
    <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="w-50">
            <label for="carreraFiltro" class="form-label">Selecciona una carrera:</label>
            <select id="carreraFiltro" class="form-select" onchange="filterByCarrera()">
                <option value="" selected disabled>-- Selecciona una carrera --</option>
                <?php
                    $carreras = $usuarioController -> getCarreras();

                    foreach($carreras as $carrera){
                        echo '<option value="' . htmlspecialchars($carrera['id']) . '">' . htmlspecialchars($carrera['nombre']) . '</option>';
                    }
                ?>
            </select>
        </div>
        <div class="w-50">
            <label for="grupoFiltro" class="form-label">Selecciona un grupo:</label>
            <select id="grupoFiltro" class="form-select" onchange="filterByGrupo()">
                <option value="" selected disabled>-- Selecciona un grupo --</option>
                <?php
                    $grupos = $usuarioController -> getGrupos();

                    foreach($grupos as $grupo){
                        echo '<option value="' . htmlspecialchars($grupo['id']) . '">' . htmlspecialchars($grupo['grupo_cbtis']) . '</option>';
                    }
                ?>
            </select>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead class="table-dark">
                <tr>
                    <th>Grupo</th>
                    <th>Turno</th>
                    <th>Carrera</th>
                    <th>Asignatura</th>
                    <th>Profesor</th>
                </tr>
            </thead>
            <tbody id="tablaBody">

            </tbody>
        </table>
    </div>
</div>
