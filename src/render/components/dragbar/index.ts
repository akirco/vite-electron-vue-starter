
import DragBar from "./dragbar.vue";
DragBar.install = (app: any) => {
  app.component(DragBar.name, DragBar);
};
export default DragBar