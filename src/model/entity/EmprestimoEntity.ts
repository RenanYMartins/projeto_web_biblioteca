import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class EmprestimoEntity {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, livroId?: number, usuarioId?: number, dataEmprestimo?: Date, dataDevolucao?: Date) {
        this.validatesInformation(livroId, usuarioId, dataEmprestimo, dataDevolucao);
        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = dataEmprestimo || new Date;
        this.dataDevolucao = dataDevolucao || new Date;
    }

    private validatesInformation(livroId: any, usuarioId: any, dataEmprestimo: any, dataDevolucao: any) {
        let error = '';
        if (typeof livroId !== 'number' || usuarioId !== 'number' || dataEmprestimo !== 'date' || dataDevolucao !== 'date') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if (error != '') {
            throw new Error(error);
        }
    }
}