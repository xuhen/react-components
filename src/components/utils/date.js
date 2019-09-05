
/**
 * 默认属性
 */
export const defaultProps = {
    isPopup: true,
    isOpen: false,
    theme: 'default',
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1),
    showFooter: true,
    showHeader: true,
    showCaption: false,
    dateConfig: {
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
        'month': {
            format: 'M',
            caption: 'Mon',
            step: 1,
        },
        'date': {
            format: 'D',
            caption: 'Day',
            step: 1,
        },
    },
    headerFormat: 'YYYY/MM/DD',
    confirmText: '完成',
    cancelText: '取消',
    onChange: () => {},
    onSelect: () => {},
    onCancel: () => {},
};

/**
 * 日期配置
 */
export const dateConfigMap = {
    'year': {
        format: 'YYYY',
        caption: 'Year',
        step: 1,
    },
    'month': {
        format: 'M',
        caption: 'Mon',
        step: 1,
    },
    'date': {
        format: 'D',
        caption: 'Day',
        step: 1,
    },
    'hour': {
        format: 'hh',
        caption: 'Hour',
        step: 1,
    },
    'minute': {
        format: 'mm',
        caption: 'Min',
        step: 1,
    },
    'second': {
        format: 'hh',
        caption: 'Sec',
        step: 1,
    },
};


/**
 * @module time工具
 */

function throwIfInvalidDate(date) {
    if (Object.prototype.toString.call(date, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param  {Date}       日期
 * @return {String}     字符串格式
 */
export function convertDate(date, format) {
    let str = format;
    const o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    if (/(Y+)/.test(format)) {
        str = str.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
        // eslint-disable-line
        if (new RegExp(`(${k})`).test(format)) {
            str = str.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(o[k].toString().length),
            );
        }
    }

    return str;
}

/**
 * 获取相对日期的偏移日期
 * @param  {Date}       日期
 * @return {number}     相对的天数
 */
export function nextYear(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(
        now.getFullYear() + index,
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextMonth(now, index = 0) {
    throwIfInvalidDate(now);
    const year = now.getFullYear();
    const month = now.getMonth() + index;
    const dayOfMonth = Math.min(now.getDate(), daysInMonth(year, month));
    const date = new Date(
        year,
        month,
        dayOfMonth,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextDate(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 24 * 60 * 60 * 1000);
    return date;
}

export function nextHour(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 60 * 60 * 1000);
    return date;
}

export function nextMinute(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 60 * 1000);
    return date;
}

export function nextSecond(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 1000);
    return date;
}


/**
 * 驼峰写法
 * @param  {String} str 要转化的字符串
 * @return {String}     转化后的字符串
 */
export function camelCase(str) {
    return str.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()).replace('-', '');
}

/**
 * 格式化css属性对象
 * @param  {Object} props 属性对象
 * @return {Object}       添加前缀的格式化属性对象
 */
export function formatCss(props) {
    const prefixs = ['-webkit-', '-moz-', '-ms-'];

    const result = {};

    const regPrefix = /transform|transition/;


    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const styleValue = props[key];

            // 如果检测是transform或transition属性
            if (regPrefix.test(key)) {
                for (let i = 0; i < prefixs.length; i++) {
                    const styleName = camelCase(prefixs[i] + key);
                    result[styleName] = styleValue.replace(regPrefix, `${prefixs[i]}$&`);
                }
            }

            result[key] = styleValue;
        }
    }

    return result;
}

/**
 * 为元素添加css样式
 * @param {Object} element 目标元素
 * @param {Object} props   css属性对象
 */
export function addPrefixCss(element, props) {
    const formatedProps = formatCss(props);
    for (const key in formatedProps) {
        if (formatedProps.hasOwnProperty(key)) {
            element.style[key] = formatedProps[key];
        }
    }
}
