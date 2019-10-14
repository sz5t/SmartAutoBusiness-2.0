import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cn-attribute-form,[cn-attribute-form]',
  templateUrl: './cn-attribute-form.component.html',
  styleUrls: ['./cn-attribute-form.component.less']
})
export class CnAttributeFormComponent implements OnInit {
  @Input() public config;
  constructor() { }

  ngOnInit() {
    console.log('======>',this.config);
  }

}
