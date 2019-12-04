/**
 * 自定义表单组件类
 */
const getModals = langs => {
	return [
		{
			id: 10000,
			type: 'input',
			model: '',
			title: langs.input,
			icon: 'md-create'
		},
		{
			id: 40000,
			type: 'textarea',
			model: '',
			title: langs.textarea,
			icon: 'ios-paper'
		},
		{
			id: 20000,
			type: 'select',
			model: '',
			title: langs.select,
			placeholder: langs.selectPlaceholder,
			icon: 'md-arrow-dropdown',
			value: [{
				value: `${langs.option}1`,
				label: `${langs.option}1`
			}, {
				value: `${langs.option}2`,
				label: `${langs.option}2`
			}],
		},
		{
			id: 30000,
			type: 'multiple',
			model: [],
			title: langs.multiple,
			placeholder: langs.selectPlaceholder,
			icon: 'md-arrow-dropdown',
			value: [{
				value: `${langs.option}1`,
				label: `${langs.option}1`
			}, {
				value: `${langs.option}2`,
				label: `${langs.option}2`
			}, {
				value: `${langs.option}3`,
				label: `${langs.option}3`
			}],
		},
	
		{
			id: 50000,
			type: 'radio',
			model: '',
			title: langs.radio,
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
			title: langs.checkbox,
			icon: 'md-checkbox-outline',
			value: [{
				value: 'option1',
				label: `${langs.option}1`
			}, {
				value: 'option2',
				label: `${langs.option}2`
			}, {
				value: 'option3',
				label: `${langs.option}3`
			}],
		},
		{
			id: 70000,
			type: 'date',
			model: '',
			title: langs.date,
			placeholder: langs.selectPlaceholder,
			format: langs.dateFormatVal1,
			formatOptions: [langs.dateFormatVal1, langs.dateFormatVal2],
			icon: 'md-calendar'
		},
		{
			id: 80000,
			type: 'inputNumber',
			model: 0,
			title: langs.inputNumber,
			placeholder: langs.inputPlaceholder,
			format: langs.value,
			formatOptions: [langs.value, langs.percent],
			icon: 'md-information'
		},
		{
			id: 90000,
			type: 'email',
			model: '',
			title: langs.email,
			placeholder: langs.inputPlaceholder,
			append: '.com',
			hasSuffix: langs.show,
			suffixOptions: [langs.show, langs.hide],
			icon: 'ios-mail'
		},
		{
			id: 1000000,
			type: 'link',
			model: '',
			title: langs.link,
			prepend: 'http://',
			append: '.com',
			icon: 'ios-link-outline'
		},
		{
			id: 2000000,
			type: 'attachment',
			title: langs.attachment,
			icon: 'md-link',
			action: 'https://cimsmanage.ilabpower.com/Controls/UploadFileOrgan?folder=materielAttachment',
			nameMapping: '',
			urlMapping: 'ResponseBody',
			fileName: 'materielAttachmentFile',
			realName: '',
			defaultList: []
		},
	
	]
}
export default getModals