import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { addSwagger } from "./swagger";

const port = process.env.PORT || 8000;
const logger = new Logger("NestFactory");
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	addSwagger("docs", app);
	await app.listen(port, () => logger.log(`Application is running at http://localhost:${port}`));
}

bootstrap();
