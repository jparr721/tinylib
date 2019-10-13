import { Module } from '@nestjs/common';
import { TinylibService } from './tinylib.service';

@Module({
  providers: [TinylibService],
  exports: [TinylibService],
})
export class TinylibModule {}
