"use strict";exports.__esModule=true;exports.createPagesMapping=createPagesMapping;exports.createEntrypoints=createEntrypoints;var _chalk=_interopRequireDefault(require("chalk"));var _path=require("path");var _querystring=require("querystring");var _constants=require("../lib/constants");var _config=require("../next-server/server/config");var _log=require("./output/log");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function createPagesMapping(pagePaths,extensions){const previousPages={};const pages=pagePaths.reduce((result,pagePath)=>{let page=`${pagePath.replace(new RegExp(`\\.+(${extensions.join('|')})$`),'').replace(/\\/g,'/')}`.replace(/\/index$/,'');page=page==='/index'?'/':page;const pageKey=page===''?'/':page;if(pageKey in result){(0,_log.warn)(`Duplicate page detected. ${_chalk.default.cyan((0,_path.join)('pages',previousPages[pageKey]))} and ${_chalk.default.cyan((0,_path.join)('pages',pagePath))} both resolve to ${_chalk.default.cyan(pageKey)}.`);}else{previousPages[pageKey]=pagePath;}result[pageKey]=(0,_path.join)(_constants.PAGES_DIR_ALIAS,pagePath).replace(/\\/g,'/');return result;},{});pages['/_app']=pages['/_app']||'next/dist/pages/_app';pages['/_error']=pages['/_error']||'next/dist/pages/_error';pages['/_document']=pages['/_document']||'next/dist/pages/_document';return pages;}function createEntrypoints(pages,target,buildId,config){const client={};const server={};const defaultServerlessOptions={absoluteAppPath:pages['/_app'],absoluteDocumentPath:pages['/_document'],absoluteErrorPath:pages['/_error'],distDir:_constants.DOT_NEXT_ALIAS,buildId,assetPrefix:config.assetPrefix,generateEtags:config.generateEtags,ampBindInitData:config.experimental.ampBindInitData,canonicalBase:config.canonicalBase,basePath:config.experimental.basePath};Object.keys(pages).forEach(page=>{const absolutePagePath=pages[page];const bundleFile=page==='/'?'/index.js':`${page}.js`;const isApiRoute=page.match(_constants.API_ROUTE);const bundlePath=(0,_path.join)('static',buildId,'pages',bundleFile);const isLikeServerless=(0,_config.isTargetLikeServerless)(target);if(isApiRoute&&isLikeServerless){const serverlessLoaderOptions={page,absolutePagePath,...defaultServerlessOptions};server[(0,_path.join)('pages',bundleFile)]=`next-serverless-loader?${(0,_querystring.stringify)(serverlessLoaderOptions)}!`;}else if(isApiRoute||target==='server'){server[bundlePath]=[absolutePagePath];}else if(isLikeServerless&&page!=='/_app'&&page!=='/_document'){const serverlessLoaderOptions={page,absolutePagePath,...defaultServerlessOptions};server[(0,_path.join)('pages',bundleFile)]=`next-serverless-loader?${(0,_querystring.stringify)(serverlessLoaderOptions)}!`;}if(page==='/_document'){return;}if(!isApiRoute){client[bundlePath]=`next-client-pages-loader?${(0,_querystring.stringify)({page,absolutePagePath})}!`;}});return{client,server};}