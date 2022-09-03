teimport {Injectable, CanActivate, ExecutionContext} from "@nestjs/common"
import { Observable } from "rxjs"
import { Reflector } from "@nestjs/core"

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if(!roles){
            return true
        }
        const request = context.switchToHttp().getRequest()
        const user = request.user
        console.log('Request by RolesGuard')
        return true
        // return matchRoles(roles, user.roles)
    }
}

// function matchRoles(roles, userRole){ 
//     return roles != userRole
// }