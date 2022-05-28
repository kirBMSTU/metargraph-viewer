// @ts-ignore
process.env.REACT_APP_BUILD_TARGET === 'lib' ? import(/* webpackChunkName: "mv" */'./lib') : import('./demo');