const { resolve, join,dirname }=require('path')
const getPlatform = require('./getPlatform')
const isDev = require("electron-is-dev");
const appRootDir = require("app-root-dir");


//! 执行文件目录
const execDir = isDev
  ? join(appRootDir.get(), "src","resources", getPlatform(),'bin')
  : join(dirname(appRootDir.get()), "..", "lib","bin");

//! 执行文件路径 
const execPath = resolve(join(execDir, "RealESRGAN"));

//! models目录
const modelsPath = isDev 
  ? resolve(join(execDir, "../../models"))
  : resolve(join(execDir, "../models"))

console.log(execPath,modelsPath); 

module.exports = { execPath, modelsPath };