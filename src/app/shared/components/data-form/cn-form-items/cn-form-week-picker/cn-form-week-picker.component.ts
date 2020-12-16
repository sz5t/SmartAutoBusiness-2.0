import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getISOWeek, getYear, setISOWeek, addWeeks, addISOWeekYears, getMonth } from 'date-fns';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-week-picker',
  templateUrl: './cn-form-week-picker.component.html',
  styleUrls: ['./cn-form-week-picker.component.less']
})
export class CnFormWeekPickerComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  date = null; // new Date();
  value = null;
  _style = { "width": "100%" };
  constructor() { }

  ngOnInit() {
    this._style = this.config.style ? this.config.style : { "width": "100%" };

  }
  getWeek(result: Date): void {
    if (result) {
      let year = getYear(result);
      const week = this.getNewWeek(getISOWeek(result));
      const month = getMonth(result);
      if(month===0){
        if(week>40){
          year =year-1;
        }
      }
      const yw = `${year}-${week}`;
      if (this.value !== yw) {
        this.value = yw
      }
      console.log('周变化week: ', yw,result);
    } else {
      this.value = null;
    }



  }
  public valueChange(v?) {
    if (v) {
      const YearAndWeek = v.split('-');
      if (YearAndWeek.length > 1) {
        const _year = YearAndWeek[0];
        const _week = YearAndWeek[1]-1;
       // const datenew:Date = addWeeks(new Date(Number(_year)-1, 1, 1), _week);

        const datenew:Date =  addWeeks(new Date(_year, 0, 1),_week);
        const yearold = getYear(this.date);
        const weekold = this.getNewWeek(getISOWeek(this.date));
        const ywold = `${yearold}-${weekold}`;
        const yearnew = getYear(datenew);
        const weeknew = this.getNewWeek(getISOWeek(datenew));
        const ywnew = `${yearnew}-${weeknew}`;
        if (ywold !== ywnew) {
          this.date = datenew;
        }
        console.log('==年周计算出时间==', datenew);
      }
      const year = getYear(this.date);
      const week = this.getNewWeek(getISOWeek(this.date));
      const weekValue = getISOWeek(this.date);
      const item = { "year": year, "week": weekValue, "weekString": `${year}-${week}` };
      if (!this.date) {
        item['year'] = null;
        item['week'] = null;
        item['weekString'] = null;
      }
      const backValue = { name: this.config.field, value: v, id: this.config.config.id, dataItem: item };
      this.updateValue.emit(backValue);
      console.log('周值变化', v);
    }
  }


  public getNewWeek(d: any) {
   // d=d+1;
    if (d <= 9) {
      d = '0' + d;
    }
    return d;
  }

  public cascadeAnalysis(c?) { }


  public computeWeek(){

     // 1.计算出当前年+周的日期
     // 2.当前日期周几   周天属于下一周  周天内属于上一周

  }


}
