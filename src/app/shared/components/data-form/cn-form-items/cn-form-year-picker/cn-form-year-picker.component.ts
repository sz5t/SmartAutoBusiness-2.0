import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getMonth, getDate, getHours, getMinutes, getSeconds, getMilliseconds } from 'date-fns';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-year-picker',
  templateUrl: './cn-form-year-picker.component.html',
  styleUrls: ['./cn-form-year-picker.component.less']
})
export class CnFormYearPickerComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  date = null; // new Date();
  value;
  _style={"width": "100%"};
  constructor() { }

  ngOnInit() {
    this._style= this.config.style? this.config.style:{"width": "100%"};

  }

  valueChange(v?){
    if (v) {
      const sj = this.parserDate(v);
      if(this.date){
        const _oldyear= this.getDateFormat(this.date,"yyyy");
        const _newyear= this.getDateFormat(sj,"yyyy");
        if(_oldyear!==_newyear){
          this.date = sj;
        }
      } else {
        this.date = sj;
      }
  
 
    } else {
      this.date = null;
    }

    const backValue = { name: this.config.field, value: v, id: this.config.config.id};
    this.updateValue.emit(backValue);

  }

  onChange(result: Date): void {
    console.log('年变化onChange: ', result);
    if(result){
      const bc= this.getDateFormat(result,"yyyy");
      if (this.value !== bc) {
        this.value = bc;
      }
    }else {
      this.value = null;
    }

  }
  public cascadeAnalysis(c?) {}

  parserDate(date) {
    const t = Date.parse(date)
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, '/')))
    }
  }
  // 字符串转日期格式，strDate要转为日期格式的字符串
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  // let time1 = new Date().Format("yyyy-MM-dd");
  // let time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
  public getDateFormat(strDate: Date, fmt?) {
    const o = {
      "M+": getMonth(strDate) + 1, // 月份
      "d+": getDate(strDate), // 日
      "h+": getHours(strDate), // 小时
      "m+": getMinutes(strDate), // 分
      "s+": getSeconds(strDate), // 秒
      "q+": Math.floor((getMonth(strDate) + 3) / 3), // 季度
      "S": getMilliseconds(strDate) // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (strDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

  }


}
