import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class UsuarioEntity {
    id: number;
    idPessoa: number;
    senha: string;

    constructor(id?: number, idPessoa?: number, senha?: string) {
        this.validatesInformation(idPessoa);
        this.id = id || 0;
        this.idPessoa = idPessoa || 0;
        this.senha = senha || '';
    }

    private validatesInformation(idPessoa: any) {
        let error = '';
        if (typeof idPessoa !== 'number') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if (error != '') {
            throw new Error(error);
        }
    }
}