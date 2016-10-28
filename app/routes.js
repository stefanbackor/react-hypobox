// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
// import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) { // eslint-disable-line no-unused-vars
  // create reusable async injectors using getAsyncInjectors factory
  // const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'uvod',
      getComponent(nextState, cb) {
        System.import('containers/PagePriebehHypoteky')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // getComponent(nextState, cb) {
      //   const importModules = Promise.all([
      //     System.import('containers/PagePriebehHypoteky/reducer'),
      //     System.import('containers/PagePriebehHypoteky/sagas'),
      //     System.import('containers/PagePriebehHypoteky'),
      //   ]);
      //
      //   const renderRoute = loadModule(cb);
      //
      //   importModules.then(([reducer, sagas, component]) => {
      //     injectReducer('uvod', reducer.default);
      //     injectSagas(sagas.default);
      //
      //     renderRoute(component);
      //   });
      //
      //   importModules.catch(errorLoading);
      // },
    },
    {
      path: '/aku-hypoteku-dostanem',
      name: 'kolko-dostanem',
      getComponent(nextState, cb) {
        System.import('containers/PageKolkoDostanem')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
