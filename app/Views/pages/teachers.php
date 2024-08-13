<div class="container-fluid">
    <div class="d-flex justify-content-between flex-row">
        <button type="button" class="btn btn-danger mb-4" data-bs-toggle="modal" data-bs-target="#modalRegister">Ingresar maestros</button>
        <a href="app/core/download.php" class="btn btn-danger mb-4">Descargar información</a>
        <a href="index.php?page=asignar_materias" class="btn btn-danger mb-4">Asignar materias</a>
    </div>
    <table id="docentesTable" class="display nowrap" style="width:100%">
        <thead>
            <tr>
                <th>RFC</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Cargo</th>
                <th>Detalles</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <!-- Modal begins -->
    <div class="modal fade" id="modalRegister" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="uploader-header">
                    <h2 class="uploader-title">Subir lista</h2>
                    <h4 class="file-completed-status"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="excelDocentes">
                        <div class="col-12 mt-1 small" id="mensaje">
                        </div>
                        <div class="mb-3">
                            <label for="excel" class="form-label m-0 small">Excel</label>
                            <input type="file" class="form-control" id="hojaExcelDocentes" accept=".xlsx, .xlsm, .xltx, .xltm" required>
                        </div>
                        <div class="col-12 mt-3 mb-1">
                            <button type="submit" class="btn btn-primary btn-sm">Subir</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-sm" data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal">Registro manual</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="uploader-header">
                    <h2 class="uploader-title">Registrar maestro</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="p-4">
                    <form class="row g-3 form-docentes" id="registroForm">
                        <div class="col-12 mt-1 small" id="mensajeMaestros">
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="nombre" class="form-label m-0 small">Nombre</label>
                            <input type="text" class="form-control" id="nombre" required>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="ap_paterno" class="form-label m-0 small">Apellido paterno</label>
                            <input type="text" class="form-control" id="ap_paterno" required>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="ap_materno" class="form-label m-0 small">Apellido materno</label>
                            <input type="text" class="form-control" id="ap_materno" required>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="rfc" class="form-label m-0 small">RFC</label>
                            <input type="text" class="form-control" id="rfc" required>
                        </div>
                        <div class="col-12 mt-1">
                            <label for="email" class="form-label m-0 small">Correo electrónico <span class="text-muted">(Opcional)</span></label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="col-12 mt-1">
                            <label for="tipo_usuario" class="form-label m-0 small">Tipo de usuario</label>
                            <select id="tipo_usuario" class="form-select">
                                <?php
                                    $roles = array("Administrador", "Docente", "Tutor", "Asesor", "Alumno");
                                    foreach($roles as $rol){
                                        echo '<option value="'.$rol.'">'.$rol.'</option>';
                                    }
                                ?>
                            </select>
                        </div>
                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-primary btn-sm">Registrar</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-sm m-0" data-bs-target="#modalRegister" data-bs-toggle="modal">Subir lista</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="mostrarDocente" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="uploader-header">
                    <h2 class="uploader-title">Información</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="p-4">
                    <form class="row g-3 form-docentes" id="editarDocenteForm">
                        <div class="col-12 mt-1 small mb-0" id="mensajeEditar">
                        </div>
                        <input type="text" class="form-control" id="idEditar" hidden disabled>
                        <div class="col-md-6 mt-1">
                            <label for="nombreEditar" class="form-label m-0 small">Nombre</label>
                            <input type="text" class="form-control" id="nombreEditar" required disabled>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="ap_paternoEditar" class="form-label m-0 small">Apellido paterno</label>
                            <input type="text" class="form-control" id="ap_paternoEditar" required disabled>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="ap_maternoEditar" class="form-label m-0 small">Apellido materno</label>
                            <input type="text" class="form-control" id="ap_maternoEditar" required disabled>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="rfc" class="form-label m-0 small">RFC</label>
                            <input type="text" class="form-control" id="rfcEditar" required disabled>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="usuarioEditar" class="form-label m-0 small">Usuario</label>
                            <input type="text" class="form-control" id="usuarioEditar" required disabled>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="passwordEditar" class="form-label m-0 small">Contraseña</label>
                            <input type="text" class="form-control" id="passwordEditar" required disabled>
                        </div>
                        <div class="col-12 mt-1">
                            <label for="email" class="form-label m-0 small">Correo electrónico <span class="text-muted">(Opcional)</span></label>
                            <input type="email" class="form-control" id="emailEditar" disabled>
                        </div>
                        <div class="col-12 mt-1">
                            <label for="tipo_usuario" class="form-label m-0 small">Tipo de usuario</label>
                            <select id="tipo_usuarioEditar" class="form-select" disabled>
                                <?php
                                    $roles = array("Administrador", "Docente", "Tutor", "Asesor", "Alumno");
                                    foreach ($roles as $rol) {
                                        echo '<option value="' . $rol . '">' . $rol . '</option>';
                                    }
                                ?>
                            </select>
                        </div>
                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-primary btn-sm" id="submitEditar" disabled>Editar</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="options">
                        <button type="button" class="btn btn-warning btn-sm" id="btnEditarDocente">Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" id="btnEliminarDocente" data-bs-toggle="modal" data-bs-target="#eliminarDocente">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="eliminarDocente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="uploader-header">
                    <h2 class="uploader-title">Eliminar docente</h2>
                    <h4 class="file-completed-status"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12 mt-1 small mb-0" id="mensajeEliminar"></div>
                    <div class="mt-1">
                        ¿Estás seguro de que deseas eliminar al usuario <span id="deleteUsuario"></span>?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger btn-sm" id="confirmDeleteDocente">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal ends -->
</div>
