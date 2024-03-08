import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import * as usuariosActions from "../actions";
import { UsuarioService } from "../../services/usuario.service";

@Injectable()
export class UsuariosEffect {

  constructor(private actions$: Actions, private usuariosService: UsuarioService) {}

  cargarUsuarios$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(usuariosActions.cargarUsuarios),
        exhaustMap(() =>
          this.usuariosService.getUsers()
            .pipe(
              map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
              catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))
            )
        )
      );
    }
  );
}
