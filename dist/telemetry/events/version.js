"use strict";exports.__esModule=true;exports.eventVersion=eventVersion;const EVENT_VERSION='NEXT_CLI_SESSION_STARTED';function eventVersion(event){// This should be an invariant, if it fails our build tooling is broken.
if(typeof "9.1.7-canary.8"!=='string'){return[];}return[{eventName:EVENT_VERSION,payload:{nextVersion:"9.1.7-canary.8",nodeVersion:process.version,cliCommand:event.cliCommand,isSrcDir:event.isSrcDir,hasNowJson:event.hasNowJson,isCustomServer:event.isCustomServer}}];}