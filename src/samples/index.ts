/**
 * Type assertion
 */
const valor: any = 123;
// valor.
console.log(`Type assertion: ${typeof valor} (${valor})`);
const valorStr = (valor as string);
// valorStr.
console.log(`Type assertion: ${typeof valorStr} (${valorStr})`);

let valores = ['texto1', 123, true, []];
valores[0] = 123;
let valoresTuple = (valores as [string, number, boolean, never[]]);
valoresTuple[0] = '123';

/**
 * Interfaces
 */

interface Localizacao {
    latitude: number,
    longitude: number
}

interface SerVivo {
    nome: string
}

interface SerVivo {
    idade: number
}

interface Vegetal extends SerVivo {
    localizacao: Localizacao
}

interface Animal extends SerVivo {
    peso: number
}

const criaSerVivo = (nome: string, idade: number): SerVivo => {
    return {
        nome: nome,
        idade: idade,
        morre: () => {}
    };
}

const criaVegetal = (serVivo: SerVivo, localizacao: Localizacao): Vegetal => {
    let vegetal = (serVivo as Vegetal);
    vegetal.localizacao = localizacao;

    return vegetal;
}

const criaAnimal = (serVivo: SerVivo, peso: number): Animal => {
    let animal = (serVivo as Animal);
    animal.peso = peso;

    return animal;
}

let cachorro = criaSerVivo('cachorro', 1);
cachorro = criaAnimal(cachorro, 5) as Animal;
console.log(typeof cachorro);

let margarida = criaSerVivo('margarida', 1);
margarida = criaVegetal(margarida, { latitude: 19.000, longitude: 43.000 }) as Vegetal;
console.log(typeof margarida);

/**
 * Classes
 */
interface SerVivo{
    dtObito?: Date;
    morre(data: Date): void;
}

class Ser implements SerVivo {
    nome: string;
    idade: number;
    dtObito?: Date;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    morre(data: Date): void {
        this.dtObito = data;
    }
}

// const ser = new Ser('batata', 12);
// ser.morre(new Date());

// class SerAnimal implements Animal {
//     nome: string;
//     idade: number;
//     dtObito?: Date;
//     peso: number;

//     constructor(serVivo: SerVivo, peso: number){
//         this.nome = serVivo.nome;
//         this.idade = serVivo.idade;
//         this.peso = peso;
//     }

//     morre(data: Date): void {
//         this.dtObito = data;
//     }
// }

// class SerVegetal implements Vegetal {
//     nome: string;
//     idade: number;
//     dtObito?: Date;
//     localizacao: Localizacao;

//     constructor(serVivo: SerVivo, localizacao: Localizacao){
//         this.nome = serVivo.nome;
//         this.idade = serVivo.idade;
//         this.localizacao = localizacao;
//     }

//     morre(data: Date): void {
//         this.dtObito = data;
//     }
// }

// const serGato = new Ser('gato', 1);
// const gato = new SerAnimal(serGato, 5);

// const serRosa = new Ser('rosa', 1);
// const rosa = new SerVegetal(serRosa, { latitude: 19, longitude: 43.000 });

// gato.morre(new Date());
// rosa.morre(new Date());

// console.log(gato);
// console.log(rosa);

/**
 * Herança
 */
class SerAnimal1 extends Ser implements Animal {
    peso: number;

    constructor(nome: string, idade: number, peso: number) {
        super(nome, idade);
        this.peso = peso;
    }
}

class SerVegetal1 extends Ser implements Vegetal {
    localizacao: Localizacao;

    constructor(nome: string, idade: number, localizacao: Localizacao) {
        super(nome, idade);
        this.localizacao = localizacao;
    }
}

const galinha = new SerAnimal1('galinha', 1, 2);
const camara = new SerVegetal1('camara', 2, { latitude: 19.000, longitude: 43.000 });

galinha.morre(new Date());
camara.morre(new Date());

console.log(galinha);
console.log(camara);

/**
 * Modificadores de acesso
 */
interface SerVivo2{
    morre(data: Date): void
}

interface Vegetal2 extends SerVivo2 {
    localizacao: Localizacao
}

interface Animal2 extends SerVivo2 {
    peso: number
}

class Ser2 implements SerVivo2 {
    private nome: string;
    dtObito?: Date;

    constructor(nome: string, protected idade: number){
        this.nome = nome;
    }

    morre(data: Date): void {
        this.dtObito = data;
    }

    mudaNome(nome: string){
        this.nome = nome;
    }
}

class SerAnimal2 extends Ser2 implements Animal2 {
    peso: number;

    constructor(nome: string, idade: number, peso: number){
        super(nome, idade);
        this.peso = peso;
    }
}

class SerVegetal2 extends Ser2 implements Vegetal2 {
    localizacao: Localizacao;

    constructor(nome: string, idade: number, localizacao: Localizacao){
        super(nome, idade);
        this.localizacao = localizacao;
    }
}

const zebra = new SerAnimal2('zebra', 10, 200);
const mangueira = new SerVegetal2('mangueira', 20, { latitude: 19.000, longitude: 43.000 });

zebra.mudaNome('cavalo'); 

zebra.morre(new Date());
mangueira.morre(new Date());

console.log(zebra);
console.log(mangueira);

