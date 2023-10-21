// https://github.com/torch2424/wasm-by-example/blob/master/demo-util/
export const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
    let response = undefined;
    if (!importObject) {
        importObject = {
            env: {
                abort: () => console.log("Abort!")
            }
        };
    }
    // Check if the browser supports streaming instantiation
    if (WebAssembly.instantiateStreaming) {
        // Fetch the module, and instantiate it as it is downloading
        response = await WebAssembly.instantiateStreaming(
            fetch(wasmModuleUrl),
            importObject
        );
    } else {
        // Fallback to using fetch to download the entire module
        // And then instantiate the module
        const fetchAndInstantiateTask = async () => {
            const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
                response.arrayBuffer()
            );
            return WebAssembly.instantiate(wasmArrayBuffer, importObject);
        };
        response = await fetchAndInstantiateTask();
    }
    return response;
};

const go = new Go();

const importObject = go.importObject;

let wasmModule;

export const InitWasm = async () => {
    wasmModule = await wasmBrowserInstantiate("wasm/main.wasm", importObject);
    go.run(wasmModule.instance);
};

export const FibArray = (n: number): string[] => {
    let result;
    try {
        result = Array.from(window.fibArray(n));
    } catch (e) {
        result = 'Error';
    }
    return result;
};
