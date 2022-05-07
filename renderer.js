//渲染进程

if (window.selfApi.desktop) {
  console.log("selfApi")
}


//dark mode
document.getElementById("toggle-dark").addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle();
  let titleBar = document.getElementById("titleBar");
  if (isDarkMode) {
    titleBar.style.backgroundColor = "#333333";
    titleBar.style.borderBottom = "1px inset #3c3f41"
  } else {
    titleBar.style.backgroundColor = "#f6f6f6";
    titleBar.style.borderBottom = "1px inset #ddd"
  }
})


document.getElementById("reset-system").addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle();
  let titleBar = document.getElementById("titleBar");
  if (!isDarkMode) {
    titleBar.style.backgroundColor = "#ebebeb";
    titleBar.style.borderBottom = "1px inset #ddd"
  }
  await window.darkMode.system();
})

//titleBar
document.getElementById("titleBar-close").addEventListener('click', async () => {
  window.close();
})

document.getElementById("titleBar-maxSize").addEventListener('click', async () => {
  await window.titleBarAction.maxWindow();
})

document.getElementById("titleBar-minSize").addEventListener('click', async () => {
  await window.titleBarAction.minWindow();
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
    setTitleBar(`titleBar-${tag}`, "#e6c029")
  }
  if (tag === "minSize") {
    setTitleBar(`titleBar-${tag}`, "#52c22b")
  }
}
