// Clase base Usuario
class Usuario {
  constructor({ nombre, apellido, email, rol }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.rol = rol;
    this.cursos = [];
  }

  agregarCurso(curso, nivel) {
    this.cursos.push({ nombre: curso, nivel: nivel });
  }

  eliminarCurso(curso) {
    this.cursos = this.cursos.filter((c) => c.nombre !== curso);
  }

  editarCurso(curso, nivel) {
    const cursoAEditar = this.cursos.find((c) => c.nombre === curso);
    if (cursoAEditar) {
      cursoAEditar.nivel = nivel;
    }
  }
}

// Clase UsuarioExtendido
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

// Clase Profesor
class Profesor extends UsuarioExtendido {
  constructor({ nombre, apellido, email }) {
    super({ nombre, apellido, email, rol: "profesor" });
  }
}

// Clase Estudiante
class Estudiante extends UsuarioExtendido {
  constructor({ nombre, apellido, email }) {
    super({ nombre, apellido, email, rol: "estudiante" });
  }
}

// Clase Tutoria
class Tutoria {
  constructor() {
    this.estudiantes = [];
    this.profesores = [];
  }

  getEstudiantePorNombre(nombre, apellido) {
    return this.estudiantes.find(
      (e) => e.nombre === nombre && e.apellido === apellido
    );
  }

  getProfesorPorNombre(nombre, apellido) {
    return this.profesores.find(
      (p) => p.nombre === nombre && p.apellido === apellido
    );
  }

  getEstudiantesParaProfesor(profesor) {
    return this.estudiantes.filter((estudiante) => {
      const coincidencias = UsuarioExtendido.match(profesor, estudiante);
      return coincidencias.length > 0;
    });
  }

  getProfesoresParaEstudiante(estudiante) {
    return this.profesores.filter((profesor) => {
      const coincidencias = UsuarioExtendido.match(profesor, estudiante);
      return coincidencias.length > 0;
    });
  }

  agregarEstudiante(nombre, apellido, email) {
    const nuevoEstudiante = new Estudiante({ nombre, apellido, email });
    this.estudiantes.push(nuevoEstudiante);
    return nuevoEstudiante;
  }

  agregarProfesor(nombre, apellido, email) {
    const nuevoProfesor = new Profesor({ nombre, apellido, email });
    this.profesores.push(nuevoProfesor);
    return nuevoProfesor;
  }
}

let tutoria = new Tutoria();
tutoria.agregarEstudiante("Rafael", "Fife", "rfife@rhyta.com");
tutoria.agregarEstudiante("Kelly", "Estes", "k_estes@dayrep.com");
tutoria.agregarProfesor("Paula", "Thompkins", "PaulaThompkins@jourrapide.com");

let estudiante = tutoria.getEstudiantePorNombre("Rafael", "Fife");
estudiante.agregarCurso("matemáticas", 2);
estudiante.agregarCurso("física", 4);

let profesor = tutoria.getProfesorPorNombre("Paula", "Thompkins");
profesor.agregarCurso("matemáticas", 4);

let profesores = tutoria.getProfesoresParaEstudiante(estudiante);
let estudiantes = tutoria.getEstudiantesParaProfesor(profesor);

console.log(profesores[0]);
console.log(estudiantes[0]);

estudiante = tutoria.getEstudiantePorNombre("Kelly", "Estes");
profesores = tutoria.getProfesoresParaEstudiante(estudiante);
estudiantes = tutoria.getEstudiantesParaProfesor(profesor);

console.log(profesores[0]);
console.log(estudiantes[0]);
