import { Endereco } from "./Endereco"

export interface SocioResponse {
  matricula: string,
  nome: string,
  email: string,
  dataNascimento: Date,
  endereco: Endereco,
  tagAcesso: string,
  liberado: boolean,
  statusAcesso: string,
  dataAssociacao: Date
}
