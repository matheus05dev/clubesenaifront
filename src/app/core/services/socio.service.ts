import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/API_CONFIG';
import { EditarSocioForm } from '../types/EditarSocioForm';
import { CadastroSocioForm } from './../types/CadastroSocioForm';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private Http = inject(HttpClient);

  cadastrar(form: CadastroSocioForm): Observable<void> {
    return this.Http.post<void>(`${API_CONFIG.baseUrl}/socios`, form);
  }

  deletar(id: number): Observable<void> {
    return this.Http.delete<void>(`${API_CONFIG.baseUrl}/socios/${id}`);
  }

  editar(id: number, form:EditarSocioForm): Observable<void> {
    return this.Http.put<void>(`${API_CONFIG.baseUrl}/socios/${id}`, form);
  }

  buscarPorId(id: number): Observable<CadastroSocioForm> {
    return this.Http.get<CadastroSocioForm>(`${API_CONFIG.baseUrl}/socios/${id}`);
  }

  buscarTodos(): Observable<CadastroSocioForm[]> {
    return this.Http.get<CadastroSocioForm[]>(`${API_CONFIG.baseUrl}/socios`);
  }

  buscarPorNome(nome: string): Observable<CadastroSocioForm[]> {
    return this.Http.get<CadastroSocioForm[]>(`${API_CONFIG.baseUrl}/socios/nome/${nome}`);
  }
}
