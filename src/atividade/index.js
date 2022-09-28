"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Classes
 */
class Pessoa {
    constructor(_pessoa) {
        this._pessoa = _pessoa;
    }
    get indexId() {
        return this._pessoa.indexId;
    }
    get endereco() {
        return this._pessoa.endereco;
    }
    get limiteCredito() {
        return this._pessoa.limiteCredito;
    }
    get dataCadastro() {
        return this._pessoa.dataCadastro;
    }
    get dataAtualizacao() {
        return this._pessoa.dataAtualizacao;
    }
    get observacoes() {
        return this._pessoa.observacoes;
    }
    set indexId(indexId) {
        this._pessoa.indexId = indexId;
    }
    set endereco(endereco) {
        this._pessoa.endereco = endereco;
    }
    set limiteCredito(limiteCredito) {
        this._pessoa.limiteCredito = limiteCredito;
    }
    set dataCadastro(dataCadastro) {
        this._pessoa.dataCadastro = dataCadastro;
    }
    set dataAtualizacao(dataAtualizacao) {
        this._pessoa.dataAtualizacao = dataAtualizacao;
    }
    set observacoes(observacoes) {
        this._pessoa.observacoes = observacoes;
    }
}
class PessoaFisica extends Pessoa {
    constructor(_pessoaFisica) {
        super(_pessoaFisica);
        this._pessoaFisica = _pessoaFisica;
    }
    ;
    get cpf() {
        return this._pessoaFisica.cpf;
    }
    get nome() {
        return this._pessoaFisica.nome;
    }
    set cpf(cpf) {
        this._pessoaFisica.cpf = cpf;
    }
    set nome(nome) {
        this._pessoaFisica.nome = nome;
    }
    pegaObjeto() {
        return this._pessoaFisica;
    }
}
class PessoaJuridica extends Pessoa {
    constructor(_pessoaJuridica) {
        super(_pessoaJuridica);
        this._pessoaJuridica = _pessoaJuridica;
    }
    ;
    get cnpj() {
        return this._pessoaJuridica.cnpj;
    }
    get razaoSocial() {
        return this._pessoaJuridica.razaoSocial;
    }
    set cnpj(cnpj) {
        this._pessoaJuridica.cnpj = cnpj;
    }
    set razaoSocial(razaoSocial) {
        this._pessoaJuridica.razaoSocial = razaoSocial;
    }
    pegaObjeto() {
        return this._pessoaJuridica;
    }
}
/**
 * Classe DAO
 */
class PessoaDAO {
    constructor() {
        this._clientes = [];
    }
    cadastrar(pessoa) {
        let objPessoa;
        pessoa.indexId = this._clientes.length;
        if ('cpf' in pessoa) {
            objPessoa = new PessoaFisica(pessoa);
        }
        else {
            objPessoa = new PessoaJuridica(pessoa);
        }
        this._clientes.push(objPessoa);
        return objPessoa.pegaObjeto();
    }
    atualizar(pessoa) {
        let objPessoa;
        if ('cpf' in pessoa) {
            objPessoa = new PessoaFisica(pessoa);
        }
        else {
            objPessoa = new PessoaJuridica(pessoa);
        }
        if (objPessoa.indexId === undefined)
            return;
        this._clientes[objPessoa.indexId] = objPessoa;
        return objPessoa.pegaObjeto();
    }
    listar() {
        let objPessoas = [];
        for (let cliente of this._clientes)
            objPessoas.push(cliente.pegaObjeto());
        return objPessoas;
    }
    excluir(indexId) {
        this._clientes.splice(indexId, 1);
    }
    buscar(cpfCnpj) {
        const cliente = this._clientes.find((obj) => {
            if ('cpf' in obj)
                return obj.cpf === cpfCnpj;
            else
                return obj.cnpj === cpfCnpj;
        });
        if (!cliente)
            return;
        return cliente.pegaObjeto();
    }
}
/**
 * Interface de usuário
 */
// @ts-ignore Desabilitado por um any implicito na lib readline
const readline = __importStar(require("readline-sync"));
const clienteDAO = new PessoaDAO;
const menuPrincipal = () => {
    let fechar = false;
    do {
        console.log("\n-------------------------------------------\n");
        console.log("Bem vindo ao nosso módulo de cadastro!");
        console.log("O que você quer fazer agora? Digite o número da opção desejada.");
        console.log("1 - Cadastrar novo cliente");
        console.log("2 - Atualizar cliente");
        console.log("3 - Buscar cliente");
        console.log("4 - Listar todos os clientes");
        console.log("5 - Apagar cliente");
        console.log("0 - Para sair do programa");
        let opcao = readline.question("Digite a sua opção: ");
        switch (opcao) {
            case "1":
                cadastraCliente();
                break;
            case "2":
                atualizaCliente();
                break;
            case "3":
                buscaCliente();
                break;
            case "4":
                listarClientes();
                break;
            case "5":
                apagaCliente();
                break;
            case "0":
                fechar = true;
        }
    } while (!fechar);
};
const cadastraCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo ao cadastro de cliente!");
    const tipo = readline.question("Qual o tipo do cliente? [pf/pj] ");
    let cliente = {};
    if (tipo == 'pf') {
        cliente.cpf = readline.question("Digite o CPF: ");
        cliente.nome = readline.question("Digite o nome: ");
    }
    else {
        cliente.cnpj = readline.question("Digite o CNPJ: ");
        cliente.razaoSocial = readline.question("Digite a razão social: ");
    }
    cliente.endereco = readline.question("Digite o endereço: ");
    cliente.limiteCredito = readline.question("Digite o limite de crédito: ");
    cliente.dataCadastro = new Date();
    cliente.dataAtualizacao = new Date();
    cliente.observacoes = readline.question("Tem alguma observação? ");
    let resultado = clienteDAO.cadastrar(cliente);
    if (resultado) {
        console.log("Cliente cadastrado com sucesso, confira os dados abaixo: ");
        console.log(resultado);
    }
    else {
        console.log("Ocorreu um erro durante o cadastro, por favor tente novamente!");
    }
};
const atualizaCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a atualização de cliente!");
    const cpfCnpj = readline.question("Qual o cpf/cnpj do cliente? ");
    let cliente = clienteDAO.buscar(cpfCnpj);
    if (!cliente) {
        console.log("Cliente não encontrado, operação cancelada!");
        return;
    }
    if ('cpf' in cliente) {
        cliente.cpf = readline.question(`Digite o CPF: [${cliente.cpf}] `);
        cliente.nome = readline.question(`Digite o nome: [${cliente.nome}] `);
    }
    else {
        cliente.cnpj = readline.question(`Digite o CNPJ: [${cliente.cnpj}] `);
        cliente.razaoSocial = readline.question(`Digite a razão social: [${cliente.razaoSocial}] `);
    }
    cliente.endereco = readline.question(`Digite o endereço: [${cliente.endereco}] `);
    cliente.limiteCredito = readline.question(`Digite o limite de crédito:: [${cliente.limiteCredito}] `);
    cliente.dataAtualizacao = new Date();
    cliente.observacoes = readline.question(`Digite o observação: [${cliente.observacoes}] `);
    let resultado = clienteDAO.atualizar(cliente);
    if (resultado) {
        console.log("Cliente atualizado com sucesso, confira os dados abaixo: ");
        console.log(resultado);
    }
    else {
        console.log("Ocorreu um erro durante o cadastro, por favor tente novamente!");
    }
};
const buscaCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a busca de cliente!");
    const cpfCnpj = readline.question("Qual o cpf/cnpj do cliente? ");
    let cliente = clienteDAO.buscar(cpfCnpj);
    if (!cliente) {
        console.log("Cliente não encontrado!");
        return;
    }
    console.log("Cliente encontrado com sucesso, confira os dados abaixo: ");
    console.log(cliente);
};
const listarClientes = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a lista de cliente!");
    console.log("Confira a lista de todos os clientes abaixo: ");
    let clientes = clienteDAO.listar();
    if (!clientes) {
        console.log("Não há clientes na base!");
        return;
    }
    console.log(clientes);
};
const apagaCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a exclusão de cliente!");
    const cpfCnpj = readline.question("Qual o cpf/cnpj do cliente? ");
    let cliente = clienteDAO.buscar(cpfCnpj);
    if (!cliente || cliente.indexId === undefined) {
        console.log("Cliente não encontrado, operação cancelada!");
        return;
    }
    clienteDAO.excluir(cliente.indexId);
    console.log("Cliente apagado com sucesso!");
};
/**
 * Inicia a execuçaõ do programa
 */
menuPrincipal();
