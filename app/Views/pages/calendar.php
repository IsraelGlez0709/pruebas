<div id='calendar'></div>

<!-- Modal de Añadir/Editar -->
<div class="modal fade" id="form" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 class="modal-title" id="modal-title">Añadir Evento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <form id="myForm" enctype="multiplart/form-data">
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" id="danger-alert" style="display: none;">
                        La fecha de fin debe ser posterior a la fecha de inicio.
                    </div>
                    <div class="form-group mb-1">
                        <label class="small mb-1" for="event-title">Nombre del evento <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="event-title" placeholder="Introduce el nombre del evento" required>
                    </div>
                    <div class="form-group mb-1">
                        <label class="small mb-1" for="start-date">Fecha de inicio <span class="text-danger">*</span></label>
                        <input  type="date" class="form-control" id="start-date" required>
                    </div>
                    <div class="form-group mb-1">
                        <label class="small mb-1" for="end-date">Fecha de fin <small class="text-muted">(Opcional)</small></label>
                        <input type="date" class="form-control" id="end-date">
                    </div>
                    <div class="form-group mb-1">
                        <label for="file-info" class="small mb-1">Adjuntar archivo</label>
                        <input type="file" id="file-info" class="form-control" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png,.gif,.pdf,.zip,.rar,.7z">
                    </div>
                    <div class="form-group mb-1">
                        <label class="small mb-1" for="event-description">Descripción</label>
                        <textarea class="form-control" id="event-description" placeholder="Introduce la descripción del evento" required></textarea>
                    </div>
                    <div class="form-group mb-1">
                        <label class="small mb-1" for="event-color">Color</label>
                        <input type="color" class="form-control" id="event-color" value="#3788d8">
                    </div>
                </div>
                <div class="modal-footer border-top-0 d-flex justify-content-center pb-3 p-0">
                    <button type="submit" class="btn btn-success btn-sm px-3" id="submit-button">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal de Eliminar -->
<div class="modal fade" id="delete-modal" tabindex="-1" role="dialog" aria-labelledby="delete-modal-title"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="delete-modal-title">Confirmar Eliminación</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body text-center" id="delete-modal-body">
                ¿Estás seguro de que deseas eliminar este evento?
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancel-button">Cancelar</button>
                <button type="button" class="btn btn-danger" id="delete-button">Eliminar</button>
            </div>
        </div>
    </div>
</div>
