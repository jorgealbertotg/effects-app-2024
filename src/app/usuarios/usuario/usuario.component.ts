import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuario } from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: ``
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.select("usuario").subscribe(usuario => {
      this.usuario = usuario.user;
    });
  
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params.id);
      this.store.dispatch(cargarUsuario({ id: params.id }));
    });
  }
}
