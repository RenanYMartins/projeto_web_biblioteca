export class PessoaDto {
    id: number;
    nome: string;
    email: string;

    constructor(id: any, nome: any, email: any) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}   