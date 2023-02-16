import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './model/usuario.mode';
import { UsuarioService } from './service/usuario.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usuarioSelecionado: Usuario = null;

  usuarios: Usuario[];
  dataSource: MatTableDataSource<Usuario>;


  displayedColumns: string[] = ['pfp', 'id', 'user', 'password', 'active', 'eventos'];

  title = 'registro';


  usuarioForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private _formBuilder: FormBuilder,) {
    this.usuarioForm = this.createForm();
  }


  eventSelecionado(usuario: Usuario) {
    this.usuarioSelecionado = usuario;

    this.usuarioForm.controls['id'].setValue(usuario.id);
    this.usuarioForm.controls['user'].setValue(usuario.user);
    this.usuarioForm.controls['password'].setValue(usuario.password);
    this.usuarioForm.controls['active'].setValue(true);

  }

  eventCancelar() {
    this.usuarioSelecionado = null;
    this.usuarioForm.reset();
  }

  ngOnInit(): void {
    this.usuarioService.getListUsuario().subscribe(data => {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
    })
  }


  createForm(): FormGroup {
    return this._formBuilder.group({
      id: [0],
      user: [''],
      password: [''],
      active: [null]
    });
  }

  onSubmit() {
    
    this.usuarioService.updateUsuario(this.usuarioForm.value).subscribe(data => {
      this.ngOnInit();
    });
    
  }

}
