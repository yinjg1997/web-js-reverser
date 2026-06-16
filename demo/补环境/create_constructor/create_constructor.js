/**
 *
 * @param {string} constructorName
 * @param {boolean} isNonInstantiableClass 是否为不可实例化的类
 * @param {Array} propertiesList 属性列表, 每个元素为一个对象, 包含属性名和属性值
 * @param {Array} prototypeMethods 原型方法列表, 每个元素为一个对象, 包含方法名和方法体
 * @param {string} parentConstructorName 父构造函数名
 * @returns {constructorFunction}
 */
function createConstructor(constructorName, isNonInstantiableClass, propertiesList, prototypeMethods, parentConstructorName) {
    const instancesData = {};
    /**
     * 构造函数
     * @param {object}  element 实例属性
     * @param {function} propertySetter 属性设置函数, 用于设置实例的属性
     * @param {string} validationToken 是否允许在创建实例
     */
    const constructorFunction = function (element, propertySetter, validationToken) {
        // 1. 先检测是否为用 new 调用
        if (!(this instanceof constructorFunction)) {
            throw new TypeError("Failed to construct '" + constructorName + "': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
        }
        // 是否允许实例化, 是否允许临时实例化
        if (isNonInstantiableClass && !(validationToken && validationToken === "allow")) {
            throw new TypeError("Illegal constructor");
        }

        // 为实例添加Symbol.toStringTag
        Object.defineProperty(this, Symbol.toStringTag, {
            value: constructorName,
            writable: false,
            enumerable: false,
            configurable: false
        });

        // 为实例添加Symbol.toPrimitive
        Object.defineProperty(this, Symbol.toPrimitive, {
            value: function (hint) {
                switch (hint) {
                    case 'number':
                        return this._element ? instancesData[this._element].toString().length : 0;
                    case 'string':
                        return `[${constructorName} Instance]`;
                    default:
                        return `[object ${constructorName}]`;
                }
            },
            writable: false,
            enumerable: false,
            configurable: false
        });

        if (propertySetter && typeof propertySetter === "function") {
            propertySetter(this, instancesData[this._element]);
        }
        const instanceProperties = element && typeof element === "object" ? element : {};
        this._element = Symbol("_element");
        instancesData[this._element] = instanceProperties;
        if (element && typeof element === "object") {
            Object.keys(element).forEach(key => {
                if (!this[key]) {
                    this[key] = element[key];
                }
            });
        }
    };

    // 设置构造函数名称
    Object.defineProperty(constructorFunction, 'name', {value: constructorName});

    // 处理继承关系
    if (parentConstructorName && window[parentConstructorName]) {
        const ParentConstructor = window[parentConstructorName];
        constructorFunction.prototype = Object.create(ParentConstructor.prototype);
        Object.defineProperty(constructorFunction.prototype, 'constructor', {
            value: constructorFunction,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }

    // 为构造函数本身添加Symbol.toStringTag
    Object.defineProperty(constructorFunction, Symbol.toStringTag, {
        value: constructorName,
        writable: false,
        enumerable: false,
        configurable: false
    });

    // 为构造函数本身添加Symbol.toPrimitive
    Object.defineProperty(constructorFunction, Symbol.toPrimitive, {
        value: function (hint) {
            switch (hint) {
                case 'number':
                    return constructorName.length;
                case 'string':
                    return `[Constructor ${constructorName}]`;
                default:
                    return constructorName;
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    // 添加原型方法
    Object.keys(prototypeMethods).forEach(methodName => {
        constructorFunction.prototype[methodName] = prototypeMethods[methodName];
        if (typeof constructorFunction.prototype[methodName] === "function") {
            safeFunction(constructorFunction.prototype[methodName]);
        }
    });

    // 保护构造函数
    safeFunction(constructorFunction);

    // 挂载到全局
    window[constructorName] = constructorFunction;
    return constructorFunction;
};
