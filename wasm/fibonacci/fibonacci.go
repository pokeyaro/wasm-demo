package fibonacci

import (
	"fmt"
	"math/big"
)

const (
	fibInt64MaxCount = 93
)

func GenInt64List(length int) []int64 {
	fibList := make([]int64, length)
	if length <= 0 {
		return fibList
	} else if length == 1 {
		fibList[0] = 0
		return fibList
	} else if length == 2 {
		fibList[0] = 0
		fibList[1] = 1
		return fibList
	}

	fibList[0] = 0
	fibList[1] = 1
	for i := 2; i < length; i++ {
		fibList[i] = fibList[i-1] + fibList[i-2]
	}

	return fibList
}

func GenBigIntList(length int) []*big.Int {
	fibList := make([]*big.Int, length)
	if length <= 0 {
		return fibList
	} else if length == 1 {
		fibList[0] = big.NewInt(0)
		return fibList
	} else if length == 2 {
		fibList[0] = big.NewInt(0)
		fibList[1] = big.NewInt(1)
		return fibList
	}

	fibList[0] = big.NewInt(0)
	fibList[1] = big.NewInt(1)
	for i := 2; i < length; i++ {
		fibList[i] = new(big.Int).Add(fibList[i-1], fibList[i-2])
	}

	return fibList
}

func ArrayResult(length int) []interface{} {
	var fibList []interface{}

	if length <= fibInt64MaxCount {
		fmt.Println("[wasm] Calculate using int64")
		int64List := GenInt64List(length)
		for _, num := range int64List {
			fibList = append(fibList, fmt.Sprintf("%d", num))
		}
	} else {
		fmt.Println("[wasm] Calculate using math/big.Int")
		bigIntList := GenBigIntList(length)
		for _, bigNum := range bigIntList {
			fibList = append(fibList, bigNum.String())
		}
	}

	return fibList
}
