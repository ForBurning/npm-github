import neoTable from './components/neoTable.vue'

const vueNeoTable = {
    install(Vue, options) {
        Vue.component(neoTable.name, neoTable);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueNeoTable);
}

export default neoTable;