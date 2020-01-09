import cookie from "./cookie";
import { isUndefined } from "./type";
import md5 from "./md5";

/**
 * 获取服务器时间戳。
 * @function getTimesamp
 * @return {int} 时间戳
 */
export const getTimesamp = () => {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else {
        xhr = new ActiveObject("Microsoft");
    }
    xhr.open("GET", "/?v=" + new Date().getTime(), false);
    xhr.send(null);
    let date = xhr.getResponseHeader("Date");
    return new Date(date).getTime() / 1000 + 121;
}

/**
 * 获取当前用户的语言设置，默认显示浏览器当前语言。
 * @function getLanguage
 * @return {string} 语言
 */
export const getLanguage = (ucStorage) => {
    let lang = null;

    if (isUndefined(ucStorage)) {
        lang = (navigator.language || navigator.browserLanguage).toLowerCase();
        lang = lang.includes('zh') ? 'zh-CN' : lang.includes('en') ? 'en-US' : 'zh-CN';
    } else {
        lang = ucCookie.Lang;
    }

    return lang;
}

/**
 * 生成header签名。
 * @function generateSignature
 * @param {string} cookieName - 系统cookie
 * @return {object} 签名对象
 */
export const generateSignature = (cookieName) => {
    const UCSTORAGE = cookieName || 'ucStorage';
    const ucStorage = cookie.get(UCSTORAGE);

    if (isUndefined(ucStorage))
        return {};

    const Timesamp = getTimesamp();
    const Token = ucStorage.Token;
    const Uid = ucStorage.AccountInfo.ID;
    const Signature = md5([Token, Uid, Timesamp].join("").split("").sort().join("")).toUpperCase();
    const Language = getLanguage(ucStorage);

    return {
        Token,
        Uid,
        Timesamp,
        Signature,
        Language,
        Identity: ucStorage.Identity,
        Organ: ucStorage.OrgCode,
        ProductType: ucStorage.ProductType,
        LoginClient: ucStorage.LoginClient,
    }
}