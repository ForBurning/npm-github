import neoForm from './components/form.vue'

const neoform = {
    install(Vue, options) {
        Vue.component(neoForm.name, neoForm);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(neoform);
}

export default neoForm;