import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		if (context.getType() === "http") {
			return this.logHttpCall(context, next);
		}
	}

	private logHttpCall(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest();
		const userAgent = request.get("user-agent") || "";
		const { ip, method, path: url } = request;
		const rKey = uuidv4();

		const msg = `[${rKey}] ${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name}`;
		this.logger.log(msg);

		const now = Date.now();
		return next.handle().pipe(
			tap(() => {
				const response = context.switchToHttp().getResponse();
				const { statusCode } = response;
				const contentLength = response.get("content-length") || "";
				this.logger.log(`[${rKey}] ${method} ${url} ${statusCode} ${contentLength}: ${Date.now() - now}ms`);
			}),
		);
	}
}
