import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaRepository } from './../repository/CategoriaRepository';

export class LivroService{

    livroRepository: LivroRepository = LivroRepository.getInstance();
    CategoriaRepository: CategoriaRepository = CategoriaRepository.getInstance();

    async cadastrarLivro(livroData: any): Promise<LivroEntity> {
        const { titulo, autor, categoriaId } = livroData;
        
        const livro = new LivroEntity(undefined, titulo, autor, categoriaId)

        const categoria = await this.CategoriaRepository.filterCategoriaById(categoriaId);

        if(categoria.length == 0){
            throw new Error("Erro. Categoria não encontrada");
        }

        const novoLivro =  await this.livroRepository.insertLivro(livro);
        console.log("Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);

        const categoria = await this.CategoriaRepository.filterCategoriaById(categoriaId);

        if(categoria.length == 0){
            throw new Error("Erro. Categoria não encontrada");
        }

        await this.livroRepository.updateLivro(livro);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId  } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);

        await this.livroRepository.deleteLivro(livro);
        console.log("Service - Delete ", livro);
        return livro;
    }

    async filtrarLivroById(livroData: any): Promise<LivroEntity[]> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepository.filterLivroById(idNumber);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async filtrarLivroByCategory(livroData: any): Promise<LivroEntity[]> {
        const categoriaId = parseInt(livroData, 10);

        const livro =  await this.livroRepository.filterLivroByCategory(categoriaId);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async filtrarLivroByNome(livroData: any): Promise<LivroEntity[]> {
        const nome:string = livroData;

        const livros =  await this.livroRepository.filterLivroByNome(nome);
        console.log("Service - Filtrar", livros);
        return livros;
    }

    async listarTodosLivros(): Promise<LivroEntity[]> {
        const livros =  await this.livroRepository.filterAllLivros();
        console.log("Service - Filtrar Todos", livros);
        return livros;
    }

}