<div class="container-fluid">
    <form class="mb-3" id="excelConfig" enctype="multipart/form-data">
        <div class="col-12 mt-1 small" id="mensajeConfig"></div>
        <label for="hojaExcelConfig" class="form-label m-0">Subir archivo</label>
        <p class="m-0 text-danger">El archivo debe contener los siguientes datos: Periodo, Carreras, Semestre y Grupos.</p>
        <input type="file" class="form-control" id="hojaExcelConfig" name="hojaExcelConfig" accept=".xlsx, .xlsm">
        <div class="progress mt-3">
            <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
        </div>
        <div class="d-flex mt-3">
            <button type="submit" class="btn btn-primary ms-auto mx-2">Cargar datos</button>
            <button type="button" class="btn btn-secondary" onclick="resetForm()">Activar</button>
        </div>
    </form>
</div>
