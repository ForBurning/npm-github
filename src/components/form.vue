<template>
<div class="neo-form" :style="{height}">
    <Row type="flex" class="neo-body">
        <Col class="left-section" v-if="isDesign">
        <Tabs value="tab1" size="small">
            <TabPane :label="langs.fieldsTxt" name="tab1">
                <div class="new-elements">
                    <div class="panel panel--info">
                        <vddl-draggable class="button draggable-button" :title="langs.dragToCanvas" v-for="item in modals" :key="item.id" :draggable="item" :type="item.type" effect-allowed="copy">
                            {{item.title}}
                            <Icon :type="item.icon" />
                        </vddl-draggable>
                    </div>
                </div>
            </TabPane>
            <TabPane :label="langs.layoutTxt" name="tab2">
                <div class="new-elements">
                    <div class="panel panel--info">
                        <vddl-draggable class="button" :title="langs.dragToCanvas" v-for="item in containers" :key="item.id" :draggable="item" effect-allowed="copy">
                            {{item.title}}
                            <span class="column-2"></span>
                        </vddl-draggable>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        </Col>
        <Col class="middle-section">
        <div v-bar class="content" :class="{shadow: isDesign}">
            <div>
                <div class="form">
                    <slot name="preset-fields" class="preset-fields"></slot>
                    <vddl-list class="custom-fields" :list="data" :inserted="handleInsert" effect-allowed="move">
                        <list v-for="(item, index) in data" :domain="domain" :mode="mode" :key="item.id" :item="item" :index="index" :list="data" :selected-item="selectedItem" @handleInsert="handleInsert" @handleSelect="handleSelect" @handleDelete="handleDelete" :header="header" :lang="lang" :hasColon="hasColon" :uploadAction="uploadAction">
                        </list>
                    </vddl-list>
                </div>
            </div>
        </div>
        </Col>
        <Col class="right-section" v-if="isDesign">
        <Tabs>
            <TabPane :label="langs.setting" name="1">
                <div v-if="selectedItem.id">
                    <div class="widget-option" v-if="selectedItem.id">
                        <div class="sub-title">{{langs.title}}</div>
                        <Input v-model="selectedItem.title" />
                    </div>

                    <div class="widget-option" v-if="placeholderWidget.includes(selectedItem.type)">
                        <div class="sub-title">{{langs.defaultVal}}</div>
                        <Input v-model="selectedItem.placeholder" />
                    </div>

                    <div class="widget-option" v-if="optionsWidget.includes(selectedItem.type)">
                        <div class="sub-title">{{langs.optionsTxt}}</div>
                        <Input v-model="item.label" v-for="item in selectedItem.value" :key="item.value">
                        <Button slot="prepend" icon="md-remove" @click="handleMinusOption(item.value)"></Button>
                        <Button slot="append" icon="md-add" @click="handleAddOption"></Button>
                        </Input>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='date'">
                        <div class="sub-title">{{langs.dateFormat}}</div>
                        <RadioGroup v-model="selectedItem.format" vertical>
                            <Radio :label="item" v-for="(item, index) in selectedItem.formatOptions" :key="index">
                                <span>{{item}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='inputNumber'">
                        <div class="sub-title">{{langs.numberType}}</div>
                        <RadioGroup v-model="selectedItem.format" vertical>
                            <Radio :label="item" v-for="(item, index) in selectedItem.formatOptions" :key="index">
                                <span>{{item}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='email'">
                        <div class="sub-title">{{langs.mailSuffix}}</div>
                        <RadioGroup v-model="selectedItem.hasSuffix" vertical>
                            <Radio :label="item" v-for="(item, index) in selectedItem.suffixOptions" :key="index">
                                <span>{{item }}</span>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='attachment'">
                        <div class="sub-title">{{langs.actionTxt}}</div>
                        <Input type="text" v-model="selectedItem.action" />
                        <div class="sub-title">fileName</div>
                        <Input type="text" v-model="selectedItem.fileName" />
                        <div class="sub-title">{{langs.nameMapping}}（eg: .a.b）</div>
                        <Input type="text" v-model="selectedItem.nameMapping" />
                        <div class="sub-title">{{langs.urlMapping}}（eg: .a.b）</div>
                        <Input type="text" v-model="selectedItem.urlMapping" />
                    </div>
                </div>
                <div v-else>
                    <Alert type="warning" show-icon>
                        <h4>{{langs.selectComponent}}</h4>
                        <template slot="desc">
                        </template>
                    </Alert>
                </div>
            </TabPane>
        </Tabs>
        </Col>
    </Row>
</div>
</template>

<script>
import Vue from "vue";
import iView from "view-design";
import VueI18n from 'vue-i18n';
import en from 'view-design/dist/locale/en-US';
import zh from 'view-design/dist/locale/zh-CN';
Vue.use(VueI18n);
import 'view-design/dist/styles/iview.css';
Vue.use(iView);

Vue.locale('en-US', en);
Vue.locale('zh-CN', zh);

import Vddl from "vddl"
Vue.use(Vddl);
import Vuebar from 'vuebar'
Vue.use(Vuebar);

import list from "./list.vue"
import getLangs from "../lang";
import getContainers from "../modal/containers";
import getModals from "../modal/modals";

export default {
    name: "neoCustomForm",
    props: {
        uploadAction:{
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '100%'
        },
        data: {
            type: Array,
            default: () => []
        },
        //design, edit, view
        mode: {
            type: String,
            default: 'design'
        },
        lang: {
            type: String,
            default: 'zh-CN'
        },
        langPackage: {
            type: String,
            default: () => {}
        },
        header: {
            type: Function,
            default: () => {}
        },
        hasColon: {
            type: Boolean,
            default: false
        },
        domain:{
           type: String,
           default: () => {} 
        }
    },
    data() {
        return {
            selectedItem: {},
            optionsWidget: ['select', 'multiple', 'radio', 'checkbox'],
            placeholderWidget: ['input', 'textarea'],
            langs: {},
            containers: {},
            modals: {},
            isDesign: this.mode === 'design'
        }
    },
    components: {
        list
    },
    methods: {
        //插入组件
        handleInsert(data) {
            data.item.id = new Date().getTime();
            this.selectedItem = data.item;
        },
        //选中组件
        handleSelect(item) {
            this.selectedItem = item;
        },
        //递归删除选定组件
        deleteComponent(data, item, parent, index) {
            if (data.id === item.id) {
                parent.splice(index, 1);
            }else if (Array.isArray(data)) {
                data.map((child, index) => this.deleteComponent(child, item, data, index));
            } else if (data.columns) {
                Object.values(data.columns).map((child, index) => this.deleteComponent(child, item));
            }
        },
        //删除组件
        handleDelete(item) {
            this.deleteComponent(this.data, item);
            this.$nextTick(() => {
                this.selectedItem = {};
            })
        },
        //增加option选项
        handleAddOption() {
            this.selectedItem.value.push({
                value: `${this.langs.option}${this.selectedItem.value.length + 1}`,
                label: `${this.langs.option}${this.selectedItem.value.length + 1}`
            });
        },
        //减去option选项
        handleMinusOption(value) {
            this.selectedItem.value = this.selectedItem.value.filter(
                option => option.value !== value
            );
        }
    },
    created() {
        this.langs = Object.assign({}, getLangs(this.lang), this.langPackage);
        Vue.config.lang = this.lang;
        this.containers = getContainers(this.langs);
        this.modals = getModals(this.langs);
    }
};
</script>

<style lang="less">
html,
body {
    margin: 0;
    height: 100%;
    width: 100%;
}

.neo-form {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 0 6px;
    background-color: #fff;

    .neo-body {
        height: 100%;
        flex-wrap: nowrap;

        .left-section {
            width: 173px;

            .new-elements {
                .button {
                    font-size: 13px;
                    line-height: 28px;
                    color: #666;
                    margin: 6px 2%;
                    border: 1px dashed #999;
                    padding: 5px 5px 5px 15px;
                    border-radius: 2px;
                    transition: background .15s ease-in-out;
                    background-color: #f5f5f5;
                    position: relative;
                    z-index: 100;
                    cursor: move;
                    text-align: left;

                    .ivu-icon {
                        float: right;
                        font-size: 18px;
                        margin: 5px 7px 0 0;
                    }
                }
            }

        }

        .middle-section {
            flex: 1 0 0%;
            padding: 0 12px;
            // height: 100%;

            .content {
                position: relative;
                height: 100%;
                background-color: #fff;

                &.shadow {
                    border: 1px solid #ccc;
                    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                }

                .form {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding-top: 12px;

                    .preset-fields {
                        flex-shrink: 0;
                    }

                    .custom-fields {
                        flex: 1 0 auto;
                    }

                    .vddl-placeholder {
                        width: 98%;
                        height: 60px;
                        border: 1px dashed #ed3f14;
                        background: #fff;
                        margin: 2px 1%;
                        box-sizing: border-box;
                    }
                }

                .vb-dragger {
                    right: 0;
                    border-radius: 20px;
                    width: 6px;
                    background: rgba(158, 158, 158, 0.64);
                    display: none;
                }

                &:hover {
                    .vb-dragger {
                        display: block;
                    }
                }
            }

        }

        .right-section {
            width: 173px;

            .sub-title {
                text-align: left;
            }

            .ivu-input-wrapper {
                margin: 8px 0;
            }

            .ivu-alert-message {
                h4 {
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
    }
}
</style>
