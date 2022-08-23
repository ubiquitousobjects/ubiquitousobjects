
export type PortBindings = {
    onboarding: number,
    admin: number
}

export type Config = {
        portBindings: PortBindings;
        isConfigured: boolean;

}

export defaultConfig = {
    "portBindings": {
        "onboarding": 8042,
        "admin": 11798
    },
    "isConfigured": false
}