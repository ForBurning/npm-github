# Table

#### 功能列表
	- 自动分页
	- 手动调整列宽
	- 显示或隐藏列
	- 导出表格数据到csv
	- 支持静态或动态绑定数据
	
#### 待加功能
	- 通过col.type格式化列（控件包括button，CheckBox，select，date等常用组件）
	- 开启表格编辑功能
#### 示图
[![demo](https://raw.githubusercontent.com/ForBurning/vue-fly/master/table.png "demo")](https://raw.githubusercontent.com/ForBurning/vue-fly/master/table.png "demo")


#### 安装方式
     <script src="./neoTable.min.js"></script>
     npm install --save @neotrident/neo-table
    

#### 示例

   ```javascript
<template>
<div id="app">
    <neo-table :columns="columns" :data="getData" ref="table" showExport resizable>
        <span slot="tool-btns"></span>
        <template slot-scope="{ row }" slot="name">
            <Button>{{row.name}}</Button>
        </template>
    </neo-table>
</div>
</template>

<script>
import neoTable from './components/neoTable.vue'

export default {
    name: 'app',
    components: {
        neoTable
    },
    data() {
        return {
            exportOpts: {
                columns: [{
                        title: 'Age',
                        key: 'age',
                    },
                    {
                        title: 'Address',
                        key: 'address',
                    }
                ]
            },
            columns: [{
                    type: 'selection',
                    width: 50
                }, {
                    title: 'Name',
                    slot: 'name',
                    visible: true,
                    sortable: 'true'
                },
                {
                    title: 'Age',
                    key: 'age',
                },
                {
                    title: 'Address',
                    key: 'address',
                }
            ],
            data: [{
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
        }
    },
    methods: {
        getData(d) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        rows: this.data,
                        total: 30
                    })
                }, 400)
            })
        }
    }
}
</script>
```
    
#### API
##### Table Props
| 属性  | 说明  | 类型    |    默认值    |
| ------------ | ------------ | ------------ |  ------------    |
|  data | 表格数据源  | [Array, Function]  | []  |
|  mapping | 远程返回的数据结构的字段映射  | Object  | {rows: 'rows',total: 'total'}  |
|  resizable | 列宽是否可手动调整  | Boolean  | false  |
|  showExport | 是否显示导出按钮  | Boolean  | false  |
|  exportOpts | 导出方法的参数  | Object  | 详细用法见iview官网  |
|  btnsTxt | 内置的工具栏按钮名称  | Array  | ['导出', '列']  |
|  ...props | 其余列设置，见iview官网  |

##### Column
| 属性  | 说明  | 类型    |    默认值    |
| ------------ | ------------ | ------------ |  ------------    |
|  visible | 列的显隐  | Boolean  | true  |
|  ...props | 其余列设置，见iview官网  |

##### Slot
| 属性  | 说明  
| ------------ | ------------
|  tool-btns | 工具栏插槽

