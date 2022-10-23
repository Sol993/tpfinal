// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyAc18xdJX7kVHgl1KZSZaIxgwPHL-wl-RQ",
    authDomain: "clinica-utn-correasolange.firebaseapp.com",
    projectId: "clinica-utn-correasolange",
    storageBucket: "clinica-utn-correasolange.appspot.com",
    messagingSenderId: "659496761187",
    appId: "1:659496761187:web:b2bfe6f3dc2a71767e0556"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
