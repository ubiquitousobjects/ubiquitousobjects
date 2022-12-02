import { getId } from "../shared/identifier.ts";
import { Id } from "../shared/identifier.ts";

/*
export type IRequest = {
    action: string;
    payload: any;
}
export type IResponse = {
    // __callTrace: Guid[]; // TODO: populate the request/response GUIDs as well as the elapsed spans of each function. Should this be in the response object though?
    payload: any; // TODO: the function signature needs to be converted to type guards to enforce the function request and response types.
}*/

export type FunctionCacheEntry = {type: "wasm", function: Uint8Array};

const FunctionCache: Record<string, Record<Id, FunctionCacheEntry>> = {};

const functionRequestQueue = []
const functionResponseQueue = []


// TODO: define input and output types of functions.



// TODO: version payload and come up with backwards compatibility story for WASM.
// For WASM, client-side, push the WASM runtime down and then push down the function definitions.
// Local dispatcher should be able to call WASM methods just like server side runtime.
// functions can be used for anything - tasks, DB callbacks, event queues, etc.
// TODO: auto track metrics and logs

const validFunctionName = /^[a-zA-Z0-9_\-.]$/;
/**
 * Adds a persistent, versioned function definition for a native JS function.  The version should be a UUID that ties together all components of a given "deployment",
 * eg. all functions, queues, tasks, etc.
 * The latest function is always registered as the tag :latest.
 * @param {string} name
 * @param {Id} version
 * @param {Function} func
 * @returns {string} Sum of x and y
 */
export function addFunction(name:string, version: Id, func: Uint8Array) {
        // TODO: validate version is ULID.

    if (validFunctionName.test(name)) {
        throw new Error("Invalid function definition.  Name contains invalid characters.");
    }

    if (!FunctionCache[name]) FunctionCache[name] = {};
    FunctionCache[name][version] = {type: "wasm", function: func};

    // TODO: persist / rehydrate these to storage layer.
    return true;
};

export function listFunctions() {
    return Object.keys(FunctionCache).sort();
}

export function listFunctionVersions(name: string) {
    if (!FunctionCache[name]) {
        throw new Error("Function could not be found!");
    }
    return Object.keys(FunctionCache[name]).sort();
}

export async function invokeFunction(name: string, version?: Id) {
    if (validFunctionName.test(name)) {
        throw new Error("Invalid function definition.  Name contains invalid characters.");
    }
    let targetFunction: Uint8Array | undefined = undefined;

    // TODO: validate version is ULID.
    if (!FunctionCache[name]) {
        throw new Error("Function could not be found!");
    }
    if (!version) {
        const allVersions = Object.keys(FunctionCache[name]);
        if (allVersions.length === 0)
        {
            throw new Error(`No versions of function ${name} available!`);
        }
        // TODO: speed this up by maintaining the 'latest' anytime an item is inserted or updated in cache so we don't have to scan version list.
        targetFunction = FunctionCache[name][allVersions.sort()[allVersions.length - 1]].function;
    }
    else {
        targetFunction = FunctionCache[name][version].function;
    }
    if (!targetFunction){
        throw new Error(`No versions of function ${name} available!`);
    }
         
    // TODO: create a webworker and a promise and resolve after function is complete.
      const wasmModule = new WebAssembly.Module(targetFunction);
      
      const wasmInstance = new WebAssembly.Instance(wasmModule);
      
      const main = wasmInstance.exports.main as CallableFunction;
      return main();
}


