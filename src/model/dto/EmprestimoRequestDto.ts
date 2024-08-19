export class EmprestimoRequestDto {
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dateDevolucao: Date;

    constructor(livroId?: number, usuarioId?: number, dataEmprestimo?: Date, dataDevolucao?: Date) {
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = dataEmprestimo || new Date;
        this.dateDevolucao = dataDevolucao || new Date;
    }
}   