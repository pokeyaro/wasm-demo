package main

import (
	"fmt"
	"syscall/js"

	"wasm/fibonacci"
)

func FibArray() js.Func {
	fmt.Println("[wasm] Mounted FibArray.")
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) > 0 {
			length := args[0].Int()
			return fibonacci.ArrayResult(length)
		}
		return js.Undefined()
	})
}

func main() {
	c := make(chan struct{}, 0)

	// Set sets the JavaScript property p of value v to ValueOf(x). It panics if v is not a JavaScript object.
	// ValueOf returns x as a JavaScript value:
	//| Go                     | JavaScript             |
	//| ---------------------- | ---------------------- |
	//| js.Value               | [its value]            |
	//| js.Func                | function               |
	//| nil                    | null                   |
	//| bool                   | boolean                |
	//| integers and floats    | number                 |
	//| string                 | string                 |
	//| []interface{}          | new array              |
	//| map[string]interface{} | new object             |
	js.Global().Set("fibArray", FibArray())

	<-c
}
