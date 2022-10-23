

// 1. Initialize the webserver.  
import { Drash } from "./deps.ts"


import { Config } from './config.ts'
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
    console.log('here1')
    startServer()
    // server.close() // Close the server
    console.log('here2')
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

// Test WASM tasks.
await addTask({schedule: "0 30 * * * * ?", action: "wasm:python_test"})
await addTask({schedule: "0 30 * * * * ?", action: "wasm:rust"})
await addTask({schedule: "0 30 * * * * ?", action: "wasm:dotnet"})



// Future work: how to change backends.  do you do this manually or does the system handle this? how do you change configuration?
