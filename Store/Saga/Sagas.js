import { takeEvery, call, select, put, all } from "redux-saga/effects";
import { autenticacion, basedeDatos } from "../Servicios/Firebase";
import CONSTANTES from "../CONSTANTES";
import {
  actionAgregarPublicacionesStore,
  actionAgregarAutoresStore
} from "../ACCIONES";

//takeEvery es un listener que escucha todos los dispatch que
//se le dan al middleware
//--------------------------
//call permite hacer una llamada a una funcion y pasarle parametros y tomar valores que regrese
//dicha funcion y guardarlo en una variable

const registroEnFirebase = values =>
  autenticacion
    .createUserWithEmailAndPassword(values.correo, values.password)
    .then(success => JSON.stringify(success));

const registroEnBaseDatos = ({ uid, email, nombre, fotoUrl }) =>
  basedeDatos.ref(`usuarios/${uid}`).set({
    email,
    nombre,
    fotoUrl
  });

const loginFirebase = ({ correo, password }) =>
  autenticacion
    .signInWithEmailAndPassword(correo, password)
    .then(success => success);
/* .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
    }); */

const registroFotoCloudinary = ({ imagen }) => {
  console.log(imagen);
  const { uri, type } = imagen;
  const splitName = uri.split("/"); //Obtengo un arreglo separado por /
  const name = [...splitName].pop(); //pop elimina del splitName el ultimo elemento que ha sido dividido por la /
  const foto = {
    uri,
    type,
    name
  };
  const formImagen = new FormData(); //Me permite hacer peticiones http
  formImagen.append("upload_preset", CONSTANTES.CLOUDINARY_PRESET); //Le paso el preset, le agrego una clave y un valor
  formImagen.append("file", foto); //La parte del archivo

  return fetch(CONSTANTES.CLOUDINARY_NAME, {
    //fetch() me ayuda hacer las peticiones al servidor y cargar la foto al servidor
    method: "POST",
    body: formImagen
  }).then(response => response.json());
};

//funciones generadoras

//Aqui paso todo el objeto de registro del mapDispatchProps
//Funcion de abajo takeEvery se lo esta inyectando
//yield solo funciona si la funcion es generadora
function* sagaRegistro(values) {
  try {
    //Cargar la foto
    const imagen = yield select(state => state.reducerImagenSignUp); //Traer datos
    console.log(imagen);
    const urlFoto = yield call(registroFotoCloudinary, imagen); //imagen es lo que le estoy pasando a la funcion registroFotoCloudinary
    //console.log(urlFoto); //El response se guarda en urlFoto
    console.log(urlFoto.secure_url);
    const fotoUrl = urlFoto.secure_url;
    const registro = yield call(registroEnFirebase, values.datos);
    //console.log(resultado);
    const {
      user: { email },
      user: { uid }
    } = JSON.parse(registro);
    const {
      datos: { nombre }
    } = values;
    yield call(registroEnBaseDatos, { uid, email, nombre, fotoUrl }); //Le paso un objeto con 3 llaves y valores
  } catch (error) {
    console.log(error);
  }
}

/*
function* generadoraRegistro(values) {
  try {
    //Guardar el success en registro
    const registro = yield call(registroEnFirebase, values.datos); //Se necesita un yield ante de cada efecto de redux-saga
    const { correo, uid } = registro; //Asigne a las variables, de registro tomo el email y uid
    const {
      datos: { nombre }
    } = values; //Asigno nombre, lo tomo de values, destructuracion de un objeto anidado
    //uid,email,nombre
    yield call(registroEnBaseDatos, { uid, correo, nombre }); //Le paso un objeto con 3 llaves y valores
  } catch (error) {
    console.log(error);
  }
}*/

function* sagaLogin(values) {
  try {
    console.log(values);
    const resultado = yield call(loginFirebase, values.datos); //call por que quiero que bloquee el efecto que sigue
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
}

const escribirFirebaseS = (
  { width, height, secure_url, uid },
  texto = "" //Primer parametro es un objeto
) =>
  basedeDatos
    .ref("publicaciones/")
    .push({
      width,
      height,
      secure_url,
      texto,
      uid
    })
    .then(response => response); //Promesa

const escribirAutorPublicaciones = ({ uid, key }) =>
  basedeDatos
    .ref(`autor-publicaciones/${uid}`)
    .update({ [key]: true }) //Para indtroducir el valor
    .then(response => response);

//Cuando se ejecute el dispatch, el reducer va venir aqui y va detener la funcion con el yield
function* sagaSubirPublicacion({ values }) {
  try {
    const imagen = yield select(state => state.reducerImagenPublicacion);
    const usuario = yield select(state => state.reducerSesion);
    const { uid } = usuario;
    console.log(uid);
    const resultadoImagen = yield call(registroFotoCloudinary, imagen);
    console.log(resultadoImagen);
    const { width, height, secure_url } = resultadoImagen;
    const parametrosImagen = { width, height, secure_url, uid };
    //console.log(parametrosImagen);
    const escribirFirebase = yield call(
      escribirFirebaseS,
      parametrosImagen,
      values.texto
    ); //por ultimo le paso el texto
    console.log(escribirFirebase.key);
    //console.log(values);
    const { key } = escribirFirebase;
    const parametrosAutorPublic = { uid, key };
    const resultescribirAutorPublic = yield call(
      escribirAutorPublicaciones,
      parametrosAutorPublic
    );
  } catch (error) {
    console.log(error);
  }
}

const descargarPublicaciones = () =>
  basedeDatos
    .ref("publicaciones/")
    .once("value")
    //.then( => response.
    .then(snapshot => {
      let publicaciones = [];
      snapshot.forEach(childSnapshot => {
        const { key } = childSnapshot; //Llave de cada uno de los elementos
        let publicacion = childSnapshot.val(); //Obtengo con el val lo que tiene como child la direccion
        publicacion.key = key;
        publicaciones.push(publicacion); //Agrego al array las publicaciones
        //console.log(publicacion);
      });
      return publicaciones;
    });
//Snapshot da toda lista
//childSnapshot entrega cada uno de los elementos

const descargarAutor = uid =>
  basedeDatos
    .ref(`usuarios/${uid}`)
    .once("value")
    .then(snapshot => snapshot.val());

function* sagaDescargarPublicaciones() {
  try {
    const publicaciones = yield call(descargarPublicaciones);
    //console.log(publicaciones);
    //Al ejecutar en array el metodo map itera sobre todos sus elementos y entrega un nuevo array que va ser de objeto
    //No va continuar hasta que se resuelva todo ese yield all
    const autores = yield all(
      publicaciones.map(publicacion => call(descargarAutor, publicacion.uid))
    ); //Regresa un callback - call, regresa un objeto. Obtener una publciacion, agarra cada uno de los elementos del arreglo
    //yield call() - {CALL: {fn:descargarPublicaciones, arg:[]}} eso es lo que hace el call
    console.log(autores);
    yield put(actionAgregarAutoresStore(autores));
    //Hacer dispatch desde el middlware
    yield put(actionAgregarPublicacionesStore(publicaciones)); //Envia las publicaciones al store
  } catch (error) {
    console.log(error);
  }
}

//Antes de que se envien los dispatch al store, quiero que haga determinadas acciones

export default function* funcionPrimaria() {
  /*yield takeEvery("REGISTRO", sagaRegistro); //Para poder ejecutar los efectos de redux saga hay que usar yield
  yield takeEvery("LOGIN", sagaLogin);*/
  yield takeEvery(CONSTANTES.REGISTRO, sagaRegistro); //Para poder ejecutar los efectos de redux saga hay que usar yield
  yield takeEvery(CONSTANTES.LOGIN, sagaLogin);
  yield takeEvery(CONSTANTES.SUBIR_PUBLICACION, sagaSubirPublicacion); //Que revise de CONSTANSTES... que cuando llegue ese tipo accion del dispatch - ejecuto el dispatch de la accion, ejecute un saga
  yield takeEvery(
    CONSTANTES.DESCARGAR_PUBLICACIONES,
    sagaDescargarPublicaciones
  );
  //yield ES6 permite pausar la ejecucion de la funcion en el yield y
  //regresar un valor a la funcion que la llama
  console.log("Desde funcion generador");
}
