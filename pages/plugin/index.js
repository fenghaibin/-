function getCtx(selector) {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];

    const componentCtx = ctx.selectComponent(selector);

    if (!componentCtx) {
        console.error('无法找到对应的组件，请按文档说明使用组件');
        return null;
    }
    return componentCtx;
}

function Toast(options) {
    const {
        selector = '#toast'
    } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}

Toast.hide = function (selector = '#toast') {
    const ctx = getCtx(selector);

    ctx.handleHide();
};

function Message(options) {
    const {
        selector = '#message'
    } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}


const $stopWuxRefresher = (selector = '#wux-refresher', ctx) => getCtx(selector, ctx).finishPullToRefresh()
const $stopWuxLoader = (selector = '#wux-refresher', ctx, isEnd) => getCtx(selector, ctx).finishLoadmore(isEnd)

module.exports = {
    $Toast: Toast,
    $Message: Message,
    $stopWuxRefresher: $stopWuxRefresher,
    $stopWuxLoader: $stopWuxLoader
};