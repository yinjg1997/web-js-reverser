/**
 * 如何知道要补原型?
 * bom 元素, window, document, navigator, history, location, screen, localStorage, sessionStorage
 *
 * 可以先将这些元素的原型 Navigator, History 等先代理上, 但是不设置其为 navigator, hisotry 的原型
 */
