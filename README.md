<p align="center">
  <a href="https://github.com/jasonsoft/" target="blank"><img src="https://avatars.githubusercontent.com/u/90173752?s=200&v=4" width="120" alt="JasonSoft Logo" /></a>
  <a href="https://github.com/koajs" target="blank" style="padding-left:10px;"><img src="https://avatars.githubusercontent.com/u/5055057?s=200&v=4" width="120" alt="Koa Logo" /></a>
</p>

# koa-controller

Controller extension by @koa/router or koa-router middleware 🦞

[![NPM version][npm-img]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![License][license-img]][license-url]

### Installation

```bash
npm i --save @jasonsoft/koa-controller
```

### Quick Start

```javascript
/**
 * Example: https://github.com/jasonsoft-net/jasonsoft-koa-server
 * FilePath: /jasonsoft-koa-server/app.js
 * * 初始化相关服务和注入相关中间件
 * Added by Jason.Song (成长的小猪) on 2021/01/31
 * ? CSDN: https://blog.csdn.net/jasonsong2008
 * ? GitHub: https://github.com/jasonsoft-net
 */
import Koa from 'koa';
import Router from '@koa/router';
/**
 * Import the ControllerProvider from @jasonsoft/koa-controller
 */
import { ControllerProvider } from '@jasonsoft/koa-controller';

/** Instantiate the Koa object  */
const app = new Koa();

/** router middleware */
const router = new Router();

/** Inject the controller directory */
ControllerProvider.initControllers({
  router,
  /** The default directory is './src/controllers' */
  dir: './app/controllers',
  /** Whether to enable the body parser, the default setting is false, not enabled */
  bodyParser: true,
});
app.use(router.routes()).use(router.allowedMethods());

/** Service port */
const port = Number(process.env.PORT || 3000);

/** Listening port */
app.listen(port, () => {
  console.log(
    `[\x1B[36mRunning\x1B[0m] Application is running on: http://localhost:${port}`,
  );
});
```

```javascript
/**
 * Example: https://github.com/jasonsoft-net/jasonsoft-koa-server
 * FilePath: /jasonsoft-koa-server/app/controllers/user/users.controller.js
 * Import Controller, Get, Post, Put, Delete, Patch, Options, Head, All, etc. decorators
 */
import {
  Controller,
  Get,
  Post,
  // Post,
  // Put,
  // Delete,
  // Patch,
  // Options,
  // Head,
  // All,
} from '@jasonsoft/koa-controller';

@Controller('users')
export default class UsersController {
  constructor() {
    this.users = [
      {
        id: 1,
        username: 'jason',
      },
      {
        id: 2,
        username: 'steve',
      },
    ];
  }

  /**
   * GET http://localhost:3000/users
   */
  @Get()
  async getUsers() {
    return this.users;
  }

  /**
   * GET http://localhost:3000/users/1
   */
  @Get(':id')
  async getUserById(ctx) {
    const { id } = ctx.params;
    return this.users.find((user) => user.id === +id);
  }

  /**
   * POST http://localhost:3000/users
   */
  @Post()
  async createUser(ctx) {
    return { success: true, data: ctx.request.body };
  }
}
```

![controller loading](https://github.com/jasonsoft/koa-controller/raw/main/controller-loading.jpg)

### [完整示例 Example](https://github.com/jasonsoft-net/jasonsoft-koa-server)

[npm-img]: https://img.shields.io/npm/v/@jasonsoft/koa-controller.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@jasonsoft/koa-controller
[downloads-image]: https://img.shields.io/npm/dt/@jasonsoft/koa-controller.svg?style=flat-square
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
