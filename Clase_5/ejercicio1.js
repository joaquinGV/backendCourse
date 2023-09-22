//Generar 10000 numeros aleatorios del 1 al 20

let objResultado = {};

for (let i = 0; i < 10000; i++) {
    const randomNumber = Math.round(Math.random()*20);

    if(objResultado[randomNumber]){
        objResultado[randomNumber] += 1;
    } else {
        objResultado[randomNumber] = 1;
    }
}

console.log(objResultado);

let max = Math.max(objResultado);
let index = Object.keys()
console.log(index);

