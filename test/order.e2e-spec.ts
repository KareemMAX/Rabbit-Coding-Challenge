import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/order/top-10 (GET)', () => {
    return request(app.getHttpServer())
      .get('/order/top-10')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(10);
      });
  });

  it('/order/top-10 (GET) with area', () => {
    return request(app.getHttpServer())
      .get('/order/top-10?area=Giza')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(10);
        body.forEach((element) => {
          expect(element).toEqual(expect.objectContaining({ area: 'Giza' }));
        });
      });
  });

  it('/order/top-10 (GET) with non-existing area', () => {
    return request(app.getHttpServer())
      .get('/order/top-10?area=Non')
      .expect(404);
  });
});
