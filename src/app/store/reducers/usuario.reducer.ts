import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
  id: string;
  user: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuarioInitialState: UsuarioState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,
  on(cargarUsuario, (state, props) =>
    ({
      ...state,
      loading: true,
      id: props.id
    })
  ),
  on(cargarUsuarioSuccess, (state, props) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...props.usuario }
  })),
  on(cargarUsuarioError, (state, props) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: props.payload.url,
      name: props.payload.name,
      message: props.payload.message
    }
  }))

);

export function usuarioReducer(state, action) {
  return _usuarioReducer(state, action);
}
