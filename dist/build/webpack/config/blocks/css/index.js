"use strict";exports.__esModule=true;exports.css=void 0;var _lodash=_interopRequireDefault(require("lodash.curry"));var _path=_interopRequireDefault(require("path"));var _miniCssExtractPlugin=_interopRequireDefault(require("../../../plugins/mini-css-extract-plugin"));var _helpers=require("../../helpers");var _utils=require("../../utils");var _getCssModuleLocalIdent=require("./getCssModuleLocalIdent");var _messages=require("./messages");var _plugins=require("./plugins");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function getClientStyleLoader({isDevelopment}){return isDevelopment?{loader:require.resolve('style-loader'),options:{// By default, style-loader injects CSS into the bottom
// of <head>. This causes ordering problems between dev
// and prod. To fix this, we render a <noscript> tag as
// an anchor for the styles to be placed before. These
// styles will be applied _before_ <style jsx global>.
insert:function(element){// These elements should always exist. If they do not,
// this code should fail.
var anchorElement=document.querySelector('#__next_css__DO_NOT_USE__');var parentNode=anchorElement.parentNode;// Normally <head>
// Each style tag should be placed right before our
// anchor. By inserting before and not after, we do not
// need to track the last inserted element.
parentNode.insertBefore(element,anchorElement)// Remember: this is development only code.
//
// After styles are injected, we need to remove the
// <style> tags that set `body { display: none; }`.
//
// We use `requestAnimationFrame` as a way to defer
// this operation since there may be multiple style
// tags.
;(self.requestAnimationFrame||setTimeout)(function(){for(var x=document.querySelectorAll('[data-next-hide-fouc]'),i=x.length;i--;){x[i].parentNode.removeChild(x[i]);}});}}}:{loader:_miniCssExtractPlugin.default.loader,options:{}};}const css=(0,_lodash.default)(async function css(enabled,ctx,config){if(!enabled){return config;}const fns=[(0,_helpers.loader)({oneOf:[{// Impossible regex expression
test:/a^/,loader:'noop-loader',options:{__next_css_remove:true}}]})];const postCssPlugins=await(0,_plugins.getPostCssPlugins)(ctx.rootDirectory);// CSS Modules support must be enabled on the server and client so the class
// names are availble for SSR or Prerendering.
fns.push((0,_helpers.loader)({oneOf:[{// CSS Modules should never have side effects. This setting will
// allow unused CSS to be removed from the production build.
// We ensure this by disallowing `:global()` CSS at the top-level
// via the `pure` mode in `css-loader`.
sideEffects:false,// CSS Modules are activated via this specific extension.
test:/\.module\.css$/,// CSS Modules are only supported in the user's application. We're
// not yet allowing CSS imports _within_ `node_modules`.
issuer:{include:[ctx.rootDirectory],exclude:/node_modules/},use:[// Add appropriate development more or production mode style
// loader
ctx.isClient&&getClientStyleLoader({isDevelopment:ctx.isDevelopment}),// Resolve CSS `@import`s and `url()`s
{loader:require.resolve('css-loader'),options:{importLoaders:1,sourceMap:true,onlyLocals:ctx.isServer,modules:{// Disallow global style exports so we can code-split CSS and
// not worry about loading order.
mode:'pure',// Generate a friendly production-ready name so it's
// reasonably understandable. The same name is used for
// development.
// TODO: Consider making production reduce this to a single
// character?
getLocalIdent:_getCssModuleLocalIdent.getCssModuleLocalIdent}}},// Compile CSS
{loader:require.resolve('postcss-loader'),options:{ident:'postcss',plugins:postCssPlugins,sourceMap:true}}].filter(Boolean)}]}));// Throw an error for CSS Modules used outside their supported scope
fns.push((0,_helpers.loader)({oneOf:[{test:/\.module\.css$/,use:{loader:'error-loader',options:{reason:(0,_messages.getLocalModuleImportError)()}}}]}));if(ctx.isServer){fns.push((0,_helpers.loader)({oneOf:[{test:/\.css$/,use:require.resolve('ignore-loader')}]}));}else if(ctx.customAppFile){fns.push((0,_helpers.loader)({oneOf:[{// A global CSS import always has side effects. Webpack will tree
// shake the CSS without this option if the issuer claims to have
// no side-effects.
// See https://github.com/webpack/webpack/issues/6571
sideEffects:true,test:/\.css$/,issuer:{include:ctx.customAppFile},use:[// Add appropriate development more or production mode style
// loader
getClientStyleLoader({isDevelopment:ctx.isDevelopment}),// Resolve CSS `@import`s and `url()`s
{loader:require.resolve('css-loader'),options:{importLoaders:1,sourceMap:true}},// Compile CSS
{loader:require.resolve('postcss-loader'),options:{ident:'postcss',plugins:postCssPlugins,sourceMap:true}}]}]}));}// Throw an error for Global CSS used inside of `node_modules`
fns.push((0,_helpers.loader)({oneOf:[{test:/\.css$/,issuer:{include:[/node_modules/]},use:{loader:'error-loader',options:{reason:(0,_messages.getGlobalModuleImportError)()}}}]}));// Throw an error for Global CSS used outside of our custom <App> file
fns.push((0,_helpers.loader)({oneOf:[{test:/\.css$/,use:{loader:'error-loader',options:{reason:(0,_messages.getGlobalImportError)(ctx.customAppFile&&_path.default.relative(ctx.rootDirectory,ctx.customAppFile))}}}]}));if(ctx.isClient){// Automatically transform references to files (i.e. url()) into URLs
// e.g. url(./logo.svg)
fns.push((0,_helpers.loader)({oneOf:[{// This should only be applied to CSS files
issuer:{test:/\.css$/},// Exclude extensions that webpack handles by default
exclude:[/\.(js|mjs|jsx|ts|tsx)$/,/\.html$/,/\.json$/],use:{// `file-loader` always emits a URL reference, where `url-loader`
// might inline the asset as a data URI
loader:require.resolve('file-loader'),options:{// Hash the file for immutable cacheability
name:'static/media/[name].[hash].[ext]'}}}]}));}const fn=(0,_utils.pipe)(...fns);return fn(config);});exports.css=css;