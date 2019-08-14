import CONSTANTES from "./CONSTANTES";

export const actionRegistro = values => {
  return {
    type: CONSTANTES.REGISTRO,
    datos: values
  };
};

export const actionLogin = datos => {
  return {
    type: CONSTANTES.LOGIN,
    datos
  };
};
//({}) significa que es return de un objeto que tambien puede ser poniendo directo return
export const actionEstablecerSesion = usuario => ({
  type: CONSTANTES.ESTABLECER_SESION,
  usuario
});

export const actionCerrarSesion = () => ({
  type: CONSTANTES.CERRAR_SESION
});

export const actionCargarImagenSignUp = imagen => ({
  type: CONSTANTES.CARGAR_IMAGEN_SIGNUP,
  imagen
});

export const actionLimpiarImagen = () => ({
  type: CONSTANTES.LIMPIAR_IMAGEN_SIGNUP
});

export const actionCargarImagenPublicacion = imagen => ({
  type: CONSTANTES.CARGAR_IMAGEN_PUBLICACION,
  imagen
});

export const actionLimpiarImagenPublicacion = () => ({
  type: CONSTANTES.LIMPIAR_IMAGEN_PUBLICACION
});

export const actionSubirPublicacion = values => ({
  type: CONSTANTES.SUBIR_PUBLICACION,
  values
});

export const actionDescargarPublicaciones = () => ({
  type: CONSTANTES.DESCARGAR_PUBLICACIONES
});

//Paso las publicaciones que voy a agregar al store que va ser un arreglo
export const actionAgregarPublicacionesStore = publicaciones => ({
  type: CONSTANTES.AGREGAR_PUBLICACIONES_STORE,
  publicaciones
});

export const actionAgregarAutoresStore = autores => ({
  type: CONSTANTES.AGREGAR_AUTORES_STORE,
  autores
});
