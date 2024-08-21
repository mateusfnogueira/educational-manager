import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';

import { AllExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_paulo')
      .format('YYYY-MM-DD HH:mm:ss:SSS');
  };
  await app.listen(3333);
}
bootstrap();
