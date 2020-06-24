import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getISOWeek, getISOYear, addWeeks } from 'date-fns';

@Component({
  selector: 'app-cn-grid-week-picker',
  templateUrl: './cn-grid-week-picker.component.html',
  styleUrls: ['./cn-grid-week-picker.component.less']
})
export class CnGridWeekPickerComponent implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  date = null; // new Date();
  value =null;
  cascadeValue: any;
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
  getWeek(result: Date): void {

    const year = getISOYear(result);
    const week = this.getNewWeek(getISOWeek(result));
    const yw= `${year}-${week}`;
    if (this.value !== yw) {
      this.value = yw
    }
    console.log('周变化week: ',yw);
    this.valueChange( this.value);
  }
  public valueChange(v?) {
    if (v) {
      const YearAndWeek = v.split('-');
      if(YearAndWeek.length>1)
      {
        const    _year =YearAndWeek[0];
        const    _week =YearAndWeek[1];
        const datenew =  addWeeks(_year,_week);
        const yearold = getISOYear(this.date);
        const weekold = this.getNewWeek(getISOWeek(this.date));
        const ywold= `${yearold}-${weekold}`;
        const yearnew = getISOYear(datenew);
        const weeknew = this.getNewWeek(getISOWeek(datenew));
        const ywnew= `${yearnew}-${weeknew}`;
        if(ywold!==ywnew ){
          this.date = datenew;
        }
        console.log('==年周计算出时间==',datenew);
      }
      const year = getISOYear(this.date);
      const week = this.getNewWeek(getISOWeek(this.date));
      const weekValue = getISOWeek(this.date);
      const item = { "year": year, "week": weekValue, "weekString": `${year}-${week}` };
      if (!this.date) {
        item['year'] = null;
        item['week'] = null;
        item['weekString'] = null;
      }
      const backValue = { name: this.config.field, value: v, id: this.valueConfig .id, dataItem: item };
      this.updateValue.emit(backValue);
      console.log('周值变化', v);
    }
  }


  public getNewWeek(d: any) {
    if (d <= 9) {
      d = '0' + d;
    }
    return d;
  }

  public cascadeAnalysis(c?) {
    if (c && c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'setValue') {
           this.value= c[this.config.field]['setValue']['value'];
           this.valueChange( c[this.config.field]['setValue']['value']);
        }
      }

    }
  }
}
