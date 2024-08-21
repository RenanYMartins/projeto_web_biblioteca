import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";

export class LivroRepository{

    private static instance: LivroRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance():LivroRepository{
        if(!LivroRepository.instance){
            LivroRepository.instance = new LivroRepository();
        }

        return LivroRepository.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL, 
            autor VARCHAR(255) NOT NULL, 
            categoriaId INT NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(livro:LivroEntity) :Promise<LivroEntity>{
        const query = "INSERT INTO biblioteca.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateLivro(livro:LivroEntity) :Promise<LivroEntity>{
        const query = "UPDATE biblioteca.livro set titulo = ?, autor = ?, categoriaId = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(livro:LivroEntity) :Promise<LivroEntity>{
        const query = "DELETE FROM biblioteca.livro where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log('Livro deletado com sucesso: ', livro);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar a livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroById(id: number) :Promise<LivroEntity[]>{
        const query = "SELECT * FROM biblioteca.livro where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroByNome(nome: string) :Promise<LivroEntity[]>{
        const query = "SELECT * FROM biblioteca.livro where titulo = ?" ;

        try {
            const resultado:LivroEntity[] = await executarComandoSQL(query, [nome]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroByCategory(categoriaId: number) :Promise<LivroEntity[]>{
        const query = "SELECT * FROM biblioteca.livro where categoriaId = ?" ;

        try {
            const resultado:LivroEntity[] = await executarComandoSQL(query, [categoriaId]);
            console.log('Livro localizado com sucesso, id categoria: ', resultado);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro ${categoriaId} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllLivros() :Promise<LivroEntity[]>{
        const query = "SELECT * FROM biblioteca.livro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}