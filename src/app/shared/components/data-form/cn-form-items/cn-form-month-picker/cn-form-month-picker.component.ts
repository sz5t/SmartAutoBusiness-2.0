import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { getISOYear, getMonth } from 'date-fns';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-month-picker',
  templateUrl: './cn-form-month-picker.component.html',
  styleUrls: ['./cn-form-month-picker.component.less']
})
export class CnFormMonthPickerComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  date=null;
  value=null;
  constructor() { }

  ngOnInit() {
  }

  onChange(result: Date): void {
    // 选择日期
    if(result){
      let sj =  result;
       if(typeof(result) ==='string'){
        sj   = this.parserDate(result);
       }
       const year = getISOYear(this.date);
       const month = this.getNewMonth(getMonth(this.date)+1) ;
       const ym= `${year}-${month}`;
      if (this.value !== ym) {
        this.value = ym
      }
    }

    console.log('年月 onChange: ', result,this.date,  this.value);
  }

  public valueChange(v?){
    if (v) {
      const sjstr= `${v}-1`;
      const sj = this.parserDate(sjstr);
      if(sj!== this.date)
      this.date = sj;
    } else {
      this.date = null;
    }
    const year = getISOYear(this.date);
    const month = this.getNewMonth(getMonth(this.date)+1) ;
    const monthvalue = getMonth(this.date)+1;
    const item = { "year": year, "month": monthvalue, "monthString":`${year}-${month}` };
    if(! this.date){
      item['year'] =null;
      item['month'] =null;
      item['monthString'] =null;
    }
    
    const backValue = { name: this.config.field, value: v, id: this.config.config.id,dataItem: item};
    this.updateValue.emit(backValue);
    console.log('月值变化',v);
  }


  parserDate(date) {
    const t = Date.parse(date)
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, '/')))
    }
  }

  public getNewMonth(d: any) {
    if (d <= 9) {
        d = '0' + d;
    }
    return d;
}

}
