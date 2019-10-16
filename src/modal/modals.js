/**
 * 自定义表单组件类
 */
const modals = [
	{
		id: 10000,
		type: 'input',
		model: '',
        title: '单行文本框',
        icon: 'md-create'
	},
	{
		id: 40000,
		type: 'textarea',
		model: '',
		title: '多行文本框',
        icon: 'ios-paper'
	},
	{
		id: 20000,
		type: 'select',
		model: '',
		title: '单选下拉框',
		placeholder: '请选择...',
        icon: 'md-arrow-dropdown',
		value: [{
			value: '选项1',
			label: '选项1'
		}, {
			value: '选项2',
			label: '选项2'
		}],
	},
	{
		id: 30000,
		type: 'multiple',
		model: [],
		title: '多选下拉框',
		placeholder: '请选择...',
        icon: 'md-arrow-dropdown',
		value: [{
			value: '选项1',
			label: '选项1'
		}, {
			value: '选项2',
			label: '选项2'
		}, {
			value: '选项3',
			label: '选项3'
		}],
	},
	
	{
		id: 50000,
		type: 'radio',
		model: '',
		title: '单选框',
        icon: 'md-radio-button-on',
		value: [{
			value: 'option1',
			label: 'radio1'
		}, {
			value: 'option2',
			label: 'radio2'
		}, {
			value: 'option3',
			label: 'radio3'
		}],
	},
	{
		id: 60000,
		type: 'checkbox',
		model: [],
		title: '复选框',
        icon: 'md-checkbox-outline',
		value: [{
			value: 'option1',
			label: '多选选项一'
		}, {
			value: 'option2',
			label: '多选选项二'
		}, {
			value: 'option3',
			label: '多选选项三'
		}],
	},
	{
		id: 70000,
		type: 'date',
		model: '',
		title: '日期',
		placeholder: '请选择日期...',
		format: 'yyyy年MM月dd日',
		formatOptions: ['yyyy年MM月dd日', 'yyyy-MM-dd', 'yyyy年MM月', 'yyyy-MM'],
        icon: 'md-calendar'
	},
	{
		id: 80000,
		type: 'inputNumber',
		model: 0,
		title: '数字输入框',
		placeholder: '请输入...',
		format: '数值',
		formatOptions: ['数值', '百分比'],
        icon: 'md-information'
	},
	{
		id: 90000,
		type: 'email',
		model: '',
		title: '邮箱',
		placeholder: '请输入邮箱...',
		prepend: 'http://',
		append: '.com',
		hasSuffix: '显示',
		suffixOptions: ['显示', '隐藏'],
        icon: 'ios-mail'
	},
	{
		id: 1000000,
		type: 'link',
		model: '',
		title: '超链接',
        icon: 'ios-link-outline'
	},
	{
		id: 2000000,
		type: 'attachment',
		model: '',
		title: '附件',
		icon: 'md-link',
		action: '',
		nameMapping: '',
		urlMapping: '',
		name: '',
		url: ''
	},
	
]
export default modals