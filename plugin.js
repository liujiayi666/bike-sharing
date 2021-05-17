export default (api, opts) => {
  api.addHTMLScripts(() => {
    return [
      {
        type: 'text/javascript',
        src: 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=46SpyqRb2VYpYogA70C64lkGD67RXk5c&s=1'
      }
    ]
  });
};