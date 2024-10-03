/**********    Laboratorio 04  ********************
 * 
 * 
 * Complementa el objeto images de la tarea anterior con dos nuevos 
 * métodos (sin reescribir todo el objeto):

    1.    edit- que toma tres argumentos ( title, artist, y date) y 
          si encuentra una imagen con el título dado en la lista, 
          cambia sus propiedades artisty date;
    2.    delete- que toma el argumento title y si encuentra una imagen 
          con este título en la lista, la elimina 
          (para eliminar un elemento de la lista, use el método splice)
*   

    Además, agregue un método show al Imageconstructor que mostrará 
    información sobre esta imagen. No reescriba el constructor.
    Utilice prototipos para este propósito. 
    Luego, modifyel showmétodo del objeto de imágenes de modo 
    que utilice el showmétodo de imagen única recién creado para 
    mostrar la información.

    Pruebe el script llamando a la secuencia:
 */

// Paso 1: Definir el constructor Image (esto ya lo tienes del laboratorio anterior)
function Image(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

// Paso 2: Agregar el método show al prototipo de Image
Image.prototype.show = function () {
  console.log(`${this.title} (${this.artist}, ${this.date})`);
};

// Paso 3: Complementar el objeto images con los nuevos métodos
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

  // Método edit: Edita una imagen existente en la lista
  edit: function (title, artist, date) {
    const image = this.list.find((image) => image.title === title);
    if (image) {
      image.artist = artist;
      image.date = date;
      console.log(`La imagen "${title}" ha sido actualizada.`);
    } else {
      console.log(`La imagen "${title}" no se encontró en la lista.`);
    }
  },

  // Método delete: Elimina una imagen de la lista
  delete: function (title) {
    const index = this.list.findIndex((image) => image.title === title);
    if (index !== -1) {
      this.list.splice(index, 1);
      console.log(`La imagen "${title}" ha sido eliminada.`);
    } else {
      console.log(`La imagen "${title}" no se encontró en la lista.`);
    }
  },

  // Método show: Muestra todas las imágenes utilizando el método show de cada imagen
  show: function () {
    if (this.list.length === 0) {
      console.log("No hay imágenes en la lista.");
    } else {
      this.list.forEach((image) => image.show());
    }
  },

  // Método clear: Limpia la lista de imágenes
  clear: function () {
    this.list = [];
  },
};

// Paso 4: Probar el script llamando a la secuencia dada
images.add("Mona Lisa", "Leonardo da Vinci", 1503);
images.add("The Last Supper", "Leonardo da Vinci", 1495);
images.add("The Starry Night", "Vincent van Gogh", 1889);
images.edit("Mona Lisa", "Leonardo da Vinci", 1504); // Edita la Mona Lisa
images.delete("The Last Supper"); // Elimina "The Last Supper"
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1504)
// -> The Starry Night (Vincent van Gogh, 1889)
