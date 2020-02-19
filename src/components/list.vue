<template>
<vddl-draggable class="form-row-item" :draggable="item" :index="index" :disable-if="isEdit || isView" :wrapper="list" :selected="handleSelect" :class="{'form-row-item-active': selectedItem.id == item.id && isDesign, isContainer: item.type === 'container'}">
    <!-- 布局控件 -->
    <div class="component container-row-item" v-if="item.type === 'container' || item.type === 'container2' || item.type === 'container3'" :class="{'form-row-item-active': item.hasOwnProperty('columns') && isDesign}">
        <Poptip class="remove-btn" v-if="isDesign" confirm="" :title="langs.removeConfirm" placement="top-end" @on-ok="handleDelete(item)" transfer>
            <Icon type="ios-trash-outline widget-trash" :title="langs.remove"></Icon>
        </Poptip>

        <vddl-list class="container-column" v-for="(column, index) in item.columns" :list="column" :allowed-types="allowTypes" :key="index" :inserted="handleInsert">
            <list v-for="(col, number) in column" :key="number" :index="number" :item="col" :list="column" :domain="domain" :mode="mode" :selected-item="selectedItem" @handleSelect="handleSelect" @handleDelete="handleDelete" :header="header" :lang="lang" :hasColon="hasColon" :uploadAction="uploadAction">
            </list>
        </vddl-list>
    </div>

    <!-- 文本框组件 -->
    <div class="component" v-if='item.type === "input"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input v-model="item.model" :placeholder="item.placeholder" v-if="isDesign || isEdit" />
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 多行文本框组件 -->
    <div class="component" v-else-if='item.type === "textarea"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input type="textarea" v-model="item.model" :placeholder="item.placeholder" v-if="isDesign || isEdit" />
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 单选下拉框组件 -->
    <div class="component" v-else-if='item.type === "select"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Select v-model="item.model" :placeholder="item.placeholder" v-if="isDesign || isEdit" transfer>
                    <Option v-for="m in item.value" :value="m.value" :key="m.label">{{ m.label }}</Option>
                </Select>
                <div class="view-model" v-else>{{item.value.filter(s=>s.value === item.model).length ? item.value.filter(s=>s.value === item.model)[0].label : ''}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 多选下拉框组件 -->
    <div class="component" v-else-if='item.type === "multiple"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Select v-model="item.model" multiple="" :placeholder="item.placeholder" v-if="isDesign || isEdit" transfer>
                    <Option v-for="m in item.value" :value="m.value" :key="m.label">{{ m.label }}</Option>
                </Select>
                <div class="view-model" v-else>{{item.model.join(',')}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 单选框组件 -->
    <div class="component" v-else-if='item.type === "radio"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <RadioGroup v-model="item.model" class="ivu-middle-group" v-if="isDesign || isEdit">
                    <Radio v-for="m in item.value" :label="m.label" :key="m.value" :disabled="item.isCheck"></Radio>
                </RadioGroup>
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 复选框组件 -->
    <div class="component" v-else-if='item.type === "checkbox"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <CheckboxGroup v-model="item.model" class="ivu-middle-group" v-if="isDesign || isEdit">
                    <Checkbox v-for="m in item.value" :label="m.label" :key="m.value"></Checkbox>
                </CheckboxGroup>
                <div class="view-model" v-else>{{item.model.join(',')}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 日期组件 -->
    <div class="component" v-else-if='item.type === "date"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <DatePicker @on-change="item.model=$event" v-model="item.model" type="date" :format="item.format" :placeholder="item.placeholder" v-if="isDesign || isEdit" transfer></DatePicker>
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 数字输入框组件 -->
    <div class="component" v-else-if='item.type === "inputNumber"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <InputNumber :min="0" v-model="item.model" v-if="isDesign || isEdit"></InputNumber>
                <div class="view-model" v-else>{{item.model}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 附件组件 -->
    <div class="component" v-else-if='item.type === "attachment"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag attachment">
                <Upload ref="upload" :on-preview="onPreview" :on-remove="onRemove" :default-file-list="item.defaultList" :headers="uploadHeaders" :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError" :action="uploadAction || item.action" :name="item.fileName" :class="{'view-mode': isView}">
                    <Button icon="ios-cloud-upload-outline">{{langs.upload}}</Button>
                </Upload>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 邮箱组件 -->
    <div class="component" v-else-if='item.type === "email"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input v-model="item.model" :placeholder="item.placeholder" v-if="isDesign || isEdit">
                <Select v-model="item.append" slot="append" style="width: 70px" v-show="item.hasSuffix === langs.show">
                    <Option value=".com">.com</Option>
                    <Option value=".cn">.cn</Option>
                </Select>
                </Input>
                <div class="view-model" v-else>{{item.model}}{{item.append}}</div>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 超链接组件 -->
    <div class="component" v-else-if='item.type === "link"'>
        <div class="component-title">
            {{item.title}}
            <span v-if="hasColon">：</span>
        </div>
        <div class="component-content">
            <vddl-nodrag class="nodrag">
                <Input v-model="item.model" :placeholder="item.placeholder" v-if="isDesign || isEdit">
                <Select v-model="item.prepend" slot="prepend" style="width: 80px">
                    <Option value="http://">http://</Option>
                    <Option value="https://">https://</Option>
                </Select>
                <Select v-model="item.append" slot="append" style="width: 70px">
                    <Option value=".com">.com</Option>
                    <Option value=".cn">.cn</Option>
                </Select>
                </Input>
                <a target="_blank" style="display:block;" class="view-model" :href="(item.prepend||'')+item.model+ (item.append||'')" v-else>{{item.prepend||''}}{{item.model}}{{item.append||''}}</a>
            </vddl-nodrag>
        </div>
    </div>

    <!-- 删除组件 -->
    <Poptip v-if='item.type !== "container" && isDesign' class="remove-btn" confirm="" :title="langs.removeConfirm" width="184" placement="top-end" @on-ok="handleDelete(item)" transfer>
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
import getModals from "../modal/modals";

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
            langs: {},
            attachmentModal: {},
            isDesign: this.mode === 'design',
            isEdit: this.mode === 'edit',
            isView: this.mode === 'view',
        };
    },
    props: {
        uploadAction:{
            type: String,
            default: ''
        },
        item: {
            type: Object,
            default: () => {}
        },
        list: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 0
        },
        selectedItem: {
            type: Object,
            default: () => {}
        },
        mode: {
            type: String,
            default: 'design'
        },
        lang: {
            type: String,
            default: () => 'zh-CN'
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
    methods: {
        //文件上传成功
        onSuccess(response, file, fileList) {
            if (response.code === 100) {
                if (this.item.nameMapping) {
                    let name = {};
                    Object.assign(name, response);
                    this.item.nameMapping.split('.').map(key => {
                        name = name[key];
                    })
                    file.name = name.split('/').pop();
                }

                if (this.item.urlMapping) {
                    let url = {};
                    Object.assign(url, response);
                    this.item.urlMapping.split('.').map(key => {
                        url = url[key];
                    })
                    file.url = url;
                }

                this.item.defaultList = this.$refs.upload.fileList;
            } else {
                this.$Message.warning(response.message);
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            }
        },
        //文件上传失败
        onError(error, file, fileList) {
            this.$Message.error(error && error.message || this.langs.uploaderFail);
        },
        //上传文件之前
        beforeUpload() {
            Object.assign(this.uploadHeaders, this.header());
        },
        //删除文件
        onRemove(file) {
            this.item.defaultList = this.$refs.upload.fileList;
        },
        openFile(url) {
            if (this.domain) {
                url = this.domain + url;
                window.open(url.replace(/#/g, '%23'), '_blank');
            } else {
                window.open(url.replace(/#/g, '%23'), '_blank');
            }
        },
        //点击已上传的文件
        onPreview(file) {
            if (this.item.urlMapping) {
                let url = {};
                Object.assign(url, file.response);
                this.item.urlMapping.split('.').map(key => {
                    url = url[key];
                })
                this.openFile(url);
            } else {
                this.openFile(file.response.ResponseBody || file.response.response);
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
        },
        //兼容附件老数据
        formatOldFileData(data) {
            if (data.model && typeof data.model === 'string') {
                const name = data.model.split('/').pop();
                const {
                    model,
                    defaultList,
                    ...attachmentModalFields
                } = this.attachmentModal;
                Object.assign(defaultList, {
                    name,
                    response: {
                        ResponseBody: data.model
                    },
                    url: data.model
                })

                Object.assign(this.item, {
                    ...attachmentModalFields,
                    defaultList
                })
            }
        }
    },
    created() {
        this.langs = getLangs(this.lang);
        this.attachmentModal = getModals(this.langs).pop();

        if (this.item.type === 'attachment') {
            this.item.fileName = this.item.fileName || this.attachmentModal.fileName;
            this.formatOldFileData(this.item);
        }
    }
};
</script>

<style lang="less">
.form-row-item {
    padding: 2px 0;
    position: relative;

    &.form-row-item-active {
        background-color: #f9f9f9;
        padding-right: 1px;

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
                display: flex;
                align-items: center;

                &.view-mode {

                    .ivu-upload-select,
                    .ivu-upload-list-remove {
                        display: none;
                    }

                    .ivu-upload-list{
                        margin-top: 0;
                    }
                }

                .ivu-upload-list {
                    float: left;

                    .ivu-upload-list-file {
                        float: left;
                    }
                }
            }
        }

        &.container-row-item {

            border-left: none;
            border-right: none;

            &.form-row-item-active {
                border: 1px solid #dcdee2;

                .container-column {
                    border-right: 1px solid #dcdee2;
                }
            }

            .container-column {
                flex: 1;
                min-height: 45px;

                .component {
                    padding-right: 30px;
                }

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
