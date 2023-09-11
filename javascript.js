// Definimos la URL de la API que proporciona los productos
const URL = 'https://fakestoreapi.com/products';

// Creamos un arreglo vacío para almacenar los productos
let products = [];

// Esperamos a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function (e) {
    // Llamamos a la función fetchData para obtener los datos de la API
    fetchData(URL);
    // Llamamos a la función showProducts para mostrar los productos en la página
    showProducts();
});

// Función asincrónica para obtener los datos de la API
async function fetchData(url) {
    try {
        // Realizamos una solicitud fetch a la URL
        const response = await fetch(url);
        // Parseamos la respuesta como JSON
        const data = await response.json();
        // Almacenamos los datos en el arreglo 'products'
        products = data;
        // Llamamos a la función displayProducts para mostrar los productos en la página
        displayProducts();
    } catch (error) {
        // En caso de error, mostramos un mensaje en la consola
        console.error('Error al obtener los datos:', error);
    }
}

// Función para mostrar los productos en la página
function displayProducts() {
    // Obtenemos el elemento HTML con el id "products" donde mostraremos los productos
    const productsList = document.getElementById("products");

    // Limpiamos cualquier contenido existente en el elemento
    productsList.innerHTML = "";

    // Ordenamos los productos por nombre utilizando el método sort()
    products.sort((a, b) => a.title.localeCompare(b.title));

    // Iteramos a través de los productos y creamos elementos HTML para cada uno
    products.forEach((product) => {
        // Creamos un nuevo elemento <div> para cada producto
        const listItem = document.createElement("div");

        // Establecemos la clase del elemento para aplicar estilos de Bootstrap
        listItem.className = "list-group-item";

        // Creamos el contenido HTML para el producto utilizando literales de plantilla
        listItem.innerHTML = `
            <h3>${cutString(product.title, 20)}</h3> <!-- Mostramos el título del producto (acortado a 20 caracteres) -->
            <p>Clasificación: ${stars(product.rating.rate)}</p> <!-- Mostramos la clasificación en forma de estrellas -->
            <p>Fecha y hora de obtención: ${getCurrentDateTime()}</p> <!-- Mostramos la fecha y hora actual -->
        `;

        // Agregamos el elemento <div> creado a la lista de productos
        productsList.appendChild(listItem);
    });
}

// Función para representar la clasificación en formato de estrellas
function stars(cantidad) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(cantidad)) {
            starsHTML += '<span class="fa fa-star checked"></span>';
        } else {
            starsHTML += '<span class="fa fa-star"></span>';
        }
    }
    return starsHTML;
}

// Función para acortar una cadena de texto a una longitud máxima
function cutString(string, maxLength) {
    if (string.length > maxLength) {
        return string.slice(0, maxLength) + "...";
    }
    return string;
}

// Función para obtener la fecha y hora actual en formato legible
function getCurrentDateTime() {
    const currentDate = new Date();
    return currentDate.toLocaleString();
}
