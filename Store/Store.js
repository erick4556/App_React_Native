import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as form } from "redux-form";
import createSagaMiddleware from "redux-saga";
import funcionPrimaria from "./Saga/Sagas";
import CONSTANTES from "./CONSTANTES";

//Le digo que state es un arreglo por que el state se va transformar a traves del combineReducers
const reducerPrueba = (state = [0], action) => {
  switch (action) {
    case "AUMENTAR_REDUCER_PRUEBA":
      return [...state, 1];

    default:
      return state;
  }
  //return state;
};
/*
//ultimoMiddleware(miMiddleare(...args)) //Algo asi se interpretaria lo del middleware

//Middlewares
const miMiddleware = store => next => action => {
  console.log("Se ejecuta el middleware");
  next(action); //Corresponde al siguiente middleware
};

//next cuando es el ultimo middleware es el que ejcuta el dispatch
const ultimoMiddleware = store => next => action => {
  console.log("Ultimo middleware");
  next(action);
};*/

const reducerSesion = (state = null, action) => {
  switch (action.type) {
    case CONSTANTES.ESTABLECER_SESION:
      //return { ...action.usuario }; //Establecer los datos del usuario
      return action.usuario; //Regrese el objeto total
    case CONSTANTES.CERRAR_SESION:
      return null;
    default:
      return state;
  }
};

const reducerImagenSignUp = (state = { imagen: null }, action) => {
  switch (action.type) {
    case CONSTANTES.CARGAR_IMAGEN_SIGNUP:
      return { imagen: action.imagen };
    case CONSTANTES.LIMPIAR_IMAGEN_SIGNUP:
      return { imagen: action.null };

    default:
      return state;
  }
};

const reducerImagenPublicacion = (state = { imagen: null }, action) => {
  switch (action.type) {
    case CONSTANTES.CARGAR_IMAGEN_PUBLICACION:
      return { imagen: action.imagen };
    case CONSTANTES.LIMPIAR_IMAGEN_PUBLICACION:
      return { imagen: action.null };

    default:
      return state;
  }
};

const reducerAutoresDescargados = (state = [], action) => {
  switch (action.type) {
    case CONSTANTES.AGREGAR_AUTORES_STORE:
      //Como voy hacer la carga una sola vez hago esto
      return [...state, ...action.autores]; //autores viene de la acion//...state es el state anterior y ..action.autores: agrego los autores al arreglo uno por uno sino ingresa array completo
                        //Me permite agregar cada elemento del array que le paso desde la saga
    default:
      return state;
  }
};

//Cuando el reducer es ejecutado el store le pasa el state y la action
const reducerPublicacionesDescargadas = (state = [], action) => {
  switch (action.type) {
    case CONSTANTES.AGREGAR_PUBLICACIONES_STORE:
      //Como voy hacer la carga una sola vez hago esto
      return [...state, ...action.publicaciones]; //...state es el state anterior y agrego las publicaciones al arreglo uno por uno
                        //Me permite agregar cada elemento del array que le paso desde la saga
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

//Para poder combinar varios reducers
//Produce un objeto el resultado de cada una de las acciones de los reducers
const reducers = combineReducers({
  //reducerPrueba: reducerPrueba //Corresponde a un arreglo
  reducerAutoresDescargados,
  reducerPublicacionesDescargadas,
  reducerSesion,
  reducerPrueba, //Ya entiende que el valor es igual al que le estoy pasando
  reducerImagenSignUp, //Para que pueda acceder al state,
  reducerImagenPublicacion,
  form
});
//const store = createStore(reducers);
const store = createStore(
  reducers,
  //applyMiddleware(miMiddleware, ultimoMiddleware)
  applyMiddleware(sagaMiddleware)
); //Aplicando middlware

sagaMiddleware.run(funcionPrimaria); //Ejecutar el middleware

export default store;
