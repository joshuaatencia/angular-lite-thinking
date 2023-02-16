import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.mode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  private HOST = 'http://localhost';
  private PORT = '8080';
  private URL: string;

  constructor(private http: HttpClient) { 
    this.URL = `${this.HOST}:${this.PORT}`;
  }

  getListUsuario(){
    return this.http.get<Usuario[]>(`${this.URL}/usuario/`);
  }

  createUsuario(usuario: Usuario){
    return this.http.post(`${this.URL}/usuario/create`, usuario);
  }

  updateUsuario(usuario: Usuario){
    return this.http.put(`${this.URL}/usuario/update`, usuario);
  }


}
