import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-form-year-picker',
  templateUrl: './cn-form-year-picker.component.html',
  styleUrls: ['./cn-form-year-picker.component.less']
})
export class CnFormYearPickerComponent implements OnInit {
  date = null; // new Date();
  constructor() { }

  ngOnInit() {
  }

  onChange(result: Date): void {
    console.log('年变化onChange: ', result);
  }

}
