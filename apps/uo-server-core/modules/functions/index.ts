

// TODO: define input and output types of functions.
// TODO: version payload and come up with backwards compatibility story for WASM.
// For WASM, client-side, push the WASM runtime down and then push down the function definitions.
// Local dispatcher should be able to call WASM methods just like server side runtime.
// functions can be used for anything - tasks, DB callbacks, event queues, etc.
// TODO: auto track metrics and logs
addFunctionDefinition(Func<IRequest, IResponse>);
