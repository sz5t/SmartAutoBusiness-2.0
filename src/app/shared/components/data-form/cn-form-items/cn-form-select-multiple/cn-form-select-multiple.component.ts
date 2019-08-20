import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-form-select-multiple',
  templateUrl: './cn-form-select-multiple.component.html',
  styleUrls: ['./cn-form-select-multiple.component.less']
})
export class CnFormSelectMultipleComponent implements OnInit {

  constructor() { }

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

}
