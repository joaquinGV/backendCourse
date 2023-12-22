let cadena = '66a11b';
let resultados = cadena.match(/(\d+)([a-zA-Z]+)/g);

console.log(resultados);


resultados.forEach(function(resultado) {
    let cantidad = resultado.match(/\d+/)[0];
    let letra = resultado.match(/[a-zA-Z]+/)[0];
    console.log(cantidad + ' regalos ' + letra);
});
