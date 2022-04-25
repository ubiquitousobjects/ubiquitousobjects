# Overview

Client -> Server communcation in Ubiquitious Objects happens in multiple distinct ways.

## Onboarding with uo-admin
Onboarding is what we call the first initialization phase that is entered automatically when Ubiquitous Objects is started either for local development or when it is missing required configuration elements.  More info can be found here: [onboarding](../onboarding) 

During Onboarding, the client and server communicate over a plain http interface with no certificates or websockets involved.  There is a  single-page application that is served from the webserver only when in onboarding mode.  This communicates with the backend over a regular REST interface.  

`uo-admin` is responsible for the management of the configuration.


Material UI


