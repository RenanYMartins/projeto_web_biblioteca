import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class EmprestimoEntity {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = dataEmprestimo ? new Date(dataEmprestimo) : new Date;
        this.dataDevolucao = dataDevolucao  ? new Date(dataDevolucao) : new Date;
        this.validatesInformation(livroId, usuarioId, dataEmprestimo, dataDevolucao);
    }

    private validatesInformation(livroId: any, usuarioId: any, dataEmprestimo: any, dataDevolucao: any) {
        let error = '';
        if (typeof livroId !== 'number' || typeof usuarioId !== 'number' || !(dataEmprestimo instanceof Date) || !(dataDevolucao instanceof Date)) {
            error += ("Informações incompletas ou incorretas. ");
            console.log("livro", livroId);
            console.log("usuarioId", usuarioId);
            console.log("emprestimo", dataEmprestimo);
            console.log("devolucao", dataDevolucao);

        }

        if (error != '') {
            throw new Error(error);
        }
    }
}