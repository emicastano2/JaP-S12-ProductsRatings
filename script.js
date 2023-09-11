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

