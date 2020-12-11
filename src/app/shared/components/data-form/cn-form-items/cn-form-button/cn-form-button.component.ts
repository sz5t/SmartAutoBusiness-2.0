import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'app-cn-form-button',
  templateUrl: './cn-form-button.component.html',
  styleUrls: ['./cn-form-button.component.less']
})
export class CnFormButtonComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();

  public value: any = null;
  constructor() { }

  ngOnInit() {
  }

  /**
   * valueChange
   */
  public valueChange(v?) {
    this.value = v;
    // console.log('label 值变化', v);
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    this.updateValue.emit(backValue);
  }

  public cascadeAnalysis(c?) {
  }


  public btn_click(){
    this.value = CommonUtils.uuID(36);
    console.log('点击按钮');
  }

  resetForm(): void {
    this.formGroup.reset();
    this.value = CommonUtils.uuID(36);
  }


  /*
  
     表单内按钮组配置： 描述当前表单内部操作行为，可以为单个按钮，也可谓按钮组。
     buttonGroup:[
       {
         "id":"",
         "dataItem":[
           {
            "name":"",
            "type":"",
            "valueName":"",
            "value":""
           }
         ]

       }
     ]
  
  */

btnlist={
 buttonGroup:[
  {
    "id":"",
    "dataItem":[
      {
       "name":"",
       "type":"",
       "valueName":"",
       "value":""
      }
    ]

  }
]
}



}
