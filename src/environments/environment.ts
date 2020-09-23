// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 // SERVER_URL: `http://192.168.1.111:8304/`, // 大产品
   SERVER_URL: `http://39.101.168.200:8304/`, // 42
 //  SERVER_URL: `http://192.168.1.105:8404/`, // 42
 // SERVER_URL: `http://39.101.168.200:8201/`, // 小产品
 // SERVER_URL: `http://192.168.1.111:8201/`,  // 云服务器 小产品
  //SERVER_URL: `http://39.101.168.200:8304/`,  
  // LOCAL_URL: 'http://localhost:4200/',
  LOCAL_URL: `./`,
  production: false,
  useHash: true,
  hmr: false,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
