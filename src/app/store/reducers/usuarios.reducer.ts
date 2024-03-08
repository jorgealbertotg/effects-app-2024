import { createReducer, on } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuariosState {
  users: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuariosInitialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
}

const _usuariosReducer = createReducer(usuariosInitialState,

  on(cargarUsuarios, state => ({ ...state, loading: true })),
  on(cargarUsuariosSuccess, (state, props) =>
    ({
      ...state,
      loading: false,
      loaded: true,
      users: [...props.usuarios]
    })
  ),
  on(cargarUsuariosError, (state, props) =>
    ({
      ...state,
      loading: false,
      loaded: false,
      error: {
        url: props.payload.url,
        name: props.payload.name,
        message: props.payload.message
      }
    })
  )

);

export function usuariosReducer(state, action) {
  return _usuariosReducer(state, action);
}
