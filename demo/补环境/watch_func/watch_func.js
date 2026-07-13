/**
 * Proxy 不是复制对象，而是创建一个代理对象；它只拦截你通过这个代理对象进行的操作。
 * @param {object} obj
 * @param {string} name
 * @returns {object}
 */
function watch(obj, name) {
    // 用于存储已记录的操作，实现去重
    const loggedOperations = new Set();

    // 辅助函数：限制字符串长度，最长20个字符
    const truncateValue = (value) => {
        const str = String(value);
        return str.length > 20 ? str.substring(0, 20) + '...' : str;
    };

    return new Proxy(obj, {
        get: function (target, property) {
            const value = target[property];
            const type = typeof value;

            // 生成操作唯一标识和日志消息
            let operationId;
            let logMessage;
            // 处理要显示的值（截断处理）
            const displayValue = truncateValue(value);

            if (type === "symbol") {
                const symbolDescription = property.description || 'no description';
                logMessage = `对象=>${name},读取属性:${symbolDescription},这是一个 Symbol 类型的值`;
                operationId = `get:${name}:symbol:${symbolDescription}`;
            } else if (type === "function") {
                const functionName = value.name || 'anonymous';
                // 函数名也进行长度控制
                const displayFunctionName = truncateValue(functionName);
                logMessage = `对象=>${name},读取属性:${property.toString()},这是一个名为 ${displayFunctionName} 的函数`;
                operationId = `get:${name}:function:${property.toString()}:${functionName}`;
            } else {
                logMessage = `对象=>${name},读取属性:${String(property)},值为:${displayValue},类型为:${type}`;
                operationId = `get:${name}:${String(property)}:${type}:${String(value)}`;
            }

            // 检查是否已记录，如果没有则记录并输出
            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return value;
        },
        set: (target, property, newValue, receiver) => {
            const valueType = typeof newValue;

            // 生成操作唯一标识和日志消息
            let operationId;
            let logMessage;
            // 处理要显示的新值（截断处理）
            const displayNewValue = truncateValue(newValue);

            if (valueType === "symbol") {
                const symbolDescription = newValue.description || 'no description';
                logMessage = `对象=>${name},设置属性:${String(property)},这是一个 Symbol 类型的新值, 描述为: ${symbolDescription}`;
                operationId = `set:${name}:${String(property)}:symbol:${symbolDescription}`;
            } else {
                logMessage = `对象=>${name},设置属性:${String(property)},值为:${displayNewValue},类型为:${valueType}`;
                operationId = `set:${name}:${String(property)}:${valueType}:${String(newValue)}`;
            }

            // 检查是否已记录，如果没有则记录并输出
            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return Reflect.set(target, property, newValue, receiver);
        },
        // 监听 in 操作符（检查属性是否存在）
        has: (target, property) => {
            let operationId;
            let logMessage;

            // 处理 Symbol 类型的属性
            if (typeof property === 'symbol') {
                const symbolDescription = property.description || 'no description';
                logMessage = `对象=>${name},检查属性存在:${symbolDescription} (Symbol), 使用 in 操作符`;
                operationId = `has:${name}:symbol:${symbolDescription}`;
            } else {
                logMessage = `对象=>${name},检查属性存在:${String(property)}, 使用 in 操作符`;
                operationId = `has:${name}:${String(property)}`;
            }

            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return Reflect.has(target, property);
        },
        // 监听属性枚举操作（如 Object.keys、for...in 等）
        ownKeys: (target) => {
            const keys = Reflect.ownKeys(target);
            // 截断过长的键列表显示
            const displayKeys = truncateValue(keys.map(k =>
                typeof k === 'symbol' ? `Symbol(${k.description || ''})` : String(k)
            ).join(', '));

            const operationId = `ownKeys:${name}:${keys.length}`;
            const logMessage = `对象=>${name},枚举属性,共 ${keys.length} 个属性:${displayKeys}`;

            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return keys;
        },
        // ✅ 新增：拦截 getOwnPropertyDescriptor（检测 hasOwnProperty 和 Object.keys 等）
        getOwnPropertyDescriptor: (target, property) => {
            const descriptor = Reflect.getOwnPropertyDescriptor(target, property);

            if (descriptor) {
                console.log(`[原型链检测] ${name} 自身有属性: ${String(property)}`);
            } else {
                console.log(`[原型链检测] ${name} 自身没有属性: ${String(property)}，在原型链上`);
            }

            return descriptor;
        }
    });
}
