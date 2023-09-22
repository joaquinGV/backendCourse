const { error } = require('console');
const fs = require('fs');

fs.writeFile("./archivo-cb.txt", "Hola mundo estoy trabajando archivos usando Callbacks",
error =>{
    if(error){
        throw new Error("Error en la creacion del archivo");
    }

    fs.readFile("./archivo-cb.txt","utf-8",(error,contenido ) =>{
        if(error){
            throw new Error(`Error en la lectura del archivo ${error}`)
        }

        console.log(contenido);
        fs.appendFile("./archivo-cb.txt", "\n Ya me estoy perdiendo en el texto", error =>{
            if(error){
                throw new Error(`Error en la lectura del archivo ${error}`)
            }
            console.log(contenido);

            fs.unlink("./archivos-cb.txt", error =>{
                if(error){
                    throw new Error(`Error en la eliminacion del archivo ${error}`)
                }
            })
        })
    })
});