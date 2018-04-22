// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey:'AIzaSyDfUCfAqI6pA1AHThlRFoeMN5GSdAgLP7E',
    authDomain:'benchme-df59a.firebaseapp.com',
    databaseURL:'https://benchme-df59a.firebaseio.com/',
    projectId:'benchme-df59a',
    storageBucket: 'benchme-df59a.appspot.com',
    messangingSenderId:'436734107308'
  }
};
