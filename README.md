<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Explanation
1. A Basic REST based framework with proper folder structures to handle the common use cases of:

    1. ## EsLint

        1. With **Header Plugin** Configured
        2. **Imports Group** Configured
        3. **eslint-plugin-you-dont-need-lodash-underscore** Configured
        
         
    2. ## editorconfig

        1. Preconfigured **editorconfig** for same behaviour across different OS

    3. ## gitignore

        1. Preconfigured 

    4. ## Middlewares
        
        1. Correlation Id Middleware

            - Responsible to add the x-correlation-id in case the Request Header is not passed
            - Better for tracking purposes
            - Added for all ROUTES so

                - If passed, it will be used
                - Generated and returned back instead 

    5. ## Guards

    6. ## Pipes

    7. ## Filters

    8. ## Modules

        1. ## shared/modules/config.shared.module
            - Default values along with validation of the ENV values can be checked in **config.shared.validation.ts**
            - ENV values can be passed in A_B_C form
            - Will be exposed in A.B_C or A.B.C form depending your implementation
            - This is achieved in **config.shared.schema.ts**
            - **config.shared.schema.ts** transfroms the datatype of an ENV as well.
        
        2. ## shared/modules/jwt.shared.module
            - LOADS - JwtModule
            - NEEDS
                - ENV
                    - JWT_SECRET
                    - JWT_EXPIRES_IN
                    - JWT_ALGORITHM - Check the valid values from config.shared.validations.ts file
            - EXPOSES: JwtSharedService
            - IMPLEMENTED:
                - verifyToken 
                - generateToken

        3. ## src/http.bingo.module
            - Basic HTTPService module to show the interaction with any 3rd Party REST Server

        4. ## src/mongoose.module
            - Mongoose Connection Module to show the connectivity with Mongo Db
            - If needed load **MongooseConfigModule** in app.module
            - Add one folder for each collection you want to expose functions for in src/mongoose.module
            - Update barrel import file and add its loading in  **MongooseConfigModule** -> providers, exports section
            
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
