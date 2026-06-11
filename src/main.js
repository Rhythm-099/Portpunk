import "./style/main.css";
import Experience from "./core/Experience.js";

const canvas = document.querySelector("canvas.webgl");
const experience = new Experience(canvas);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    experience.destroy();
  });
}
