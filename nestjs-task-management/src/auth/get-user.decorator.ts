import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

// export const GetUser = createParamDecorator((data, req): User => {
//     console.log('Data',data);
//     console.log('Req',req);
//     return req.user;
// })

//Note ** Use Decorator on NestJS Documentation
export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
      return data ? user && user[data] : user;
    },
  );