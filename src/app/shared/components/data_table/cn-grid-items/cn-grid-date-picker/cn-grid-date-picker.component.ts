import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { getYear, getISOWeek, getISOWeeksInYear, getMonth, getQuarter, getDate, getHours, getMinutes, getSeconds, getMilliseconds } from 'date-fns';

@Component({
  selector: 'app-cn-grid-date-picker',
  templateUrl: './cn-grid-date-picker.component.html',
  styleUrls: ['./cn-grid-date-picker.component.less']
})
export class CnGridDatePickerComponent implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  date = null; // new Date();
  value=null;
  cascadeValue: any;
  constructor() { }

  ngOnInit() {
    if( !this.config.showFormat){
      if(!this.config.showTime){
           this.config.showFormat ='yyyy-MM-dd';
      }else {
       this.config.showFormat ='yyyy-MM-dd HH:mm:ss';
      }
 
    }
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

    console.log('日期 onChange: ', result,      typeof(result));
    if(result){
      let sj =  result;
       if(typeof(result) ==='string'){
        sj   = this.parserDate(result);
       }

      const bc= this.getDateFormat(sj, this.config.showFormat);
      if (this.value !== bc) {
        this.value = bc;
      }
    }
    else{
      this.value =null;
    }
    this.valueChange( this.value);

  }

  /**
   * 值变化（内部机制自动赋值）需要将值转化为可识别数据类型
   * @param v 
   */
  public valueChange(v?){
    if (v) {
      const sj = this.parserDate(v);
      if(sj!== this.date)
      this.date = sj;
    } else {
      this.date = null;
    }
    const year = getYear(this.date);
    const week = getISOWeek(this.date);
    const weeks = getISOWeeksInYear(this.date);
    const month = getMonth(this.date)+1;
    const quarter=  getQuarter(this.date);
    const item = { "year": year, "quarter":quarter, "month": month, "week": week,"weeks":weeks, "weekString":`${year}-${week}`,"monthString":`${year}-${month}`  };
    console.log('多选值变化model=>data',v,  this.date, item);
    const backValue = { name: this.config.field, value: v, id: this.valueConfig.id,dataItem: item};
    this.updateValue.emit(backValue);
  }


  
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
  public getDateFormat(strDate: Date,fmt?){
    console.log('getDateFormat',strDate);
      const o = {
          "M+": getMonth(strDate) + 1, // 月份
          "d+": getDate(strDate), // 日
          "H+": getHours(strDate), // 小时
          "m+": getMinutes(strDate), // 分
          "s+":  getSeconds(strDate), // 秒
          "q+": Math.floor((getMonth(strDate) + 3) / 3), // 季度
          "S":  getMilliseconds(strDate) // 毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (strDate.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (const k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  
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
