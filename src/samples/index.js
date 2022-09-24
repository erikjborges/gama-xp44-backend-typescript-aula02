"use strict";
/**
 * Type assertion
 */
const valor = 123;
// valor.
console.log(`Type assertion: ${typeof valor} (${valor})`);
const valorStr = valor;
// valorStr.
console.log(`Type assertion: ${typeof valorStr} (${valorStr})`);
let valores = ['texto1', 123, true, []];
valores[0] = 123;
let valoresTuple = valores;
valoresTuple[0] = '123';
const criaSerVivo = (nome, idade) => {
    return {
        nome: nome,
        idade: idade
    };
};
const criaVegetal = (serVivo, localizacao) => {
    let vegetal = serVivo;
    vegetal.localizacao = localizacao;
    return vegetal;
};
const criaAnimal = (serVivo, peso) => {
    let animal = serVivo;
    animal.peso = peso;
    return animal;
};
let cachorro = criaSerVivo('cachorro', 1);
cachorro = criaAnimal(cachorro, 5);
console.log(typeof cachorro);
