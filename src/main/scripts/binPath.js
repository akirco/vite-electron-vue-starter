const { resolve, join }=require('path')
const getPlatform = require('./getPlatform')
// const isDev = require("electron-is-dev");

console.log(process.execPath);

// const binariesPath = isDev
//   ? join(appRootDir.get(), "resources", getPlatform(), "bin")
//   : join(dirname(appRootDir.get()), "..", "Resources", "bin");

// const execPath = path.resolve(path.join(binariesPath, "./upscayl"));
// const modelsPath = isDev 
//   ? path.resolve(path.join(binariesPath, "../../models"))
//   : path.resolve(path.join(binariesPath, "../models"))

// module.exports = { execPath, modelsPath };