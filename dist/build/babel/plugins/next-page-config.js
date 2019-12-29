"use strict";exports.__esModule=true;exports.default=nextPageConfig;const configKeys=new Set(['amp']);const STRING_LITERAL_DROP_BUNDLE='__NEXT_DROP_CLIENT_FILE__';// replace program path with just a variable with the drop identifier
function replaceBundle(path,t){path.parentPath.replaceWith(t.program([t.variableDeclaration('const',[t.variableDeclarator(t.identifier('config'),t.assignmentExpression('=',t.identifier(STRING_LITERAL_DROP_BUNDLE),t.stringLiteral(`${STRING_LITERAL_DROP_BUNDLE} ${Date.now()}`)))])],[]));}// config to parsing pageConfig for client bundles
function nextPageConfig({types:t}){return{visitor:{Program:{enter(path,state){path.traverse({ExportNamedDeclaration(path,state){if(state.bundleDropped||!path.node.declaration){return;}const{declarations}=path.node.declaration;const config={};if(!declarations){return;}for(const declaration of declarations){if(declaration.id.name!=='config'){continue;}if(declaration.init.type!=='ObjectExpression'){const pageName=(state.filename||'').split(state.cwd||'').pop()||'unknown';throw new Error(`Invalid page config export found. Expected object but got ${declaration.init.type} in file ${pageName}. See: https://err.sh/zeit/next.js/invalid-page-config`);}for(const prop of declaration.init.properties){const{name}=prop.key;if(configKeys.has(name)){// @ts-ignore
config[name]=prop.value.value;}}}if(config.amp===true){if(!(state.file&&state.file.opts&&state.file.opts.caller.isDev)){// don't replace bundle in development so HMR can track
// dependencies and trigger reload when they are changed
replaceBundle(path,t);}state.bundleDropped=true;return;}}},state);}}}};}