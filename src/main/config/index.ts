const DEV_TOOLS = process.env.VUEJS_DEVTOOLS_ISOPEN;
const NODE_ENV = process.env.NODE_ENV;

export const DEV_TOOLS_ISOPEN = () => {
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config();
    return DEV_TOOLS === 'Y' ? true : false;
  }
};
