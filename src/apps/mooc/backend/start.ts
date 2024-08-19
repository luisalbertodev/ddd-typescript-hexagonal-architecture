import "reflect-metadata";

import { configureContainer } from "./dependency-injection";
import { MoocBackendApp } from "./MoocBackendApp";

try {
  configureContainer();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  new MoocBackendApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on("uncaughtException", err => {
  console.log("uncaughtException", err);
  process.exit(1);
});
