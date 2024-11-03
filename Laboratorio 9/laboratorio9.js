class User {
  constructor({ name, surname, email, role }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.courses = [];
    this.messages = [];
  }

  addCourse(course, level) {
    this.courses.push({ course, level });
  }

  removeCourse(course) {
    this.courses = this.courses.filter((c) => c.course !== course);
  }

  editCourse(course, level) {
    const courseIndex = this.courses.findIndex((c) => c.course === course);
    if (courseIndex !== -1) {
      this.courses[courseIndex].level = level;
    } else {
      this.courses.push({ course, level });
    }
  }

  sendMessage(to, message) {
    const from = this.email;
    const messageObject = { from, to: to.email, message };
    this.messages.push(messageObject);
    sendEmail(from, to.email, message);
  }

  showMessagesHistory() {
    this.messages.forEach((msg) => {
      console.log(`${msg.from} -> ${msg.to}: ${msg.message}`);
    });
  }
}

function sendEmail(from, to, message) {
  // Simulación del envío de un correo electrónico
  console.log(`Email sent from ${from} to ${to}: ${message}`);
}

class ExtendedUser extends User {
  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  set fullName(fullName) {
    [this.name, this.surname] = fullName.split(" ");
  }

  static match(teacher, student, courseName = null) {
    if (courseName) {
      const studentCourse = student.courses.find(
        (c) => c.course === courseName
      );
      const teacherCourse = teacher.courses.find(
        (c) => c.course === courseName
      );
      if (
        studentCourse &&
        teacherCourse &&
        teacherCourse.level >= studentCourse.level
      ) {
        return { course: courseName, level: studentCourse.level };
      }
      return undefined;
    } else {
      const matches = student.courses
        .filter((studentCourse) => {
          const teacherCourse = teacher.courses.find(
            (c) => c.course === studentCourse.course
          );
          return teacherCourse && teacherCourse.level >= studentCourse.level;
        })
        .map((match) => ({ course: match.course, level: match.level }));
      return matches;
    }
  }
}

class Teacher extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "teacher" });
  }
}

class Student extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "student" });
  }
}

class Tutoring {
  constructor() {
    this.students = [];
    this.teachers = [];
  }

  getStudentByName(name, surname) {
    return this.students.find(
      (student) => student.name === name && student.surname === surname
    );
  }

  getTeacherByName(name, surname) {
    return this.teachers.find(
      (teacher) => teacher.name === name && teacher.surname === surname
    );
  }

  getStudentsForTeacher(teacher) {
    return this.students.filter(
      (student) => ExtendedUser.match(teacher, student).length > 0
    );
  }

  getTeacherForStudent(student) {
    return this.teachers.filter(
      (teacher) => ExtendedUser.match(teacher, student).length > 0
    );
  }

  addStudent(name, surname, email) {
    const student = new Student({ name, surname, email });
    this.students.push(student);
  }

  addTeacher(name, surname, email) {
    const teacher = new Teacher({ name, surname, email });
    this.teachers.push(teacher);
  }
}

class ExtendedTutoring extends Tutoring {
  sendMessages(from, to, message) {
    to.forEach((recipient) => {
      from.sendMessage(recipient, message);
    });
  }
}

let tutoring = new ExtendedTutoring();
tutoring.addStudent("Rafael", "Fife", "rfife@rhyta.com");
tutoring.addStudent("Kelly", "Estes", "k_estes@dayrep.com");
tutoring.addTeacher("Paula", "Thompkins", "PaulaThompkins@jourrapide.com");

let to = [];
to.push(tutoring.getStudentByName("Rafael", "Fife"));
to.push(tutoring.getStudentByName("Kelly", "Estes"));

tutoring.sendMessages(
  tutoring.getTeacherByName("Paula", "Thompkins"),
  to,
  "test message"
);

for (let user of to) {
  user.showMessagesHistory();
}
