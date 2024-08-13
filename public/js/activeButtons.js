document.addEventListener("DOMContentLoaded", function () {
    const activarPeriodoBtn = document.getElementById("activarPeriodo");
    const activarCarreraBtn = document.getElementById("activarCarrera");

    activarPeriodoBtn.addEventListener("click", function () {
        const periodoInput = document.getElementById("periodo");
        periodoInput.disabled = !periodoInput.disabled;
        activarPeriodoBtn.textContent = periodoInput.disabled
            ? "Activar"
            : "Desactivar";
        const buttonRegistrarPeriodo = document.getElementById("registrarPeriodo");
        buttonRegistrarPeriodo.disabled = !buttonRegistrarPeriodo.disabled;
    });

    activarCarreraBtn.addEventListener("click", function () {
        const carrerasInput = document.getElementById("carrera");
        carrerasInput.disabled = !carrerasInput.disabled;
        const grupoInput = document.getElementById("grupo1");
        grupoInput.disabled = !grupoInput.disabled;
        const addGrupo = document.getElementById("agregarGrupo");
        addGrupo.disabled = !addGrupo.disabled;
        activarCarreraBtn.textContent = carrerasInput.disabled ? "Activar" : "Desactivar";
        const buttonRegistrarCarrera = document.getElementById("registrarCarrera");
        buttonRegistrarCarrera.disabled = !buttonRegistrarCarrera.disabled;

        if (grupoInput.disabled) {
            const grupos = document.querySelectorAll(".grupo-input");
            grupos.forEach((grupo) => grupo.remove());
        }
    });

    const agregarGrupoBtn = document.getElementById("agregarGrupo");
    const carrerasContainer = document.getElementById("carrerasContainer");

    agregarGrupoBtn.addEventListener("click", function () {
        const nuevoGrupoInput = document.createElement("div");
        nuevoGrupoInput.classList.add("form-group", "mb-3", "grupo-input");

        const label = document.createElement("label");
        label.setAttribute("for", `grupo-${carrerasContainer.children.length}`);
        label.classList.add("form-label", "m-0");
        label.textContent = "Grupo";

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", `grupo${carrerasContainer.children.length}`);
        input.setAttribute("name", `grupos[]`);
        input.setAttribute("maxlength", "1");
        input.classList.add("form-control");

        nuevoGrupoInput.appendChild(label);
        nuevoGrupoInput.appendChild(input);

        carrerasContainer.appendChild(nuevoGrupoInput);
    });
});
