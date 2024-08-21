import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService{

    pessoaRepository: PessoaRepository = PessoaRepository.getInstance();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { nome, email } = pessoaData;
        
        const pessoa = new PessoaEntity(undefined, nome, email)

        const novoPessoa =  await this.pessoaRepository.insertPessoa(pessoa);
        console.log("Service - Insert ", novoPessoa);
        return novoPessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, nome, email } = pessoaData;

        const pessoa = new PessoaEntity(id, nome, email);

        await this.pessoaRepository.updatePessoa(pessoa);
        console.log("Service - Update ", pessoa);
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, nome, email } = pessoaData;

        const pessoa = new PessoaEntity(id, nome, email)

        await this.pessoaRepository.deletePessoa(pessoa);
        console.log("Service - Delete ", pessoa);
        return pessoa;
    }

    async filtrarPessoaById(pessoaData: any): Promise<PessoaEntity[]> {
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepository.filterPessoaById(idNumber);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async filtrarPessoaByNome(pessoaData: any): Promise<PessoaEntity[]> {
        const nome:string = pessoaData;

        const pessoas =  await this.pessoaRepository.filterPessoaByNome(nome);
        console.log("Service - Filtrar", pessoas);
        return pessoas;
    }

    async listarTodasPessoas(): Promise<PessoaEntity[]> {
        const pessoas =  await this.pessoaRepository.filterAllPessoas();
        console.log("Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}