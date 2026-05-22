import { accessSync } from "node:fs";

[
  "index.html",
  "styles.css",
  "app.js",
  "assets/car_factory_dilemma.png",
  "assets/soul_passing_orb.png",
  "assets/ai_driving_viz.png",
  "assets/ai_cockpit_viz.png",
  "assets/ai_assistant_viz.png",
  "assets/agent_iteration_viz.png",
  "assets/cloud_loop_viz.png",
  "assets/value_prop_grid.png",
  "assets/closing_vision_viz.png"
].forEach((file) => accessSync(file));

console.log("SmartEV static build check passed.");
