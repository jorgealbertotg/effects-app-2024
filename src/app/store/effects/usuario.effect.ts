import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, of, catchError } from 'rxjs';
import * as usuarioActions from "../actions";
import { UsuarioService } from "../../services/usuario.service";


@Injectable()
export class UsuarioEffect {

  constructor(private actions$: Actions, private usuarioService: UsuarioService) {}

  cargarUsuarioEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap((action) =>
        this.usuarioService.getUserById(action.id)
          .pipe(
            map(usuario => usuarioActions.cargarUsuarioSuccess({ usuario })),
            catchError(err => of(usuarioActions.cargarUsuarioError({ payload: err })))
          )
      )
    );
  });
}
