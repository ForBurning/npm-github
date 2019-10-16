<template>
<div class="neo-form" :style="{height}">
    <Row type="flex" class="neo-body">
        <Col class="left-section" v-if="draggable">
        <Tabs value="tab1" size="small">
            <TabPane label="字段控件" name="tab1">
                <div class="new-elements">
                    <div class="panel panel--info">
                        <vddl-draggable class="button draggable-button" title="拖拽到页面中央" v-for="item in modals" :key="item.id" :draggable="item" :type="item.type" effect-allowed="copy">
                            {{item.title}}
                            <Icon :type="item.icon" />
                        </vddl-draggable>
                    </div>
                </div>
            </TabPane>
            <TabPane label="布局控件" name="tab2">
                <div class="new-elements">
                    <div class="panel panel--info">
                        <vddl-draggable class="button" title="拖拽到页面中央" v-for="item in containers" :key="item.id" :draggable="item" type="container" effect-allowed="copy">
                            {{item.title}}
                            <span class="column-2"></span>
                        </vddl-draggable>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        </Col>
        <Col class="middle-section">
        <div v-bar class="content" :class="{shadow: draggable}">
            <div>
                <div class="form">
                    <slot name="preset-fields"></slot>
                    <vddl-list class="custom-fields" :list="formData" :inserted="handleInsert" effect-allowed="move">
                        <list ref="list" v-for="(item, index) in formData" :draggable="draggable" :key="index" :item="item" :index="index" :list="formData" :selected-item="selectedItem" @handleInsert="handleInsert" @handleSelect="handleSelect" @handleDelete="handleDelete">
                        </list>
                    </vddl-list>
                </div>
            </div>
        </div>
        </Col>
        <Col class="right-section" v-if="draggable">
        <Tabs>
            <TabPane label="模块设置" name="1">
                <div v-if="selectedItem.id">
                    <div class="widget-option" v-if="selectedItem.id">
                        <div class="sub-title">标题</div>
                        <Input v-model="selectedItem.title" />
                    </div>

                    <div class="widget-option" v-if="placeholderWidget.includes(selectedItem.type)">
                        <div class="sub-title">默认值</div>
                        <Input v-model="selectedItem.placeholder" />
                    </div>

                    <div class="widget-option" v-if="optionsWidget.includes(selectedItem.type)">
                        <div class="sub-title">选项设置</div>
                        <Input v-model="item.label" v-for="item in selectedItem.value" :key="item.value" @on-blur="handleBlur($event, item)">
                        <Button slot="prepend" icon="md-remove" @click="handleMinusOption(item.value)"></Button>
                        <Button slot="append" icon="md-add" @click="handleAddOption"></Button>
                        </Input>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='date'">
                        <div class="sub-title">日期格式</div>
                        <RadioGroup v-model="selectedItem.format" vertical>
                            <Radio :label="item" v-for="(item, index) in selectedItem.formatOptions" :key="index">
                                <span>{{item}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='inputNumber'">
                        <div class="sub-title">数字类型</div>
                        <RadioGroup v-model="selectedItem.format" vertical>
                            <Radio :label="item" v-for="(item, index) in selectedItem.formatOptions" :key="index">
                                <span>{{item}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='email'">
                        <div class="sub-title">邮箱后缀</div>
                        <RadioGroup v-model="selectedItem.hasSuffix" vertical>
                            <Radio :label="item" v-for="(item, index) in selectedItem.suffixOptions" :key="index">
                                <span>{{item }}</span>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div class="widget-option" v-if="selectedItem.type==='attachment'">
                        <div class="sub-title">上传地址（必填）</div>
                        <Input type="url" v-model="selectedItem.action" />
                        <div class="sub-title">文件名称映射（eg: .a.b）</div>
                        <Input type="url" v-model="selectedItem.nameMapping" />
                        <div class="sub-title">文件地址映射（eg: .a.b）</div>
                        <Input type="url" v-model="selectedItem.urlMapping" />
                    </div>
                </div>
                <div v-else>
                    <Alert type="warning" show-icon>
                        <h4>请先选择控件</h4>
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
import iView from "iview";
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import Vddl from "vddl"
Vue.use(Vddl);
import Vuebar from 'vuebar'
Vue.use(Vuebar);
import modals from "../modal/modals";
import containers from "../modal/containers";
import list from "./list.vue"

export default {
    name: "neoForm",
    props: {
        height: {
            type: String,
            default: '100%'
        }
    },
    data() {
        return {
            modals,
            containers,
            formData: [],
            draggable: true,
            selectedItem: {},
            optionsWidget: ['select', 'multiple', 'radio', 'checkbox'],
            placeholderWidget: ['input', 'textarea'],
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
        //删除组件
        handleDelete(item) {
            let formData1 = [];
            this.formData.forEach((component, index) => {
                if (component.id) {
                    if (component.type === 'container') {
                        if (component.id !== item.id) {
                            for (let i in component.columns) {
                                if (component.columns[i][0] && component.columns[i][0].id === item.id) {
                                    component.columns[i] = [];
                                }
                            }
                        }
                    } else if (component.id !== item.id) {
                        formData1.push(component);
                    }
                }
            });
            this.formData = formData1;
            setTimeout(() => {
                this.selectedItem = {};
            }, 0);
        },
        handleBlur(event, item) {
            item.value = event.target.value
        },
        //增加option选项
        handleAddOption() {
            this.selectedItem.value.push({
                value: `选项${this.selectedItem.value.length + 1}`,
                label: `选项${this.selectedItem.value.length + 1}`
            });
        },
        //减去option选项
        handleMinusOption(value) {
            this.selectedItem.value = this.selectedItem.value.filter(
                option => option.value !== value
            );
        }
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
            flex: 1 0 auto;
            padding: 0 12px;
            height: 100%;

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

                &:hover{
                    .vb-dragger{
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
        }
    }
}
</style>
