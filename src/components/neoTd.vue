<template>
<div class="neo-td">
    <template v-if="col.type === 'input'">
        <!-- v-model: 为了number prop起作用 -->
        <Input v-model="row[col.slot]" @on-change="onChange" v-bind="col.props" />
    </template>
    <template v-else-if="col.type === 'date'">
        <DatePicker :value="row[col.slot]" type="date" @on-change="onChange" transfer v-bind="col.props"></DatePicker>
    </template>
    <template v-else-if="col.type === 'select'">
        <Select :value="row[col.slot]" transfer v-bind="col.props" @on-change="onChange">
            <Option v-for="item in col.options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </template>
    <template v-else-if="col.type === 'radio'">
        <RadioGroup :value="row[col.slot]" v-bind="col.props" @on-change="onChange">
            <Radio v-for="item in col.options" :label="item" :key="item"></Radio>
        </RadioGroup>
    </template>
    <template v-else-if="col.type === 'checkbox'">
        <CheckboxGroup :value="row[col.slot]" v-bind="col.props" @on-change="onChange">
            <Checkbox v-for="item in col.options" :label="item" :key="item"></Checkbox>
        </CheckboxGroup>
    </template>
    <template v-else-if="col.type === 'inputNumber'">
        <InputNumber :value="row[col.slot]" v-bind="col.props" @on-change="onChange"></InputNumber>
    </template>
</div>
</template>

<script>
export default {
    name: 'neoTd',
    props: {
        col: {
            validator(col) {
                return ['input', 'date', 'select', 'radio', 'checkbox', 'inputNumber'].includes(col.type);
            },
            default: {}
        },
        row: {
            type: Object,
            default: {}
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        index: {
            type: Number,
            default: 0
        }
    },
    methods: {
        onChange(value) {
            const type = this.col.type;
            
            switch (type) {
                case 'input':
                    this.data[this.index][this.col.slot] = this.row[this.col.slot];
                    break;
                case 'date':
                    this.data[this.index][this.col.slot] = value;
                    break;
                case 'select':
                    this.data[this.index][this.col.slot] = value;
                    break;
                case 'radio':
                    this.data[this.index][this.col.slot] = value;
                    break;
                case 'checkbox':
                    this.data[this.index][this.col.slot] = value;
                    break;
                case 'inputNumber':
                    this.data[this.index][this.col.slot] = value;
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
