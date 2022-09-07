import ipcRenderer from '../utils/ipcRenderer';

class OneWayBackend {
    setOutputPath(path: string) {
        ipcRenderer.send("setOutputPath", path);
    }
    setImagePath(path: string) {
        ipcRenderer.send("setImagePath", path);
    }
}
class BothWayCommunicate {

}

const oneWayBackend = new OneWayBackend();
const bothWayCommunicate = new BothWayCommunicate()
export default {
    oneWayBackend,
    bothWayCommunicate
}