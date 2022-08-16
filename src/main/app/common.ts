import {screen} from 'electron';
import type {Size} from 'electron'

const resize = (): Size => {
    const size = screen.getPrimaryDisplay().bounds;
    let width = size.width*0.9-200;
    let height = size.height*0.9- 120;
    return {
        width,
        height
    }
}
const isFrame=()=>{
    return process.platform === "win32" ? false : true;
}

export {resize,isFrame}