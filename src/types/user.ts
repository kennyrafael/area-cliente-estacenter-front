import { ITitulo } from ".";

export interface IUser {
	document: string;
	codCli: number;
	nomCli: string;
	emaCli: string;
	titulos: ITitulo[];
}
