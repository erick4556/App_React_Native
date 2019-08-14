import firebase from "firebase";

var firebaseConfig = {
  //Informacion de firebase como apiKey, authDomain etc
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* const autenticacion = firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
 */

export const autenticacion = firebase.auth();
export const basedeDatos = firebase.database();
