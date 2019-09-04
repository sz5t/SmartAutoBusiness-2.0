import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-textarea',
  templateUrl: './cn-form-textarea.component.html',
  styleUrls: ['./cn-form-textarea.component.less']
})
export class CnFormTextareaComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  value;
  constructor() { }

  ngOnInit() {
  }

  public valueChange(v?) {

  }

  public cascadeAnalysis(c?) {}
}
