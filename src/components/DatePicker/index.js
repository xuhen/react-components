import React from "react";
import "./index.scss";
import DatePickerItem from '../DatePickerItem'
import { dateConfigMap, defaultProps, convertDate, nextDate } from '../utils/date';


const isArray = val => Object.prototype.toString.apply(val)  === '[object Array]';
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: nextDate(this.props.value),
        };

        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);

    }

    /**
     * 格式化dateConfig
     * @param {*} dataConfig dateConfig属性
    */
    normalizeDateConfig(dataConfig) {
        const configList = [];
        if (isArray(dataConfig)) {
            for (let i = 0; i < dataConfig.length; i++) {
                const value = dataConfig[i];
                if (typeof value === 'string') {
                    const lowerCaseKey = value.toLocaleLowerCase();
                    configList.push({
                        ...dateConfigMap[lowerCaseKey],
                        type: capitalize(lowerCaseKey),
                    });
                }
            }
        } else {
            for (const key in dataConfig) {
                if (dataConfig.hasOwnProperty(key)) {
                    const lowerCaseKey = key.toLocaleLowerCase();
                    if (dateConfigMap.hasOwnProperty(lowerCaseKey)) {
                        configList.push({
                            ...dateConfigMap[lowerCaseKey],
                            ...dataConfig[key],
                            type: capitalize(lowerCaseKey),
                        });
                    }
                }
            }
        }

        return configList;
    }

    /**
     * 选择下一个日期
     * @return {undefined}
     */
    handleDateSelect(value) {
        this.setState({ value }, () => {
            this.props.onChange(value);
        });
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        this.props.onSelect(this.state.value);
    }

    render() {
        const {
            dateConfig,
            showCaption,
            min,
            max,
            showHeader,
            customHeader,
            headerFormat,
            confirmText,
            cancelText,
            isOpen,
            showFooter
        } = this.props;
        const { value } = this.state;

        const dataConfigList = this.normalizeDateConfig(dateConfig);


        return (
            <div className={`datepicker ${isOpen ? 'show' : ''}`}>
                {showHeader && (
                    <div className="datepicker__header">
                        {customHeader || convertDate(value, headerFormat)}
                    </div>
                )}
                <div className="datepicker__caption">
                    {
                        showCaption && dataConfigList.map((item, index) => {
                            return <div className="datepicker__caption-item" key={index}>{item.caption}</div>
                        })
                    }
                </div>
                <div className="datepicker__content">
                    {dataConfigList.map((item, index) => (
                        <DatePickerItem
                            key={index}
                            value={value}
                            min={min}
                            max={max}
                            step={item.step}
                            type={item.type}
                            format={item.format}
                            onSelect={this.handleDateSelect} />
                    ))}
                </div>
                {
                    showFooter && <div className="datepicker__navbar">
                        <a
                            className="datepicker__navbar-btn" onClick={this.handleFinishBtnClick}>{confirmText}</a>
                        <a
                            className="datepicker__navbar-btn" onClick={this.props.onCancel}>{cancelText}</a>
                    </div>
                }

            </div>
    );
  }
}




function EnhanceDatePicker({ ...props }) {
    function onModalClose(event) {
        if (event.target === event.currentTarget) {
            props.onCancel();
        }
    }

    return (
        <div
            style={{ display: props.isOpen ? '' : 'none' }}
            onClick={onModalClose}
            className="datepicker-modal">
            <DatePicker {...props} />
        </div>
    );
}

EnhanceDatePicker.defaultProps = defaultProps;


export default EnhanceDatePicker;