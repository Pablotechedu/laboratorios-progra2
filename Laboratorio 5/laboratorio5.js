// Función que simula el envío de correo electrónico
function enviarEmail(de, para, mensaje) {
  console.log(`Enviando correo electrónico de ${de} a ${para}: ${mensaje}`);
}

class Usuario {
  constructor({ nombre, apellido, email, rol }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.rol = rol;
    this.cursos = [];
    this.historialMensajes = [];
  }

  agregarCurso(curso, nivel) {
    // Agregar nuevo curso con su nivel
    this.cursos.push({
      nombre: curso,
      nivel: nivel,
    });
  }

  eliminarCurso(curso) {
    // Eliminar curso por nombre
    this.cursos = this.cursos.filter((c) => c.nombre !== curso);
  }

  editarCurso(curso, nivel) {
    // Encontrar y actualizar el nivel de un curso existente
    const cursoAEditar = this.cursos.find((c) => c.nombre === curso);
    if (cursoAEditar) {
      cursoAEditar.nivel = nivel;
    }
  }

  enviarMensaje(de, mensaje) {
    // Almacenar mensaje en el historial
    this.historialMensajes.push({
      de: de.email,
      para: this.email,
      mensaje: mensaje,
    });

    // Simular el envío del correo electrónico
    enviarEmail(de.email, this.email, mensaje);
  }

  mostrarHistorialMensajes() {
    // Mostrar todos los mensajes en el formato requerido
    this.historialMensajes.forEach((msg) => {
      console.log(`${msg.de} -> ${msg.para}: ${msg.mensaje}`);
    });
  }
}

let estudiante1 = new Usuario({
  nombre: "Rafael",
  apellido: "Fife",
  email: "rfife@rhyta.com",
  rol: "estudiante",
});
let estudiante2 = new Usuario({
  nombre: "Kelly",
  apellido: "Estes",
  email: "k_estes@dayrep.com",
  rol: "estudiante",
});
let profesor1 = new Usuario({
  nombre: "Paula",
  apellido: "Thompkins",
  email: "PaulaThompkins@jourrapide.com",
  rol: "profesor",
});

//Se realizaron las pruebas con estas lineas de codigo:

// estudiante1.agregarCurso('matemáticas', 2);
// estudiante1.agregarCurso('física', 1);
// estudiante1.eliminarCurso('física');
// profesor1.agregarCurso('biología', 3);
// profesor1.editarCurso('biología', 4);
// console.log(`${estudiante1.nombre}: ${estudiante1.cursos.length} cursos`); // -> Rafael: 1 cursos
// console.log(`${profesor1.nombre}: ${profesor1.cursos.length} cursos`); // -> Paula: 1 cursos
// profesor1.enviarMensaje(estudiante1, 'mensaje de prueba');
// profesor1.enviarMensaje(estudiante1, 'otro mensaje');
// profesor1.mostrarHistorialMensajes();
