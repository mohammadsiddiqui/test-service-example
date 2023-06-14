import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PackageModule } from "./package/package.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ExceptionFilter } from "./common/filters/exeception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
	imports: [ConfigModule.forRoot(), PrometheusModule.register({ path: "/internal/metrics" }), PackageModule],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: ExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
})
export class AppModule {}
