import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToUppperCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
    if(typeof(value) === 'string'){
      return value.toUpperCase();
    }
    
    return value;
  }
}
