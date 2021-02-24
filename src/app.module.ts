import { Module } from '@nestjs/common';
import { MongooseModule  } from '@nestjs/mongoose'
import { from } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module'

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.p6tmg.mongodb.net/nestjs-demo?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
