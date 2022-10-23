
// Metrics are used for capturing metadata about the current-running system.  
// Logs are use to aggregate information to external systems.



// TODO: import a logging module that can do structured logging, log templating, etc, like pino?

export const logDebug = (error: Error, message: string) => {
    console.error
}


export const logInfo = (error: Error, message: string) => {
    console.info()
}
export const logWarn = (error: Error, message: string) => {
    console.error
}
export const logError = (error: Error, message: string) => {
    console.error
}