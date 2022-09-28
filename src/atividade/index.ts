/**
 * Interfaces de tipos
 */
interface IPessoaDTO {
    indexId?: number,
    endereco: string,
    limiteCredito: number,
    dataCadastro: Date,
    dataAtualizacao: Date,
    observacoes: string
}

interface IPessoaFisicaDTO extends IPessoaDTO {
    nome: string,
    cpf: number
}

interface IPessoaJuridicaDTO extends IPessoaDTO {
    razaoSocial: string,
    cnpj: number
}

type ClienteDTO = IPessoaFisicaDTO | IPessoaJuridicaDTO;

/**
 * Interfaces de classes
 */
interface IPessoa {
    get indexId(): number | undefined,
    get endereco(): string,
    get limiteCredito(): number,
    get dataCadastro(): Date,
    get dataAtualizacao(): Date,
    get observacoes(): string,

    set indexId(indexId: number | undefined),
    set endereco(endereco: string),
    set limiteCredito(limiteCredito: number),
    set dataCadastro(dataCadastro: Date),
    set dataAtualizacao(dataAtualizacao: Date),
    set observacoes(observacoes: string)
}

interface IPessoaFisica extends IPessoa{
    get cpf(): number,
    get nome(): string,
    set cpf(cpf: number),
    set nome(nome: string),
    pegaObjeto(): IPessoaFisicaDTO
}

interface IPessoaJuridica extends IPessoa{
    get cnpj(): number,
    get razaoSocial(): string,
    set cnpj(cnpj: number),
    set razaoSocial(razaoSocial: string),
    pegaObjeto(): IPessoaJuridicaDTO
}

/**
 * Classes
 */
abstract class Pessoa implements IPessoa {
    constructor(protected _pessoa: IPessoaDTO) {

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

    set indexId(indexId: number | undefined) {
        this._pessoa.indexId = indexId;
    }

    set endereco(endereco: string) {
        this._pessoa.endereco = endereco;
    }

    set limiteCredito(limiteCredito: number) {
        this._pessoa.limiteCredito = limiteCredito;
    }

    set dataCadastro(dataCadastro: Date) {
        this._pessoa.dataCadastro = dataCadastro;
    }

    set dataAtualizacao(dataAtualizacao: Date) {
        this._pessoa.dataAtualizacao = dataAtualizacao;
    }

    set observacoes(observacoes: string) {
        this._pessoa.observacoes = observacoes;
    }
}

class PessoaFisica extends Pessoa implements IPessoaFisica{
    constructor(private _pessoaFisica: IPessoaFisicaDTO) {
        super(_pessoaFisica);
    };

    get cpf() {
        return this._pessoaFisica.cpf;
    }

    get nome() {
        return this._pessoaFisica.nome;
    }

    set cpf(cpf: number) {
        this._pessoaFisica.cpf = cpf;
    }

    set nome(nome: string) {
        this._pessoaFisica.nome = nome;
    }

    pegaObjeto(): IPessoaFisicaDTO{
        return this._pessoaFisica;
    }
}

class PessoaJuridica extends Pessoa implements IPessoaJuridica{
    constructor(private _pessoaJuridica: IPessoaJuridicaDTO) {
        super(_pessoaJuridica);
    };

    get cnpj() {
        return this._pessoaJuridica.cnpj;
    }

    get razaoSocial() {
        return this._pessoaJuridica.razaoSocial;
    }

    set cnpj(cnpj: number) {
        this._pessoaJuridica.cnpj = cnpj;
    }

    set razaoSocial(razaoSocial: string) {
        this._pessoaJuridica.razaoSocial = razaoSocial;
    }

    pegaObjeto(): IPessoaJuridicaDTO{
        return this._pessoaJuridica;
    }
}

type Cliente = PessoaJuridica | PessoaFisica;

/**
 * Interface DAO
 */
interface IPessoaDAO {
    cadastrar(pessoa: ClienteDTO): ClienteDTO;
    atualizar(pessoa: ClienteDTO): ClienteDTO | undefined;
    listar(): (ClienteDTO)[];
    excluir(indexId: number): void;
    buscar(cpfCnpj: number): ClienteDTO | undefined;
}

/**
 * Classe DAO
 */
class PessoaDAO implements IPessoaDAO{
    private _clientes: Cliente[];

    constructor(){
        this._clientes = [];
    }

    cadastrar(pessoa: ClienteDTO): ClienteDTO {
        let objPessoa;
        
        pessoa.indexId = this._clientes.length;
        
        if('cpf' in pessoa) {
            objPessoa = new PessoaFisica(pessoa);
        } else {
            objPessoa = new PessoaJuridica(pessoa);
        }
        
        this._clientes.push(objPessoa);

        return objPessoa.pegaObjeto();
    }

    atualizar(pessoa: ClienteDTO): ClienteDTO | undefined {
        let objPessoa;
        
        if('cpf' in pessoa) {
            objPessoa = new PessoaFisica(pessoa);
        } else {
            objPessoa = new PessoaJuridica(pessoa);
        }

        if(objPessoa.indexId === undefined)
            return;
        
        this._clientes[objPessoa.indexId] = objPessoa;

        return objPessoa.pegaObjeto();
    }

    listar(): (ClienteDTO)[] {
        let objPessoas: (ClienteDTO)[] = [];

        for(let cliente of this._clientes)
            objPessoas.push(cliente.pegaObjeto())

        return objPessoas;
    }

    excluir(indexId: number): void {
        this._clientes.splice(indexId, 1);
    }

    buscar(cpfCnpj: number): ClienteDTO | undefined {

        const cliente = this._clientes.find((obj: PessoaFisica | PessoaJuridica) => {
            if('cpf' in obj)
                return obj.cpf === cpfCnpj;
            else   
                return obj.cnpj === cpfCnpj;
        });

        if(!cliente)
            return;

        return cliente.pegaObjeto();
    }
}

/**
 * Interface de usuário
 */
// @ts-ignore Desabilitado por um any implicito na lib readline
 import * as readline from 'readline-sync';

const clienteDAO = new PessoaDAO;

const menuPrincipal = () => {
    let fechar = false;

    do{
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
    
        switch(opcao) {
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
    }while(!fechar);
}

const cadastraCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo ao cadastro de cliente!");
    const tipo = readline.question("Qual o tipo do cliente? [pf/pj] ");
    let cliente: any = {};

    if(tipo == 'pf'){
        cliente.cpf = readline.question("Digite o CPF: ");
        cliente.nome = readline.question("Digite o nome: ");
    } else {
        cliente.cnpj = readline.question("Digite o CNPJ: ");
        cliente.razaoSocial = readline.question("Digite a razão social: ");
    }

    cliente.endereco = readline.question("Digite o endereço: ");
    cliente.limiteCredito = readline.question("Digite o limite de crédito: ");
    cliente.dataCadastro = new Date();
    cliente.dataAtualizacao = new Date();
    cliente.observacoes = readline.question("Tem alguma observação? ");

    let resultado = clienteDAO.cadastrar(cliente);

    if(resultado){
        console.log("Cliente cadastrado com sucesso, confira os dados abaixo: ");
        console.log(resultado);
    } else {
        console.log("Ocorreu um erro durante o cadastro, por favor tente novamente!");
    }
}

const atualizaCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a atualização de cliente!");
    const cpfCnpj = readline.question("Qual o cpf/cnpj do cliente? ");

    let cliente = clienteDAO.buscar(cpfCnpj);

    if(!cliente){
        console.log("Cliente não encontrado, operação cancelada!");
        return;
    }

    if('cpf' in cliente){
        cliente.cpf = readline.question(`Digite o CPF: [${cliente.cpf}] `);
        cliente.nome = readline.question(`Digite o nome: [${cliente.nome}] `);
    } else {
        cliente.cnpj = readline.question(`Digite o CNPJ: [${cliente.cnpj}] `);
        cliente.razaoSocial = readline.question(`Digite a razão social: [${cliente.razaoSocial}] `);
    }

    cliente.endereco = readline.question(`Digite o endereço: [${cliente.endereco}] `);
    cliente.limiteCredito = readline.question(`Digite o limite de crédito:: [${cliente.limiteCredito}] `);
    cliente.dataAtualizacao = new Date();
    cliente.observacoes = readline.question(`Digite o observação: [${cliente.observacoes}] `);

    let resultado = clienteDAO.atualizar(cliente);

    if(resultado){
        console.log("Cliente atualizado com sucesso, confira os dados abaixo: ");
        console.log(resultado);
    } else {
        console.log("Ocorreu um erro durante o cadastro, por favor tente novamente!");
    }
}

const buscaCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a busca de cliente!");
    const cpfCnpj = readline.question("Qual o cpf/cnpj do cliente? ");
    
    let cliente = clienteDAO.buscar(cpfCnpj);

    if(!cliente){
        console.log("Cliente não encontrado!");
        return;
    }

    console.log("Cliente encontrado com sucesso, confira os dados abaixo: ");
    console.log(cliente);
}

const listarClientes = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a lista de cliente!");
    console.log("Confira a lista de todos os clientes abaixo: ");
    
    let clientes = clienteDAO.listar();

    if(!clientes){
        console.log("Não há clientes na base!");
        return;
    }

    console.log(clientes);
}

const apagaCliente = () => {
    console.log("\n-------------------------------------------\n");
    console.log("Bem vindo a exclusão de cliente!");
    const cpfCnpj = readline.question("Qual o cpf/cnpj do cliente? ");
    
    let cliente = clienteDAO.buscar(cpfCnpj);

    if(!cliente || cliente.indexId === undefined){
        console.log("Cliente não encontrado, operação cancelada!");
        return;
    }

    clienteDAO.excluir(cliente.indexId);

    console.log("Cliente apagado com sucesso!");
}

/**
 * Inicia a execuçaõ do programa
 */
menuPrincipal();