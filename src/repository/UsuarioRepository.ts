import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from './../model/entity/UsuarioEntity';

export class UsuarioRepository{

    private static instance: UsuarioRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance():UsuarioRepository{
        if(!UsuarioRepository.instance){
            UsuarioRepository.instance = new UsuarioRepository();
        }

        return UsuarioRepository.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa INT NOT NULL,
            senha VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertUsuario(usuario:UsuarioEntity) :Promise<UsuarioEntity>{
        const query = "INSERT INTO biblioteca.Usuario (idPessoa, senha) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
            console.log('Usuario inserido com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir o usuario:', err);
            throw err;
        }
    }

    async updateUsuario(usuario:UsuarioEntity) :Promise<UsuarioEntity>{
        const query = "UPDATE biblioteca.usuario set idPessoa = ? AND senha = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
            console.log('Usuário atualizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteUsuario(usuario:UsuarioEntity) :Promise<UsuarioEntity>{
        const query = "DELETE FROM biblioteca.usuario where id = ? AND idPessoa = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.id, usuario.idPessoa]);
            console.log('Usuário deletado com sucesso: ', usuario);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o usuário de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioById(id: number) :Promise<UsuarioEntity[]>{
        const query = "SELECT * FROM biblioteca.usuario where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Usuario localizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o usuário de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllUsuarios() :Promise<UsuarioEntity[]>{
        const query = "SELECT * FROM biblioteca.usuario" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<UsuarioEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os usuários gerando o erro: ${err}`);
            throw err;
        }
    }
}