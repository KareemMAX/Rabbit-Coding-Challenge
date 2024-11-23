import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(50);
      });
  });

  it('/product (GET) with pageSize', () => {
    return request(app.getHttpServer())
      .get('/product?pageSize=20')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(20);
      });
  });

  it('/product (GET) with pageNumber', () => {
    return request(app.getHttpServer())
      .get('/product?pageNumber=20')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(50);
      });
  });

  it('/product (GET) with pageSize and pageNumber', () => {
    return request(app.getHttpServer())
      .get('/product?pageSize=20&pageNumber=20')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(20);
      });
  });
});
