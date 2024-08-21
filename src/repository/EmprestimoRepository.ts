import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";


export class EmprestimoRepository{

    private static instance: EmprestimoRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance():EmprestimoRepository{
        if(!EmprestimoRepository.instance){
            EmprestimoRepository.instance = new EmprestimoRepository();
        }

        return EmprestimoRepository.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livroId INT NOT NULL,
            usuarioId INT NOT NULL, 
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "INSERT INTO biblioteca.emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('Emprestimo inserido com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err) {
            console.error('Erro ao inserir a emprestimo:', err);
            throw err;
        }
    }

    async updateEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "UPDATE biblioteca.emprestimo set livroId = ?, usuarioId = ?, dataEmprestimo = ?, dataDevolucao = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('Emprestimo atualizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "DELETE FROM biblioteca.emprestimo where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.id]);
            console.log('Emprestimo deletado com sucesso: ', emprestimo);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimoById(id: number) :Promise<EmprestimoEntity>{
        const query = "SELECT * FROM biblioteca.emprestimo where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o emprestimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllEmprestimos() :Promise<EmprestimoEntity[]>{
        const query = "SELECT * FROM biblioteca.emprestimo" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<EmprestimoEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os emprestimos gerando o erro: ${err}`);
            throw err;
        }
    }

    
}