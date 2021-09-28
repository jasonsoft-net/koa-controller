/**
 * 控制器参数选项
 * Added by Jason.Song (成长的小猪) on 2021/09/19 21:01:41
 */
export interface ControllerOptions {
  /**
   * @koa/router or koa-router
   */
  router: any;
  /**
   * 自定义指定控制器目录
   * 默认路由控制器路径 './src/controllers'
   */
  dir: string;
  /**
   * 是否启用Body解析器，默认设置为false，不启用
   * Whether to enable the body parser, the default setting is false, not enabled
   */
  bodyParser: boolean;
}
