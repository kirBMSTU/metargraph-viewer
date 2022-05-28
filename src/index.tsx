// @ts-ignore
process.env.REACT_APP_BUILD_TARGET === 'lib' ? import(/* webpackChunkName: "lib" */'./lib') : import('./demo');