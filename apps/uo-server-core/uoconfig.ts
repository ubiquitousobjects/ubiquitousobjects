
export type PortBindings = {
    onboarding: number,
    admin: number
}

export type UoConfig = {
        portBindings: PortBindings;
        isConfigured: boolean;
    }
}