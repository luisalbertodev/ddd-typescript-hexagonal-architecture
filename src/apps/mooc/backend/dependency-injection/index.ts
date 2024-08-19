// import { Container } from "typedi";

import { configureDevelopmentContainer } from "./development";
import { configureProductionContainer } from "./production";

export function configureContainer(): void {
  const env = process.env.NODE_ENV ?? "dev";

  if (env === "dev") {
    configureDevelopmentContainer();
  } else if (env === "production") {
    configureProductionContainer();
  } else {
    throw new Error(`Unknown environment: ${env}`);
  }
}

// export default Container;
