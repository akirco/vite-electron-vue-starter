import ipcRenderer from '../utils/ipcRenderer';

class OneWayBackend {
    setPath(path: string) {
        ipcRenderer.send("setPath", path);
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