<template>
  <div class="container">
    <h1>{{ props.msg }}</h1>
    <a-radio-group v-model="method" :options="options">
      <template #label="{ data }">
        <a-tag>{{ data.label }}</a-tag>
      </template>
    </a-radio-group>
    <div class="box">
      <a-input
        v-model="inputValue"
        placeholder="Please enter a number"
        allow-clear
        @change="handleChange"
      />
    </div>
    <div class="result" v-if="isVisible">
      <h1>Fibonacci Sequence: </h1>
      <div>{{ fibonacciList }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import Logger from '@/utils/logger';
  import BigInteger from 'big-integer';
  import { generateFibonacciList } from './fibonacci';
  import type { langOptions, langProps } from './types';
  import { FibArray } from '@/../wasm';

  defineOptions({
    name: 'Fibonacci',
    inheritAttrs: false,
  });

  const props = defineProps({
    msg: {
      type: String,
      default: 'Calculate Fibonacci',
    },
  });

  const inputValue = ref<any>();
  const fibonacciList = ref<number[]>([]);
  const isVisible = computed(() => {
    return fibonacciList.value.length > 0
  });
  const method = ref<langProps>('js');
  const options = reactive<langOptions[]>([
    { label: 'JavaScript', value: 'js', disabled: false },
    { label: 'Wasm (Go)', value: 'go', disabled: false },
    { label: 'Wasm (Rust)', value: 'rust', disabled: true },
  ]);

  /**
   * 假设这里是一段非常复杂的业务计算逻辑
   * 你会选择哪种方式呢？
   * 1. js
   * 2. api
   * 3. wasm
   */
  const handleChange = (value: string) => {
    // Clear result array
    if (fibonacciList.value.length > 0) {
      fibonacciList.value = [];
    }

    // Check for null value
    if (value.trim() === '') {
      Message.info('Please enter a valid value');
      return;
    }

    // Check if it is a number
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      Message.info('Please enter Number type');
      return
    }

    // Process decimals and round them
    const roundedValue = Math.round(numberValue);
    if (roundedValue != numberValue) {
      Message.info('Values are automatically rounded');
      setTimeout(() => {
        inputValue.value = roundedValue;
      }, 500)
    }

    // Print colored logs on the console
    switch (method.value === 'js') {
      case roundedValue >= 0 && roundedValue <= 19:
        Logger.info('Range is 0-19');
        break;
      case roundedValue >= 20 && roundedValue <= 49:
        Logger.success('Range is 20-49');
        break;
      case roundedValue >= 50 && roundedValue <= 79:
        Logger.warn('Range is 50-79');
        break;
      case roundedValue >= 80:
        // Loss of precision in javascript
        Logger.panic('Range is >= 80');
        break;
      default:
        Logger.debug('Input value cannot be negative');
        break;
    }

    // Calculate
    if (method.value === 'js') {
      Message.success('JavaScript Calculation');
      fibonacciList.value = generateFibonacciList(roundedValue);
    } else if (method.value === 'go') {
      Message.success('WebAssembly Calculation');
      fibonacciList.value = FibArray(roundedValue).map(num => new BigInteger(num));
    } else {
      Message.warn('Unsupported Calculation');
    }
  };
</script>

<style scoped>
  .container {
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 800px;
    overflow: auto;
  }

  .box {
    width: 600px;
    height: 300px;
    border: 1px solid var(--color-border-4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .result > div{
    max-width: 580px;
  }

  :deep(.arco-radio-group .arco-radio) {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  :deep(.arco-input-wrapper) {
    width: 320px;
  }
</style>
