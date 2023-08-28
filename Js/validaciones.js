export function valida (input) {
    const tipoDeInput = input.dataset.tipo
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    console.log (input.parentElement);

    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add ("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError (tipoDeInput, input);
    }

}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];
const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Debe tener mínimo 6 caracteres y máximo 12, contener una mayúscula, una minúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debe tener al menos 18 años"

    },
    numero: {
        valueMissing: "El campo teléfono no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXX 10 números"

    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe tener entre 10 y 40 caracteres"

    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe tener entre 3 y 10 caracteres"

    },
    estado: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "Estado debe tener entre 3 y 10 caracteres"

    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity [error]){
            console.log(tipoDeInput,error);
            console.log (input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años para registrarte.";
    }
    
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());

    return(diferenciaFechas <= fechaActual);
}