import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { getMonth, getDate, getHours, getSeconds, getMinutes, getMilliseconds } from 'date-fns';

@Component({
  selector: 'app-cn-grid-year-picker',
  templateUrl: './cn-grid-year-picker.component.html',
  styleUrls: ['./cn-grid-year-picker.component.less']
})
export class CnGridYearPickerComponent implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  date = null; // new Date();
  value;
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

    const backValue = { name: this.config.field, value: v, id: this.valueConfig.id};
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
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

  }

}
