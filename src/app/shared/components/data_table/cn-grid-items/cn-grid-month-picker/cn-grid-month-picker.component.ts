import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { getISOYear, getMonth } from 'date-fns';

@Component({
  selector: 'app-cn-grid-month-picker',
  templateUrl: './cn-grid-month-picker.component.html',
  styleUrls: ['./cn-grid-month-picker.component.less']
})
export class CnGridMonthPickerComponent implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  date=null;
  value=null;
  constructor() { }

  ngOnInit() {
    let v_value;
   if (this.valueConfig) {
     v_value = this.valueConfig.value;
   }
   if(this.state ==='new'){
     if (this.config.defaultValue) {
       if (!this.value) {
         v_value = this.config.defaultValue;
       }
     }
   }

   setTimeout(() => {
     this.value =v_value;
     this.valueChange( this.value);
   });
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
public cascadeAnalysis(c?) {
}

}
