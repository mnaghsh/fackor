import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment-jalali';

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let MomentDate = moment(value);
    // return MomentDate.locale('fa').format('jYYYY/jM/jD');
    return MomentDate.locale('fa').format('jYY/jM/jD h:m:s');
  }

}
