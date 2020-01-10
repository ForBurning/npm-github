import 'babel-polyfill'
import neoCustomForm from './components/form.vue'

const neocustomform = {
    install(Vue, options) {
        Vue.component(neoCustomForm.name, neoCustomForm);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(neocustomform);
}

export default neoCustomForm;