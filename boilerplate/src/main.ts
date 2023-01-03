import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

const PREFIX_ROUTE = "api/v1"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(PREFIX_ROUTE);
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
