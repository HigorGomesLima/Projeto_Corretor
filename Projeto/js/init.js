(function init(){
    var _cadastro = new CriaTurma();
    const firebaseConfig = {
    apiKey: "AIzaSyCI6LDePJLmWcEyP6u06cjtbhsCEY7_CFc",
    authDomain: "bancodadossimples.firebaseapp.com",
    databaseURL: "https://bancodadossimples.firebaseio.com",
    projectId: "bancodadossimples",
    storageBucket: "bancodadossimples.appspot.com",
    messagingSenderId: "489659906933",
    appId: "1:489659906933:web:6bf4a41eda7eecb999f13c",
    measurementId: "G-B3ZCL5PWNZ"
  };
    firebase.initializeApp(firebaseConfig);
})()