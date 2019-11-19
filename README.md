# Table

#### 功能列表
	- 自动分页
	- 手动调整列宽
	- 显示或隐藏列
	- 导出表格数据到csv
	- 支持静态或动态绑定数据
	- 通过col.type格式化列（控件包括input, date, select, radio, checkbox, inputNumber等常用组件）
	
#### 待加功能
	- 暂无
#### 示图
[![demo](https://raw.githubusercontent.com/ForBurning/vue-fly/master/table.png "demo")](https://raw.githubusercontent.com/ForBurning/vue-fly/master/table.png "demo")


#### 安装方式
	 <!--script引入 -->
     <script src="./neoTable.min.js"></script>
	 
	<!-- NPM 安装 -->
     npm install --save @neotrident/neo-table
    

#### 示例
```javascript
<script>
import neoTable from "@neotrident/neo-table"
export default {
  name: "App",
  components: {
    neoTable
  },
  data() {
    return {
      data: [
        {
          name: 'John Brown111',
          sex: 1,
          age: 18,
          merried: [],
          birthday: ''
        },
        {
          name: 'Jim Green',
          sex: 2,
          age: 24,
          merried: [],
          birthday: ''
        },
        {
          name: 'Joe Black',
          sex: -1,
          age: 30,
          merried: ['已婚'],
          birthday: '2019-09-25'
        },
        {
          name: 'Joe Black',
          sex: -1,
          age: 30,
          merried: ['已婚'],
          birthday: '2019-09-25'
        },
        {
          name: 'Joe Black',
          sex: -1,
          age: 30,
          merried: ['已婚'],
          birthday: '2019-09-25'
        }
      ],
      columns: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
          title: '名称',
          slot: 'name',
          width:150
        },
        {
          title: '性别',
          slot: 'sex',
          type:'select',
          options:[{
            label: '男',
            value: 1
          },{
            label: '女',
            value: 2
          }]
        },
        {
          title: '年龄',
          slot: 'age',
          type: 'input',
          props: {
            number: true
          }
        },
        {
          title: '婚姻状况',
          slot: 'merried',
          type: 'checkbox',
          options:['已婚']
        },
        {
          title: '生日',
          slot: 'birthday',
          type: 'date',
          visible: true
        }
      ]
    }
  }
};
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
|  type|列的格式化类型| String，可选input, date, select, radio, checkbox, inputNumber  | - |
|  props | 列的props  | Object  | {}  |
|  options | select, checkbox, radio等初始化数据  | Array  | []  |
|  ...props | 其余列设置，见iview官网  |

##### Slot
| 属性  | 说明  
| ------------ | ------------
|  tool-btns | 工具栏插槽

