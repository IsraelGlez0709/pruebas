<div class="container-fluid">
    <!-- Calendar begins -->
    <div class="row mb-3">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title fw-bold m-0">Actividades de hoy</h5>
                        <span id="current-month" class="text-muted fs-5 fw-bold" style="font-size: 14px;"></span>
                    </div>
                    <p class="card-text m-0" style="font-size: 14px;" id="activity-count">Cargando actividades...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button id="prev-days" class="btn">&lt;</button>
                        <div id="calendarMain" class="calendar d-flex justify-content-between align-items-center"></div>
                        <button id="next-days" class="btn">&gt;</button>
                    </div>
                    <div id="schedule" class="schedule mt-3"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Calendar ends -->
    <div class="row mb-3">
        <div class="col-sm-6 mb-3">
            <div class="card card-upload h-100" data-bs-toggle="modal" data-bs-target="#modalImages">
                <div class="card-body d-flex justify-content-center align-items-center flex-column">
                    <div class="box-icon">
                        <i class="fa-duotone fa-images"></i>
                    </div>
                    <div class="text-secondary text-center mt-1">Subir una imagen.</div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3" id="imageContainer"></div>
    <!-- Modal begins -->
    <div class="modal fade" id="modalImages" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="uploader-header">
                    <h2 class="uploader-title">Subir imagen</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="p-4">
                    <form class="row g-3 form-docentes" id="subirImagen" enctype="multipart/form-data">
                        <div class="col-12 mt-1 small" id="mensaje">
                        </div>
                        <div class="col-12 mt-1">
                            <label for="formFile" class="form-label m-0 small">Seleccione una imagen</label>
                            <input class="form-control" type="file" id="fileImage" accept=".png, .jpg, .jpeg">
                        </div>
                        <div class="col-12 mt-1">
                            <label for="ap_paterno" class="form-label m-0 small">Descripción</label>
                            <textarea id="descripcion" class="form-control small" maxlength="150" required></textarea>
                        </div>
                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-primary btn-sm">Subir</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal ends -->

    <!-- <div class="row g-6 g-xl-9">
        <div class="col-md-6 col-xxl-4 mb-3">
            <div class="card text-white h-100">
                <div class="card-header text-dark">Gráfica</div>
                <div class="card-body d-flex justify-content-center">
                    <div class="chart">
                        <canvas id="doughnut" width="300" height="300"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xxl-4 mb-3">
            <div class="card text-white h-100">
                <div class="card-header text-dark">Estadística</div>
                <div class="card-body d-flex justify-content-center">
                    <div class="chart">
                        <canvas id="bart" width="300" height="300"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xxl-4 mb-3">
            <div class="card text-white h-100">
                <div class="card-header text-dark">Calificaciones</div>
                <div class="card-body">
                    <h5 class="card-title text-dark">Primary card title</h5>
                    <p class="card-text text-dark">Some quick example text to build on the card title and make up the
                        bulk
                        of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div> -->
</div>
