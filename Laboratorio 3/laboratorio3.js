// Paso 1: Definir el constructor Image
function Image(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

// Paso 2: Crear el objeto images con las propiedades y métodos especificados
let images = {
  list: [],
  // Método contains: Verifica si una imagen ya está en la lista
  contains: function (title) {
    return this.list.some((image) => image.title === title);
  },

  // Método add: Agrega una nueva imagen si no está en la lista
  add: function (title, artist, date) {
    if (!this.contains(title)) {
      this.list.push(new Image(title, artist, date));
    } else {
      console.log(`La imagen "${title}" ya está en la lista.`);
    }
  },

  // Método show: Muestra todas las imágenes en la consola
  show: function () {
    if (this.list.length === 0) {
      console.log("No hay imágenes en la lista.");
    } else {
      this.list.forEach((image) => {
        console.log(`${image.title} (${image.artist}, ${image.date})`);
      });
    }
  },

  // Método clear: Limpia la lista de imágenes
  clear: function () {
    this.list = [];
  },
};

// Paso 3: Probar el script llamando a la secuencia dada
images.add("Mona Lisa", "Leonardo da Vinci", 1503);
images.add("The Last Supper", "Leonardo da Vinci", 1495);
images.add("The Starry Night", "Vincent van Gogh", 1889);
images.add("Mona Lisa", "Leonardo da Vinci", 1503); // No se debería agregar de nuevo
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1503)
// -> The Last Supper (Leonardo da Vinci, 1495)
// -> The Starry Night (Vincent van Gogh, 1889)
images.clear();
images.show(); // -> No hay imágenes en la lista.
