

// 1. Initialize the webserver.  
import denoliver from 'https://deno.land/x/denoliver/mod.ts'
import { UoConfig } from './uoconfig.ts'

server.close() // Close the server
// 2. Check for configuration.  Determine if we are in "bootstrap" mode and if so, start up the UI for configuring the app.
let config: UoConfig = JSON.parse(await Deno.readTextFile(".uoconfig.json"));
if (config === null) {
    // If configuration is invalid, fail to start up.
    // TODO: print message and force quit.
}

if (!config.isConfigured) {
    // In bootstrap mode, serve static assets from /onboarding/static, only bind to localhost:xxxx (use env var for port binding).
    // run the bootstrap app under the admin port.  default admin port is 8042.
    const server = denoliver({ port: 6060, cors: true })

}

// 3. Otherwise, read in the configuration file and bind to a port to start accepting websocket connections.






// Future work: how to change backends.  do you do this manually or does the system handle this? how do you change configuration?
