import { Module } from 'vuex';

export default interface ModuleInterface<S> extends Module<S, S> {}
