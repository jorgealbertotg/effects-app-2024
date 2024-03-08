import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: ``
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  loading: boolean = false;

  error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.usuarioService.getUsers().subscribe(usuarios =>
    //   this.usuarios = usuarios
    // );

    this.store.select("usuarios").subscribe(usuarios => {
      this.usuarios= usuarios.users;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });

    this.store.dispatch(cargarUsuarios());
  }

}
