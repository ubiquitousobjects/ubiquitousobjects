// 1. Initialize the webserver.
import { Drash } from "./deps.ts";

import { Config } from "./config.ts";
import { getTasks } from "./modules/tasks/index.ts";

// 2. Check for configuration.  Determine if we are in "bootstrap" mode and if so, start up the UI for configuring the app.
let defaultConfigFileName: string = "default.ubconf.json";
let config: Config = JSON.parse(await Deno.readTextFile(defaultConfigFileName));

if (config === null) {
  // If configuration is invalid, fail to start up.
  console.error("Unable to parse configuration file", defaultConfigFileName);
  Deno.exit(1);
}

if (!config.isConfigured) {
  // In bootstrap mode, serve static assets from /onboarding/static, only bind to localhost:xxxx (use env var for port binding).
  // run the bootstrap app under the admin port.  default admin port is 8042.
  // const server = await denoliver({ port: 6060, cors: true })
  console.log("here1");
  startServer();
  // server.close() // Close the server
  console.log("here2");
}

function startServer() {
  class HomeResource extends Drash.Resource {
    public paths = ["/"];

    public POST(request: Drash.Request, response: Drash.Response): void {
      // Check for the param
      const param = request.bodyParam("name");

      // No param passed in? Get out.
      if (!param) {
        throw new Drash.Errors.HttpError(
          400,
          "This resource requires the `name` body param.",
        );
      }

      return response.text(`You passed in the following body param: ${param}`);
    }
  }

  // Create and run your server

  const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,
    protocol: "http",
    resources: [
      HomeResource,
    ],
  });

  server.run();

  console.log(`Server running at ${server.address}.`);
}
// 3. Otherwise, read in the configuration file and bind to a port to start accepting websocket connections.

const task = getTasks("prefix");
// Set up some background tasks

// Validators in input and output should be in TS.
// The executor for the WASM is guaranteed to get already validated JSON
// as well as the user

const wasmCode = new Uint8Array([
  0,
  97,
  115,
  109,
  1,
  0,
  0,
  0,
  1,
  133,
  128,
  128,
  128,
  0,
  1,
  96,
  0,
  1,
  127,
  3,
  130,
  128,
  128,
  128,
  0,
  1,
  0,
  4,
  132,
  128,
  128,
  128,
  0,
  1,
  112,
  0,
  0,
  5,
  131,
  128,
  128,
  128,
  0,
  1,
  0,
  1,
  6,
  129,
  128,
  128,
  128,
  0,
  0,
  7,
  145,
  128,
  128,
  128,
  0,
  2,
  6,
  109,
  101,
  109,
  111,
  114,
  121,
  2,
  0,
  4,
  109,
  97,
  105,
  110,
  0,
  0,
  10,
  138,
  128,
  128,
  128,
  0,
  1,
  132,
  128,
  128,
  128,
  0,
  0,
  65,
  42,
  11,
]);
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const main = wasmInstance.exports.main as CallableFunction;
console.log("wasm:");
console.log(main().toString());

// Test WASM tasks.
// await addTask({schedule: "0 30 * * * * ?", action: "wasm:python_test"})
// await addTask({schedule: "0 30 * * * * ?", action: "wasm:rust"})
// await addTask({schedule: "0 30 * * * * ?", action: "wasm:dotnet"})

import * as fpts from "npm:fp-ts";
import * as t from "npm:io-ts";

const User = t.type({
  userId: t.number,
  name: t.string,
});
const user = User.decode({ userId: 1, name: "test" });
console.log(user);

// Future work: how to change backends.  do you do this manually or does the system handle this? how do you change configuration?
