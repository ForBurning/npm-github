const zh = {
    input: '单行文本框',
    textarea: '多行文本框',
    select: '下拉框',
    selectPlaceholder: '请选择',
    option: '选项',
    multiple: '多选下拉框',
    radio: '单选框',
    checkbox: '复选框',
    date: '日期',
    dateFormatVal1: 'yyyy-MM-dd',
    dateFormatVal2: 'yyyy/MM/dd',
    inputNumber: '数字文本框',
    inputPlaceholder: '请输入',
    value: '数值',
    percent: '百分比',
    email: '邮箱',
    show: '显示',
    hide: '隐藏',
    link: '超链接',
    attachment: '附件',
    container12: '一行两列布局',
    container13: '一行三列布局',
    removeConfirm: '您确认删除这个组件吗？',
    remove: '删除组件',
    upload: '上传',
    uploaderFail: '上传失败！',
    actionWarning: '请先填写该附件的上传地址',
    fieldsTxt: '字段控件',
    dragToCanvas: '拖拽到页面中央',
    layoutTxt: '布局控件',
    setting: '模块设置',
    title: '标题',
    defaultVal: '默认值',
    optionsTxt: '选项设置',
    dateFormat: '日期格式',
    numberType: '数字类型',
    mailSuffix: '邮箱后缀',
    actionTxt: '上传地址',
    nameMapping: '文件名称映射',
    urlMapping: '文件地址映射',
    selectComponent: '请先选择控件',
}

const en = {
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    selectPlaceholder: 'please select',
    option: 'option',
    multiple: 'multiple',
    radio: 'radio',
    checkbox: 'checkbox',
    date: 'date',
    dateFormatVal1: 'yyyy-MM-dd',
    dateFormatVal2: 'yyyy/MM/dd',
    inputNumber: 'inputNumber',
    inputPlaceholder: 'please input',
    value: 'value',
    percent: 'percent',
    email: 'email',
    show: 'show',
    hide: 'hide',
    link: 'link',
    attachment: 'attachment',
    container12: 'one row two cols',
    container13: 'one row three cols',
    removeConfirm: 'confrim to remove？',
    remove: 'remove',
    upload: 'upload',
    uploaderFail: 'upload failed!',
    actionWarning: 'action is empty!',
    fieldsTxt: 'fields control',
    dragToCanvas: 'drag to layout',
    layoutTxt: 'layout control',
    setting: 'setting',
    title: 'title',
    defaultVal: 'default value',
    optionsTxt: 'options',
    dateFormat: 'date format',
    numberType: 'number type',
    mailSuffix: 'mail suffix',
    actionTxt: 'action',
    nameMapping: 'name mapping',
    urlMapping: 'url mapping',
    selectComponent: 'please select component',
}

 function getLangs(lang){
    return lang === 'en-US' ? en : zh;
}

export default getLangs