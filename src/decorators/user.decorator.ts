import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>().body
        const user = request.user

        return data ? user?.[data] : user;
    }
)