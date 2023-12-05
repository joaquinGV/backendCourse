process.on("exit", code => {
    console.log(code)
})

process.on("uncaughtException", err => {
    console.log("Este evento atraba excepciones que no fueron controladas.");
    console.log(err)
})

process.on("message", )

console.log("progando listeners");
console.log(variable)