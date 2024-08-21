import { PessoaRepository } from './../repository/PessoaRepository';
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";


export class UsuarioService{

    usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();
    PessoaRepository: PessoaRepository = PessoaRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPessoa, senha } = usuarioData;
        
        const usuario = new UsuarioEntity(undefined, idPessoa, senha);

        const pessoa = await this.PessoaRepository.filterPessoaById(idPessoa);

        if(pessoa.length == 0){
            throw new Error("Pessoa não encontrada com o id fornecido");
            
        }
        
        const novoUsuario =  await this.usuarioRepository.insertUsuario(usuario);
        console.log("Service - Insert ", novoUsuario);
        return novoUsuario;
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa, senha);

        const pessoa = await this.PessoaRepository.filterPessoaById(idPessoa);

        if(pessoa.length == 0){
            throw new Error("Pessoa não encontrada com o id fornecido");
            
        }

        await this.usuarioRepository.updateUsuario(usuario);
        console.log("Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa } = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa);

        await this.usuarioRepository.deleteUsuario(usuario);
        console.log("Service - Delete ", usuario);
        return usuario;
    }

    async filtrarUsuarioById(usuarioData: any): Promise<UsuarioEntity[]> {
        const idNumber = parseInt(usuarioData, 10);

        const usuario =  await this.usuarioRepository.filterUsuarioById(idNumber);
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios =  await this.usuarioRepository.filterAllUsuarios();
        console.log("Service - Filtrar Todos", usuarios);
        return usuarios;
    }
}