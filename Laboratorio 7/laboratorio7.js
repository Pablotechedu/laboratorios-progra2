// Función simulada de envío de correo electrónico (como se menciona en los requisitos)
function enviarEmail(de, para, mensaje) {
  // Esto es solo una simulación
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

class UsuarioExtendido extends Usuario {
  constructor({ nombre, apellido, email, rol }) {
    super({ nombre, apellido, email, rol });
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  set nombreCompleto(nombreCompleto) {
    const [nombre, apellido] = nombreCompleto.split(" ");
    this.nombre = nombre;
    this.apellido = apellido;
  }

  static match(profesor, estudiante, nombreCurso = null) {
    if (
      !(profesor instanceof Profesor) ||
      !(estudiante instanceof Estudiante)
    ) {
      throw new Error(
        "Los argumentos deben ser instancias de Profesor y Estudiante"
      );
    }

    const coincidencias = profesor.cursos.filter((cursoProfesor) => {
      const cursoEstudiante = estudiante.cursos.find(
        (c) => c.nombre === cursoProfesor.nombre
      );
      return cursoEstudiante && cursoProfesor.nivel >= cursoEstudiante.nivel;
    });

    if (nombreCurso) {
      return coincidencias.find((c) => c.nombre === nombreCurso);
    }

    return coincidencias.map(({ nombre, nivel }) => ({ curso: nombre, nivel }));
  }
}

class Profesor extends UsuarioExtendido {
  constructor({ nombre, apellido, email }) {
    super({ nombre, apellido, email, rol: "profesor" });
  }
}

class Estudiante extends UsuarioExtendido {
  constructor({ nombre, apellido, email }) {
    super({ nombre, apellido, email, rol: "estudiante" });
  }
}

let estudiante1 = new Estudiante({
  nombre: "Rafael",
  apellido: "Fife",
  email: "rfife@rhyta.com",
});
let estudiante2 = new Estudiante({
  nombre: "Kelly",
  apellido: "Estes",
  email: "k_estes@dayrep.com",
});
let profesor1 = new Profesor({
  nombre: "Paula",
  apellido: "Thompkins",
  email: "PaulaThompkins@jourrapide.com",
});

// Se realizaron las pruebas con estas lineas de codigo:

// estudiante1.agregarCurso('matemáticas', 2);
// estudiante1.agregarCurso('física', 4);
// profesor1.agregarCurso('matemáticas', 4);
// let coincidencia = UsuarioExtendido.match(profesor1, estudiante1);
// console.log(coincidencia);
// profesor1.editarCurso('matemáticas', 1);
// coincidencia = UsuarioExtendido.match(profesor1, estudiante1);
// console.log(coincidencia);
// profesor1.agregarCurso('física', 4);
// coincidencia = UsuarioExtendido.match(profesor1, estudiante1, 'física');
// console.log(coincidencia);
