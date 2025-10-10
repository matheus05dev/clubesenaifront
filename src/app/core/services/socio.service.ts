import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/API_CONFIG';
import { EditarSocioForm } from '../types/EditarSocioForm';
import { CadastroSocioForm } from './../types/CadastroSocioForm';
import { SocioResponse } from '../types/SocioResponse';
import { CadastraTagForm } from '../types/CadastraTagForm';

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

  buscarPorId(id: number): Observable<SocioResponse> {
    return this.Http.get<SocioResponse>(`${API_CONFIG.baseUrl}/socios/${id}`);
  }

  buscarTodos(): Observable<SocioResponse[]> {
    return this.Http.get<SocioResponse[]>(`${API_CONFIG.baseUrl}/socios`);
  }

  buscarPorNome(nome: string): Observable<SocioResponse[]> {
    return this.Http.get<SocioResponse[]>(`${API_CONFIG.baseUrl}/socios/nome/${nome}`);
  }

  cadastrarTag(form: CadastraTagForm):Observable<void> {
    return this.Http.patch<void>(`${API_CONFIG.baseUrl}/acessos/cadastrar-tag`, form);
  }
}
