const {execPath,modelsPath}= require("../binPath");


const { spawn } = require("child_process");
const path = require("path");

console.log(execPath,modelsPath);


let inputDir = path.join(__dirname)
let fullfileName = "1.png"
let model = "realesrgan-x4plus"
let scale = 4
const outFile =inputDir+"/" + fullfileName + "_up" + 4 + "x_" + model + ".png";

let upscayl = spawn(
    execPath,
    [
      "-i",
      inputDir + "/" + fullfileName,
      "-o",
      outFile,
      "-s",
      scale === 2 ? 4 : scale,
      "-m",
      modelsPath,
      "-n",
      model,
    ],
    {
      cwd: null,
      detached: false,
    }
  );

  console.log(upscayl);

  let failed = false;
  upscayl.stderr.on("data", (stderr) => {
    console.log(stderr.toString());
    stderr = stderr.toString();
    if (stderr.includes("invalid gpu")) {
      failed = true;
    }
  });