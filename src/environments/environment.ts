// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCFyiyuDzKSdUropQjYv-_1pzLiJyBD1vU',
    authDomain: 'motus-8bdcc.firebaseapp.com',
    databaseURL: 'https://motus-8bdcc.firebaseio.com',
    projectId: 'motus-8bdcc',
    storageBucket: 'motus-8bdcc.appspot.com',
    messagingSenderId: '594968588218'
  }
};
