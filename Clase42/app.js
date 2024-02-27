function main(input) {
    let string = input.toLowerCase(); // Palabras a minuscula para satisface primer prueba
    const txtArray = string.split(" ");  // Crear array de palabras divididas por espacio
    
    const obj = {}; // inicializar obj vacio
    
    // Iterar array y en caso de existir valor en obj sumarle 1 de lo contrario, crearlo con valor 1.
    for (let i = 0; i < txtArray.length; i++) {
        if (obj[txtArray[i]]) {
            obj[txtArray[i]] += 1;
        } else {
            obj[txtArray[i]] = 1;
        }
    }
    
    // Inicializar palabra con mayor repetición
    let max = ["", 0];
    
    // iterar objeto y actualizar max en caso de mayor repetición de palabra
    for (let key in obj) {
        if (obj[key] > max[1]) {
            max = [key, obj[key]];
        }
    }
    // Formatear salida a la de la prueba
    console.log(`${max[0]},${max[1]}`);
}