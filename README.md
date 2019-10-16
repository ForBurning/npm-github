# 自定义表单

#### 概述
1. 拖拽左侧工具栏，自定义表单结构
2. 通过右侧属性面板
	- 修改字段名称
	- 增减下拉选项
	- 补全upload action等操作
	
#### 示图
[![demo](https://raw.githubusercontent.com/ForBurning/vue-fly/master/form.png "demo")](https://raw.githubusercontent.com/ForBurning/vue-fly/master/form.png "demo")


#### 安装方式
     <script src="./neoForm.min.js"></script>
     npm install --save @neotrident/neo-custom-form
    

#### 示例

    <template>
      <neo-form :data="data"></neo-form>
    </template>
    
    <script>
    import neoForm from "@neotrident/neo-custom-form";
    export default {
        name: "neo-custom-form",
        components: {
            neoForm
        },
        data(){
			return {
				data: []
			}
		}
    };
    </script>
    
#### API
##### Props
| 属性  | 说明  | 类型    |    默认值    |
| ------------ | ------------ | ------------ |  ------------    |
|  data | 表单数据源  | Array  | []  |

##### Slot
| 属性  | 说明  
| ------------ | ------------
|  preset-fields | 预留字段插槽（显示表单保留字段）

