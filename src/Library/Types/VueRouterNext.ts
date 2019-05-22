import Vue             from 'vue';
import { RawLocation } from 'vue-router';

export type VueRouterNext = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void;
