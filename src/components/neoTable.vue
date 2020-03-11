<template>
<div class="neo-table" @mousemove="handleMouseMove" @mouseup="handleMouseup" :class="{'none-select': moving}">
    <div class="tool-bar">
        <Button icon="md-download" :title="btnsTxt[0]" @click="exportCsv" v-if="showExport"></Button>
        <Dropdown trigger="click" placement="bottom-end" v-if="showHideCol">
            <Button icon="md-apps" :title="btnsTxt[1]" class="col-menu-btn">
                <Icon type="md-arrow-dropdown" />
            </Button>
            <DropdownMenu slot="list">
                <div class="neo-dropmenu">
                    <CellGroup>
                        <Cell v-for="(item, index) in columns" :key="index" v-show="item.type !== 'selection'">
                            <Checkbox :value="item.visible" @on-change="handleMenuChange($event, item, index)" :disabled="item.disabled">{{item.title}}</Checkbox>
                        </Cell>
                    </CellGroup>
                </div>
            </DropdownMenu>
        </Dropdown>
        <slot name="tool-btns"></slot>
    </div>
    <Table :data="data1" :columns="columns1" v-bind="tableProps" ref="table">
        <template slot-scope="{ row, index }" v-for="col in slots" :slot="col.slot">
            <neo-td :data="data1" :index="index" :row="row" :key="col.key" :col="col" v-if="col.hasOwnProperty('type')"></neo-td>
            <slot :row="row" :name="col.slot" v-else></slot>
        </template>
    </Table>
    <Page v-if="pagination" :total="total1" @on-change="onChange" @on-page-size-change="onPageSizeChange" v-bind="$props"></Page>
</div>
</template>

<script>
import Vue from "vue";
import iView from "iview";
import 'iview/dist/styles/iview.css';
Vue.use(iView)
import neoTd from "./neoTd.vue";
import {
    fun
} from "@neotrident/utils"
export default {
    name: "neo-table",
    components: {
        neoTd
    },
    props: {
        columns: {
            type: Array,
            default () {
                return [];
            }
        },
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        },
        maxHeight: {
            type: [Number, String]
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightRow: {
            type: Boolean,
            default: false
        },
        rowClassName: {
            type: Function,
            default () {
                return '';
            }
        },
        noDataText: {
            type: String
        },
        noFilteredDataText: {
            type: String
        },
        disabledHover: {
            type: Boolean
        },
        data: [Array, Function],
        showElevator: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: true
        },
        mapping: {
            type: Object,
            default: () => {
                return {
                    rows: 'rows',
                    total: 'total'
                };
            }
        },
        resizable: {
            type: Boolean,
            default: false
        },
        showExport: {
            type: Boolean,
            default: false
        },
        exportOpts: {
            type: Object,
            default: () => {
                return {
                    filename: 'table.csv',
                    columns: [],
                    noHeader: false,
                    original: true
                }
            }
        },
        //分页
        pagination: {
            type: Boolean,
            default: true
        },
        showSizer: {
            type: Boolean,
            default: false
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizeOpts: {
            type: Array,
            default () {
                return [10, 20, 30, 40];
            }
        },
        showTotal: {
            type: Boolean,
            default: false
        },
        showElevator: {
            type: Boolean,
            default: false
        },
        showSizer: {
            type: Boolean,
            default: false
        },
        prevText: {
            type: String,
            default: ''
        },
        nextText: {
            type: String,
            default: ''
        },
        //i18n
        btnsTxt: {
            type: Array,
            default: () => {
                return ['导出', '列']
            }
        }
    },
    data() {
        return {
            total1: 0,
            data1: [],
            columns1: [],
            columnsWidth: [],
            loading: false,
            pageIndex: 1,
            pageSize1: this.pageSize,
            moving: false,
            movingIndex: 0,
            movingStartX: 0,
            showHideCol: false,
            tableProps: {},
            options:{}
        };
    },
    beforeMount() {
        this.renderHeader();
        this.formatterProps();
        if (this.data.constructor === Function) {
            this.fetchData({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize1,
            });
        } else {
            this.data1 = this.data;
        }
    },
    methods: {
        formatterProps() {
            const {
                data,
                columns,
                ...tableProps
            } = this.$props;
            this.tableProps = tableProps;
        },
        //列显隐
        handleMenuChange(visible, item, index) {
            this.columns[index].visible = visible;
            this.columns1 = this.columns.filter(col => col.visible);
            const highlightCbox = this.columns.filter(col => col.visible && col.type !== 'selection');

            this.columns.map(col => {
                if (highlightCbox.length === 1 && col.visible) {
                    col.disabled = true;
                } else {
                    col.disabled = false;
                }
            })

            this.$delete(this.columns1[this.columns1.length - 1], "width");
            this.$nextTick(() => {
                // this.addWidthToCol();
                this.getColumnsWidth();
            })
        },
        //深拷贝
        getColumnsWidth() {
            const table = this.$refs.table;
            this.columnsWidth = this.deepCopy(table.columnsWidth);
        },
        deepCopy(obj) {
            let objClone = Array.isArray(obj) ? [] : {};
            if (obj && typeof obj === "object") {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] && typeof obj[key] === "object") {
                            objClone[key] = this.deepCopy(obj[key]);
                        } else {
                            objClone[key] = obj[key];
                        }
                    }
                }
            }
            return objClone;
        },
        //格式化header
        initResizeBar(h, params) {
            return h('span', [
                h('span', params.column.title),
                h('span', {
                    'class': 'columns-resize-bar',
                    on: {
                        mousedown: (e) => this.handleMousedown(e, params.index)
                    }
                }),
            ])
        },
        //为列增添resize-bar
        renderHeader() {
            this.showHideCol = this.columns.some(col => col.hasOwnProperty('visible'));

            this.columns.map((column, index) => {
                if (this.resizable) {
                    Object.assign(column, {
                        renderHeader: this.initResizeBar
                    });
                }

                if (!column.hasOwnProperty('visible')) {
                    this.$set(column, "visible", true);
                }

                this.$set(column, "hasInitWidth", column.hasOwnProperty('width'));
            })
            this.columns1 = this.deepCopy(this.columns.filter(col => col.visible !== false));
        },
        //为列增加属性
        addWidthToCol() {
            const table = this.$refs.table;
            this.columns1.map((column, index) => {
                if (!column.hasInitWidth) {
                    this.$set(column, "width", table.columnsWidth[index].width);
                }
            })
        },
        //删除列宽
        deleteWidthFromCol(isSet = true) {
            this.columns1.map((column, index) => {
                if (!column.hasInitWidth) {
                    this.$delete(column, "width");
                }
            })
        },
        //拖动开始前
        handleMousedown(e, movingIndex) {
            this.moving = true;
            this.movingIndex = movingIndex;
            this.movingStartX = e.clientX;
            document.onmousemove = this.handleMouseMove;
            this.addWidthToCol();
            this.getColumnsWidth();
        },
        //拖动开始
        handleMouseMove(e) {
            if (this.moving) {
                fun.throttle(() => {
                    let width = e.clientX - this.movingStartX + this.columnsWidth[this.movingIndex].width;
                    this.columns1[this.movingIndex].width = width;
                }, 100)()
            }
        },
        //拖动结束
        handleMouseup() {
            this.moving = false;
            this.getColumnsWidth();
        },
        //页码
        onChange(pageIndex) {
            this.pageIndex = pageIndex;
            Object.assign(this.options, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize1
            })
            this.fetchData(this.options);
        },
        //每页条数
        onPageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize1 = pageSize;
            Object.assign(this.options, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize1
            })
            this.fetchData(this.options);
        },
        //重新加载
        reload(options = {}) {
            this.pageIndex = 1;
            Object.assign(this.options, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize1,
                ...options
            })
            this.fetchData(this.options);
        },
        //刷新当前页
        refresh() {
            Object.assign(this.options, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize1,
            })
            this.fetchData(this.options);
        },
        //获取所选
        getSelection() {
            return this.$refs.table.getSelection();
        },
        //全选or取消全选
        selectAll(state) {
            this.$refs.table.selectAll(state);
        },
        //导出数据
        exportCsv() {
            let data = this.getSelection();
            data = data.length ? data : this.data1;
            let columns = this.exportOpts.columns.length ? this.exportOpts.columns : this.columns;
            let params = Object.assign({}, this.exportOpts, {
                data,
                columns
            });
            this.$refs.table.exportCsv(params);
        },
        //通过外部方法获取数据
        async fetchData({
            pageIndex = 1,
            pageSize = 10,
            ...options
        }) {
            this.loading = true;
            const resp = await this.data({
                pageIndex,
                pageSize,
                ...options
            });

            this.data1 = resp[this.mapping.rows];
            this.total1 = resp[this.mapping.total];
            this.loading = false;
        },
        on: (function () {
            if (document.addEventListener) {
                return function (element, event, handler) {
                    if (element && event && handler) {
                        element.addEventListener(event, handler, false);
                    }
                };
            } else {
                return function (element, event, handler) {
                    if (element && event && handler) {
                        element.attachEvent('on' + event, handler);
                    }
                };
            }
        })(),
        handleResize() {
            this.deleteWidthFromCol();
        }
    },
    computed: {
        slots: function () {
            return this.columns1.filter(col => col.slot);
        }
    },
    watch:{
        data:{
            handler(){
                setTimeout(() => {
                    this.data1 = this.data;
                }, 0);
            },
            deep: true
        }
    },
    mounted() {
        this.getColumnsWidth();
        this.on(window, 'resize', this.handleResize);
    }
};
</script>

<style lang="less">
.neo-table {
    position: relative;

    &.none-select {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .tool-bar {
        float: right;
        margin-bottom: 6px;

        .ivu-icon-md-arrow-dropdown {
            margin-left: -8px;
        }

        .neo-dropmenu {
            max-height: 300px;
            overflow-y: scroll;
        }

        .ivu-btn .ivu-icon {
            font-size: 14px;
        }

        .ivu-cell {
            text-align: left;
            padding: 5px 16px;
        }

        >button,
        >div {
            margin-left: 10px;
        }
    }

    .ivu-table-wrapper {
        width: 100%;
    }

    .ivu-table {
        th {
            position: relative;
            overflow: initial;

            .columns-resize-bar {
                height: 100%;
                position: absolute;
                right: -4px;
                top: 0px;
                width: 8px;
                cursor: col-resize;
                z-index: 1;
                display: block;
            }
        }
    }

    .ivu-page {
        margin-top: 12px;
        float: right;
    }

    &:after {
        content: "";
        display: block;
        clear: both;
        width: 100%;
        height: 0;
    }
}
</style>
