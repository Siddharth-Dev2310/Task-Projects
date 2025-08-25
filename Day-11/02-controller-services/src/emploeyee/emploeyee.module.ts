import { Module } from '@nestjs/common';
import { EmploeyeeService } from './emploeyee.service';

@Module({
  providers: [EmploeyeeService],
})
export class EmploeyeeModule {}
