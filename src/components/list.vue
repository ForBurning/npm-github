<template>
<vddl-draggable class="form-row-item" :draggable="item" :index="index" :disable-if="!draggable" :wrapper="list" :selected="handleSelect" :class="{'form-row-item-active': selectedItem.id == item.id && draggable, isContainer: item.type === 'container'}">
    <!-- 布局控件 -->
    <div class="component container-row-item" v-if="item.type === 'container'">
        <!-- 删除面板 -->
        <Poptip class="remove-btn" v-if="draggable" confirm="" :title="langs.removeConfirm" placement="top-end" @on-ok="handleDelete(item)" transfer>
            <Icon type="ios-trash-outline widget-trash" :title="langs.remove"></Icon>
        </Poptip>

        <vddl-list class="container-column" v-for="(column, index) in item.columns" :list="column" :allowed-types="allowTypes" :selected="handleSelect" :inserted="handleInsert" :key="index" :class="{'form-row-item-active': selectedItem.id == item.id && draggable}">
            <list v-for="(col, number) in column" :key="number" :index="number" :item="col" :list="column" :draggable="draggable" :selected-item="selectedItem" @handleInsert="handleInsert" @handleSelect="handleSelect">
            </list>
        </vddl-list>
    </div>

    <!-- 文本框组件 -->
    <div class="component" v-if='item.type === "input"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input v-model="item.model" :placeholder="item.placeholder" v-if="draggable" />
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 多行文本框组件 -->
    <div class="component" v-else-if='item.type === "textarea"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input type="textarea" v-model="item.model" :placeholder="item.placeholder" v-if="draggable" />
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 单选下拉框组件 -->
    <div class="component" v-else-if='item.type === "select"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Select v-model="item.model" :placeholder="item.placeholder" v-if="draggable">
                    <Option v-for="m in item.value" :value="m.value" :key="m.label">{{ m.label }}</Option>
                </Select>
                <div class="view-model" v-else>{{item.value.filter(s=>s.value === item.model).length ? item.value.filter(s=>s.value === item.model)[0].label : ''}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 多选下拉框组件 -->
    <div class="component" v-else-if='item.type === "multiple"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Select v-model="item.model" multiple="" :placeholder="item.placeholder" v-if="draggable">
                    <Option v-for="m in item.value" :value="m.value" :key="m.label">{{ m.label }}</Option>
                </Select>
                <div class="view-model" v-else>{{item.model.join(',')}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 单选框组件 -->
    <div class="component" v-else-if='item.type === "radio"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <RadioGroup v-model="item.model" class="ivu-middle-group" v-if="draggable">
                    <Radio v-for="m in item.value" :value="m.value" :label="m.label" :key="m.value" :disabled="item.isCheck"></Radio>
                </RadioGroup>
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 复选框组件 -->
    <div class="component" v-else-if='item.type === "checkbox"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <CheckboxGroup v-model="item.model" class="ivu-middle-group" v-if="draggable">
                    <Checkbox v-for="m in item.value" :value="m.value" :label="m.label" :key="m.value"></Checkbox>
                </CheckboxGroup>
                <div class="view-model" v-else>{{item.model.join(',')}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 日期组件 -->
    <div class="component" v-else-if='item.type === "date"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <DatePicker @on-change="item.model=$event" v-model="item.model" type="date" :format="item.format" :placeholder="item.placeholder" v-if="draggable"></DatePicker>
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 数字输入框组件 -->
    <div class="component" v-else-if='item.type === "inputNumber"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <InputNumber :min="0" v-model="item.model" v-if="draggable"></InputNumber>
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 附件组件 -->
    <div class="component" v-else-if='item.type === "attachment"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag attachment">
                <Upload :headers="uploadHeaders" show-upload-list :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError" :action="item.action" name="file" v-if="draggable">
                    <Button icon="ios-cloud-upload-outline">{{langs.upload}}</Button>
                </Upload>
                <a style="display:inline-block;" target="_blank" :href="item.url" class="file" v-else-if="item.url">{{item.name}}</a>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 邮箱组件 -->
    <div class="component" v-else-if='item.type === "email"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input v-model="item.model" :placeholder="item.placeholder" v-if="draggable">
                <Select v-model="item.prepend" slot="prepend" style="width: 80px">
                    <Option value="http://">http://</Option>
                    <Option value="https://">https://</Option>
                </Select>
                <Select v-model="item.append" slot="append" style="width: 70px" v-show="item.hasSuffix === langs.show">
                    <Option value=".com">.com</Option>
                    <Option value=".cn">.cn</Option>
                </Select>
                </Input>
                <div class="view-model" v-else>{{item.prepend}}{{item.model}}{{item.append}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 超链接组件 -->
    <div class="component" v-else-if='item.type === "link"'>
        <div class="component-title">
            {{item.title}}：
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input v-model="item.model" :placeholder="item.placeholder" v-if="draggable" />
                <a target="_blank" style="display:block;" class="view-model" :href="item.model" v-else>{{item.model}}</a>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 删除组件 -->
    <Poptip v-if='item.type !== "container" && draggable' class="remove-btn" confirm="" :title="langs.removeConfirm" width="184" placement="top-end" @on-ok="handleDelete(item)" transfer>
        <Icon type="ios-trash-outline widget-trash" :title="langs.remove"></Icon>
    </Poptip>
</vddl-draggable>
</template>

<script>
require('intersection-observer')
import Vue from "vue";
import VueLazyComponent from '@xunlei/vue-lazy-component'
Vue.use(VueLazyComponent)
import uuidv1 from 'uuid/v1'
import getLangs from "../lang";

export default {
    name: "list",
    data() {
        return {
            columnKeys: ['l', 'm', 'r'],
            action: '',
            uploadHeaders: {},
            allowTypes: [
                "input",
                "textarea",
                "radio",
                "checkbox",
                "date",
                "inputNumber",
                "email",
                "phone",
                "attachment",
                "select",
                "multiple"
            ],
            langs: {}
        };
    },
    props: [
        "item",
        "list",
        "index",
        "selectedItem",
        "disable",
        "draggable",
        "lang"
    ],
    methods: {
        //文件上传成功
        onSuccess(response, file, fileList) {
            this.item.model = response;
            if (this.item.nameMapping) {
                let name = {};
                Object.assign(name, response);
                this.item.nameMapping.split('.').map(key => {
                    name = name[key];
                })
                this.item.name = name;
            }

            if (this.item.urlMapping) {
                let url = {};
                Object.assign(url, response);
                this.item.urlMapping.split('.').map(key => {
                    url = url[key];
                })
                this.item.url = url;
            }
        },
        //文件上传失败
        onError(error, file, fileList) {
            this.$Message.error(error && error.message || '上传失败！');
        },
        //上传文件之前
        beforeUpload() {
            if (!this.item.action) {
                this.$Message.warning('请先填写该附件的上传地址');
                return false;
            }
        },
        //插入组件
        handleInsert(data) {
            this.$emit('handleInsert', data);
        },
        //选择组件
        handleSelect(item) {
            this.$emit('handleSelect', item);
        },
        //删除组件
        handleDelete(item) {
            this.$emit("handleDelete", item);
        }
    },
    created(){
        this.langs = getLangs(this.lang);
    }
};
</script>

<style lang="less">
.form-row-item {
    padding: 2px 0;
    position: relative;

    &.form-row-item-active {
        background-color: #f9f9f9;

        .remove-btn {
            display: block;
        }
    }

    .component {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        width: 100%;
        padding: 0 50px 0 40px;
        margin: 5px 0;
        min-height: 35px;
        position: relative;

        .component-title {
            width: 100px;
            text-align: right;
            padding-right: 12px;
        }

        .component-content {
            flex: 1;

            .nodrag {
                text-align: left;
            }

            .ivu-upload {
                position: relative;

                .ivu-upload-list {
                    position: absolute;
                    top: 50%;
                    left: 90px;
                    margin-top: -12px;
                }
            }

            .attachment {
                .file {}
            }
        }

        &.container-row-item {
            border: 1px solid #7fcdfd;
            border-left: none;
            border-right: none;

            .container-column {
                flex: 1;
                border-right: 1px solid #7fcdfd;
                min-height: 45px;

                &:last-child {
                    border-right: none;
                }
            }
        }
    }

    .remove-btn {
        display: none;
        position: absolute;
        right: 5px;
        top: 50%;
        margin-top: -10px;

        .widget-trash {
            font-size: 24px;
            color: #ed3f14;
            cursor: pointer;
        }
    }

    .container-column {
        .component {
            padding: 0;
        }
    }
}
</style>
