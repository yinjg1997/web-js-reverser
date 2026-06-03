// ================================HTMLCollection Start================================
function HTMLCollection() {
    for (let index = 0; index < 10; index++) {
        this[index] = new Element(); // 每个索引位置创建一个 Element 实例
        this[index].tagName = index.toString(); // 给实例设置 tagName（用索引字符串标识）
    }
    this.length = 10; // 集合长度为 10
}

HTMLCollection.prototype = {
    constructor: HTMLCollection,
    [Symbol.iterator]: function () {
        let currentIndex = 0;
        const collection = this; // 保存当前集合的引用（避免 this 指向丢失）

        // 迭代器必须返回带有 next() 方法的对象
        return {
            next: function () {
                // 遍历结束：返回 done: true
                if (currentIndex >= collection.length) {
                    return {done: true};
                }
                // 未结束：返回当前元素，索引自增
                const value = collection[currentIndex];
                currentIndex++;
                return {done: false, value: value};
            }
        };
    },
    item: function (index) {
        // 原生规则：index 必须是有效的非负整数，否则返回 null
        // 1. 过滤非数字、负数、小数、超出长度的索引
        if (typeof index !== 'number' || index < 0 || !Number.isInteger(index) || index >= this.length) {
            return null;
        }
        // 2. 有效索引：返回对应元素（与直接访问 collection[index] 效果一致）
        return this[index];
    }
};
set_func_native(HTMLCollection);
Object.defineProperties(HTMLCollection.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLCollection",
        configurable: true
    }
})

function HTMLAllCollection() {
    HTMLCollection.call(this); // 调用父类构造函数，继承父类的实例属性和逻辑
}

// 原型继承：
HTMLAllCollection.prototype = Object.create(HTMLCollection.prototype);
HTMLAllCollection.prototype.constructor = HTMLAllCollection;
set_func_native(HTMLAllCollection);
Object.defineProperties(HTMLAllCollection.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLAllCollection",
        configurable: true
    }
})
window.HTMLAllCollection = HTMLAllCollection;
// ================================HTMLCollection End================================