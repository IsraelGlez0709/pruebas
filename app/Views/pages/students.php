<div class="container-fluid">
    <button type="button" class="btn btn-danger mb-4" data-bs-toggle="modal" data-bs-target="#modalRegister">Ingresar alumnos</button>
    <table id="studentsTable" class="display nowrap" style="width:100%">
        <thead>
            <tr>
                <th>No. de Control</th>
                <th>Nombre</th>
                <th>Semestre</th>
                <th>Grupo</th>
                <th>Turno</th>
                <th>Especialidad</th>
                <th>Situación</th>
                <th>Calificaciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1921056789</td>
                <td>Juan Pérez</td>
                <td>3</td>
                <td>3A</td>
                <td>Vespertino</td>
                <td>Construcción</td>
                <td>Aprobado</td>
                <td>9</td>
            </tr>
            <tr>
                <td>1921054321</td>
                <td>Maria González</td>
                <td>2</td>
                <td>2B</td>
                <td>Matutino</td>
                <td>Programación</td>
                <td>Aprobado</td>
                <td>7</td>
            </tr>
            <tr class="bg-danger text-white">
                <td>1921059876</td>
                <td>Luis Ramirez</td>
                <td>4</td>
                <td>4C</td>
                <td>Matutino</td>
                <td>Alimentos</td>
                <td>Reprobado</td>
                <td>4</td>
            </tr>
            <tr>
                <td>1921052468</td>
                <td>Ana López</td>
                <td>5</td>
                <td>5D</td>
                <td>Vespertino</td>
                <td>Logistica</td>
                <td>Aprobado</td>
                <td>8</td>
            </tr>
            <tr class="bg-danger text-white">
                <td>1921058642</td>
                <td>Pablo Martinez</td>
                <td>2</td>
                <td>2A</td>
                <td>Matutino</td>
                <td>Construcción</td>
                <td>Reprobado</td>
                <td>5</td>
            </tr>
            <tr>
                <td>1921057391</td>
                <td>Sofia Rodriguez</td>
                <td>3</td>
                <td>3C</td>
                <td>Vespertino</td>
                <td>Logistica</td>
                <td>Aprobado</td>
                <td>7</td>
            </tr>
            <tr class="bg-danger text-white">
                <td>1921055678</td>
                <td>Ricardo Martinez</td>
                <td>4</td>
                <td>4C</td>
                <td>Matutino</td>
                <td>Construcción</td>
                <td>Reprobado</td>
                <td>5</td>
            </tr>
            <tr>
                <td>1921056789</td>
                <td>María Torres</td>
                <td>2</td>
                <td>2B</td>
                <td>Vespertino</td>
                <td>Alimentos</td>
                <td>Aprobado</td>
                <td>7</td>
            </tr>
            <tr>
                <td>1921057890</td>
                <td>José García</td>
                <td>3</td>
                <td>3A</td>
                <td>Matutino</td>
                <td>Programación</td>
                <td>Aprobado</td>
                <td>8</td>
            </tr>
            <tr class="bg-warning text-dark">
                <td>1921058901</td>
                <td>Paola Ramírez</td>
                <td>5</td>
                <td>5D</td>
                <td>Vespertino</td>
                <td>Logistica</td>
                <td>Reprobado</td>
                <td>6</td>
            </tr>
            <tr>
                <td>1921059012</td>
                <td>Juanita Pérez</td>
                <td>2</td>
                <td>2A</td>
                <td>Matutino</td>
                <td>Programación</td>
                <td>Aprobado</td>
                <td>9</td>
            </tr>
            <tr>
                <td>1921051234</td>
                <td>Roberto Sánchez</td>
                <td>4</td>
                <td>4B</td>
                <td>Vespertino</td>
                <td>Elctrónica</td>
                <td>Aprobado</td>
                <td>8</td>
            </tr>
            <tr class="bg-danger text-white">
                <td>1921052345</td>
                <td>Sofía González</td>
                <td>3</td>
                <td>3C</td>
                <td>Matutino</td>
                <td>Construcción</td>
                <td>Reprobado</td>
                <td>4</td>
            </tr>
            <tr>
                <td>1921053456</td>
                <td>Luis Martínez</td>
                <td>5</td>
                <td>2D</td>
                <td>Vespertino</td>
                <td>Alimentos</td>
                <td>Aprobado</td>
                <td>7</td>
            </tr>
            <tr class="bg-danger text-white">
                <td>1921054567</td>
                <td>Ana Rodríguez</td>
                <td>2</td>
                <td>2D</td>
                <td>Matutino</td>
                <td>Alimentos</td>
                <td>Reprobado</td>
                <td>5</td>
            </tr>
            <tr>
                <td>1921055678</td>
                <td>Carlos Fernández</td>
                <td>4</td>
                <td>4C</td>
                <td>Vespertino</td>
                <td>Programación</td>
                <td>Aprobado</td>
                <td>9</td>
            </tr>
        </tbody>
    </table>
    <!-- Modal begins -->
    <div class="modal fade" id="modalRegister" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="uploader-header">
                    <h2 class="uploader-title">Registrar alumnos</h2>
                    <h4 class="file-completed-status"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <ul class="file-list">

                </ul>
                <div class="file-upload-box">
                    <h2 class="box-title">
                        <span class="file-instruction">Arrastra el archivo aquí ó</span>
                        <span class="file-browse-button">selecciónalo</span>
                    </h2>
                    <input class="file-browse-input" type="file" multiple hidden accept=".xlsx, .xlsm, .xltx, .xltm">
                </div>
            </div>
        </div>
    </div>
    <!-- Modal ends -->
</div>
