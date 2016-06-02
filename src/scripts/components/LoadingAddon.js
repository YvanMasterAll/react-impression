import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

/**
 * LoadingAddon组件.
 */
export default class LoadingAddon extends Component{
    /**
     * 初始信息.
     */
    constructor(props, context){
        super(props, context);

        this.state = {
            dottedCount: 0
        };

        this.getLoadingAddon = this.getLoadingAddon.bind(this);
        this.getDotted = this.getDotted.bind(this);
        this.setDottedInterval = this.setDottedInterval.bind(this);
        this.clearDottedInterval = this.clearDottedInterval.bind(this);
    }
    //props校验
    static propTypes = {
        //自定义样式
        className: PropTypes.string,
        //类型
        type: PropTypes.oneOf(['fountain', 'wave', 'pendule', 'cyclone']),
        //信息提示
        loadingMsg: PropTypes.string,
        //显示
        show: PropTypes.bool
    }
    //默认props
    static defaultProps = {
        type: 'cyclone',
        loadingMsg: '加载中',
        show: false
    }
    /**
     * 根据类型获取loading的addon.
     * @return {Html} [addon片段]
     */
    getLoadingAddon(){
        let { type } = this.props;

        switch(type){
        case 'fountain'://喷泉
        case 'wave'://波纹
            return(
                <div className={classnames('loading-addon')}>
                    <div></div>
                </div>
            );
        case 'pendule'://摆钟
            return (
                <div className={classnames('loading-addon')}>
                    <div></div>
                    <div></div>
                </div>
            );
        case 'cyclone'://旋风
            return (
                <div className={classnames('loading-addon')}></div>
            );
        }
    }
    /**
     * 获取点点数量.
     * @return {String} [点点]
     */
    getDotted(){
        let { dottedCount } = this.state,
            result = [];

        for(let i=0; i < dottedCount; i++){
            result[i] = '.';
        }

        return result.join('');
    }
    /**
     * 设置定时器.
     */
    setDottedInterval(){
        let { dottedCount } = this.state;

        this.interval = setInterval(() => {
            dottedCount += 1;
            dottedCount > 3 && (dottedCount = 0);

            this.setState({
                dottedCount
            });
        },600);
    }
    /**
     * 清空定时器.
     */
    clearDottedInterval(){
        clearInterval(this.interval);
    }
    /**
     * 清除定时器.
     */
    componentWillUnmount(){
        this.clearDottedInterval();
    }
    /**
     * 根据props添加或清空定时器.
     * @param  {Object} nextprops [新props]
     */
    componentWillReceiveProps(nextprops){
        !nextprops.show && (this.clearDottedInterval());
        nextprops.show && (this.setDottedInterval());
    }
    //渲染
    render(){
        let { type, loadingMsg, className, others } = this.props,
            typeClass = `loading-${type}`,
            loadingAddon = this.getLoadingAddon(),
            dotted = this.getDotted();

        return (
            <div {...others} className={classnames('loading', typeClass, className)}>
                {loadingAddon}
                <div className="loading-message">
                    {loadingMsg}
                    <span className="loading-message-dotted">{ dotted }</span>
                </div>
            </div>
        );
    }
}
