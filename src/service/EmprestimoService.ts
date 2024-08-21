import { LivroRepository } from './../repository/LivroRepository';
import { UsuarioRepository } from './../repository/UsuarioRepository';
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class EmprestimoService{

    emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();
    usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();
    livroRepository: LivroRepository = LivroRepository.getInstance();

    async cadastrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        
        const emprestimo = new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        const usuario = await this.usuarioRepository.filterUsuarioById(usuarioId);

        const livro = await this.livroRepository.filterLivroById(livroId);

        if(usuario.length == 0 || livro.length == 0){
            throw new Error("Usuário e/ou livro não existe");
        }

        const novoEmprestimo =  await this.emprestimoRepository.insertEmprestimo(emprestimo);
        console.log("Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        await this.emprestimoRepository.updateEmprestimo(emprestimo);
        console.log("Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);


        await this.emprestimoRepository.deleteEmprestimo(emprestimo);
        console.log("Service - Delete ", emprestimo);
        return emprestimo;
    }

    async filtrarEmprestimoById(emprestimoData: any): Promise<EmprestimoEntity> {
        const idNumber = parseInt(emprestimoData, 10);

        const emprestimo =  await this.emprestimoRepository.filterEmprestimoById(idNumber);
        console.log("Service - Filtrar", emprestimo);
        return emprestimo;
    }

    async listarTodasEmprestimos(): Promise<EmprestimoEntity[]> {
        const emprestimos =  await this.emprestimoRepository.filterAllEmprestimos();
        console.log("Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }

}