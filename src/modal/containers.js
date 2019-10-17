/**
 * 自定义表单组件类
 */
const getContainers = langs => {
	return [
		{
			id: 1,
			type: 'container',
			columns: {
				l: [],
				r: []
			},
			title: langs.container12
		},
		{
			id: 5000,
			type: 'container',
			columns: {
				l: [],
				m: [],
				r: []
			},
			title: langs.container13
		},
	]
}
export default getContainers