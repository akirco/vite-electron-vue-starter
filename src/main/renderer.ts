// @ts-nocheck
// @ts-ignore
// 隔离上下文
if (window.selfApi.window) {
}

//titleBar
document.getElementById("titleBar-close").addEventListener('click', async () => {
    window.close();
})

document.getElementById("titleBar-maxSize").addEventListener('click', async () => {
    // @ts-ignore
    console.log("max")
    await window.titleBarAction.maxWindow();
})

document.getElementById("titleBar-minSize").addEventListener('click', async () => {
    // @ts-ignore
    console.log("min")
    await window.titleBarAction.minWindow();
})

document.getElementById('click').addEventListener('click',async ()=>{
    const filters = [
        { usbVendorId: 0x2341, usbProductId: 0x0043 },
        { usbVendorId: 0x2341, usbProductId: 0x0001 }
    ];
    try {
        const port = await navigator.serial.requestPort({filters});
        const portInfo = port.getInfo();
        document.getElementById('device-name').innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `
    } catch (ex) {
        if (ex.name === 'NotFoundError') {
            document.getElementById('device-name').innerHTML = 'Device NOT found'
        } else {
            document.getElementById('device-name').innerHTML = ex
        }
    }
})



const setTitleBar = (selector, bgColor) => {
    const element = document.getElementById(selector)
    if (element) {
        element.onmouseover = () => {
            element.style.cursor = 'pointer';
            element.style.background = "#ccc";
        }
        element.onmouseleave = () => {
            element.style.background = bgColor;
        }
    }
}
for (let tag of ["close", "maxSize", "minSize"]) {
    if (tag === "close") {
        setTitleBar(`titleBar-${tag}`, "#ff5a52")
    }
    if (tag === "maxSize") {
        setTitleBar(`titleBar-${tag}`, "#52c22b")
    }
    if (tag === "minSize") {
        setTitleBar(`titleBar-${tag}`, "#e6c029")
    }
}
