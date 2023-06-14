import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export function addSwagger(path: string, app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle("CBS example")
		.setDescription("The CBS API description")
		.setVersion("1.0")
		.addTag("cbs")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(path, app, document);
}
