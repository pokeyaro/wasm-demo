import { Options } from '@/types/global';

export type langProps = 'js' | 'go' | 'rust';

export interface langOptions extends Partial<Options> {
  disabled: boolean;
}
