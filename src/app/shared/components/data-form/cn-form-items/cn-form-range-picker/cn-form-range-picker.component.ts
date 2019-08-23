import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-form-range-picker',
  templateUrl: './cn-form-range-picker.component.html',
  styleUrls: ['./cn-form-range-picker.component.less']
})
export class CnFormRangePickerComponent implements OnInit {
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];
  constructor() { }

  ngOnInit() {
  }

  onChange(result: Date): void {
    console.log('时间范围-onChange: ', result);
  }

}
