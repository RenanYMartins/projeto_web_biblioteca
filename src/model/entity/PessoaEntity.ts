import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class PessoaEntity {
    id: number;
    nome: string;
    email: string;

    constructor(id?: number, nome?: string, email?: string) {
        this.validatesInformation(nome, email);
        this.id = id || 0;
        this.nome = nome || '';
        this.email = email || '';
    }

    private validatesInformation(nome: any, email: any) {
        let error = '';
        if (typeof nome !== 'string' || typeof email !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if (error != '') {
            throw new Error(error);
        }
    }
}