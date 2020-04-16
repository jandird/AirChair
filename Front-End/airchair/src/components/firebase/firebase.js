import * as firebase from 'firebase';

// Set the configuration for your app
let config = {
    apiKey: "AIzaSyDS0bap5oPcwBkXn2cWZdSBcyusigp1JAU",
    authDomain: "airchair-ef4f0.firebaseapp.com",
    databaseURL: "https://airchair-ef4f0.firebaseio.com",
    projectId: "airchair-ef4f0",
    storageBucket: "airchair-ef4f0.appspot.com",
    messagingSenderId: "1087894037632",
    appId: "1:1087894037632:web:7c6d6422a24910c9f73265",
    measurementId: "G-2P6HFPND9F"
};

firebase.initializeApp(config);
let database = firebase.database().ref();
let feedbackRef = database.child("feedback");

export default feedbackRef
