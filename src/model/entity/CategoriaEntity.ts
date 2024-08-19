import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class CategoriaEntity {
    id: number;
    nome: string;

    constructor(id?: number, nome?: string) {
        this.validatesInformation(nome);
        this.id = id || 0;
        this.nome = nome || '';
    }

    private validatesInformation(nome: any) {
        let error = '';
        if (typeof nome !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if (error != '') {
            throw new Error(error);
        }
    }
}