import { METHOD_METADATA, PATH_METADATA } from './constants';
import * as glob from 'glob';
import path from 'path';
import parse from 'co-body';
import {
  addLeadingSlash,
  isFunction,
  isNullOrUndefined,
  isUndefined,
} from './utils/shared-utils';
import { RequestMethod } from './enums/request-method.enum';
import { ControllerOptions } from './interfaces/controller-options.interface';

/**
 * 控制器初始化服务
 * Added by Jason.Song (成长的小猪) on 2021/09/18 12:33:41
 */
export class ControllerProvider {
  /**
   * 注入指定目录下所有的控制器
   * Added by Jason.Song (成长的小猪) on 2021/09/20 11:07:36
   * @param options 控制器参数选项
   */
  public static initControllers(options: ControllerOptions): void {
    const controllerDir = options.dir || './src/controllers';
    const dist = path.resolve(controllerDir, '**/*.[j|t]s');
    glob.sync(dist).forEach((file) => {
      const handler = require(file);
      if (isFunction(handler.default)) {
        const controller: Function = handler.default;
        const pathMetadata = Reflect.getMetadata(PATH_METADATA, controller);
        if (isNullOrUndefined(pathMetadata)) {
          return;
        }

        let controllerPaths: string[];
        if (Array.isArray(pathMetadata)) {
          controllerPaths = pathMetadata.map((p) => addLeadingSlash(p));
        } else {
          controllerPaths = [addLeadingSlash(pathMetadata)];
        }

        console.log(
          `\x1B[33m[@jasonsoft/koa-controller]\x1B[39m\x1B[32m LoadController { ${controller.name} }\x1B[39m`,
        );

        const propertyNames = Object.getOwnPropertyNames(controller.prototype);
        for (const methodName of propertyNames) {
          if (methodName === 'constructor') {
            continue;
          }
          const method = controller.prototype[methodName];
          if (isFunction(method)) {
            const methodPathMetadata = Reflect.getMetadata(
              PATH_METADATA,
              method,
            );
            if (isUndefined(methodPathMetadata)) {
              continue;
            }

            let methodPaths: string[];
            if (Array.isArray(methodPathMetadata)) {
              methodPaths = methodPathMetadata.map((p) => addLeadingSlash(p));
            } else {
              methodPaths = [addLeadingSlash(methodPathMetadata)];
            }

            const requestMethod: RequestMethod = Reflect.getMetadata(
              METHOD_METADATA,
              method,
            );

            for (const cp of controllerPaths) {
              for (const mp of methodPaths) {
                const routerPath =
                  cp !== '/' ? `${cp}${mp !== '/' ? mp : ''}` : mp;
                this.bindPathToRouter(
                  options,
                  requestMethod,
                  routerPath,
                  controller,
                  methodName,
                );
              }
            }
          }
        }
      }
    });
  }

  /**
   * 将控制器路径绑定至路由
   * Added by Jason.Song (成长的小猪) on 2021/09/20 11:49:31
   * @param options
   * @param router
   * @param requestMethod
   * @param routerPath
   * @param controller
   * @param methodName
   */
  private static bindPathToRouter(
    options: ControllerOptions,
    requestMethod: RequestMethod,
    routerPath: string,
    controller: any,
    methodName: string,
  ) {
    console.log(
      `\x1B[33m[@jasonsoft/koa-controller]\x1B[39m\x1B[32m RouterMapped => ${requestMethod.toUpperCase()} ${routerPath} \x1B[39m`,
    );
    options.router[requestMethod](routerPath, async (ctx: any, next: any) => {
      if (
        options.bodyParser &&
        (requestMethod === RequestMethod.POST ||
          requestMethod === RequestMethod.PUT ||
          requestMethod === RequestMethod.PATCH)
      ) {
        if (ctx.is('application/json')) {
          ctx.request.body = await parse.json(ctx.req);
        } else if (ctx.is('application/x-www-form-urlencoded')) {
          ctx.request.body = await parse.form(ctx.req);
        } else if (ctx.is('text/plain')) {
          ctx.request.body = await parse.text(ctx.req);
        } else {
          ctx.request.body = await parse(ctx.req);
        }
      }

      const ctl = new controller(ctx, next);
      ctx.body = await ctl[methodName](ctx);
      return await next();
    });
  }
}
