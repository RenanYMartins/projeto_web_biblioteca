import { executarComandoSQL } from "../database/mysql";
import { PessoaEntity } from './../model/entity/PessoaEntity';

export class PessoaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertPessoa(pessoa:PessoaEntity) :Promise<PessoaEntity>{
        const query = "INSERT INTO biblioteca.Pessoa (nome, email) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
            console.log('Pessoa inserido com sucesso, ID: ', resultado.insertId);
            pessoa.id = resultado.insertId;
            return new Promise<PessoaEntity>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err) {
            console.error('Erro ao inserir o pessoa:', err);
            throw err;
        }
    }

    async updatePessoa(pessoa:PessoaEntity) :Promise<PessoaEntity>{
        const query = "UPDATE biblioteca.pessoa set nome = ?, email = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
            console.log('Usuário atualizado com sucesso, ID: ', resultado);
            return new Promise<PessoaEntity>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletePessoa(pessoa:PessoaEntity) :Promise<PessoaEntity>{
        const query = "DELETE FROM biblioteca.pessoa where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.id]);
            console.log('Usuário deletado com sucesso: ', pessoa);
            return new Promise<PessoaEntity>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPessoaById(id: number) :Promise<PessoaEntity[]>{
        const query = "SELECT * FROM biblioteca.pessoa where id = ?" ;

        try {
            const resultado:PessoaEntity[] = await executarComandoSQL(query, [id]);
            console.log('Pessoa localizado com sucesso, ID: ', resultado);
            return new Promise<PessoaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a pessoa de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPessoaByNome(nome: string) :Promise<PessoaEntity[]>{
        const query = "SELECT * FROM biblioteca.pessoa where nome = ?" ;

        try {
            const resultado:PessoaEntity[] = await executarComandoSQL(query, [nome]);
            console.log('Usuário localizado com sucesso, ID: ', resultado);
            return new Promise<PessoaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a pessoa ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllPessoas() :Promise<PessoaEntity[]>{
        const query = "SELECT * FROM biblioteca.pessoa" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<PessoaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as pessoas gerando o erro: ${err}`);
            throw err;
        }
    }

    
}