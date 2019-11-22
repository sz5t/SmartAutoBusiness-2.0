import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cn-grid-switch',
  templateUrl: './cn-grid-switch.component.html',
  styleUrls: ['./cn-grid-switch.component.less']
})
export class CnGridSwitchComponent implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  value = null;
  count = 0;
  selectOptions={
    check:{},
    close:{}
  };
  constructor() { }
// "options":[{"type":"check","lable":"是","value":"是"},{"type":"close","lable":"否","value":"否"}]
  ngOnInit() {

    if(this.config.options){
      this.config.options.forEach(element => {
        if(element['type']==='check') {
          this.selectOptions['check'] = element;
        }
        if(element['type']==='close') {
          this.selectOptions['close'] = element;
        }
      });
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
this.config
    setTimeout(() => {
      if(this.selectOptions['check'].hasOwnProperty('value') ){
         if(v_value===this.selectOptions['check']['value']){
          this.value =true;
         }
      }
      if(this.selectOptions['close'].hasOwnProperty('value') ){
        if(v_value===this.selectOptions['close']['value']){
         this.value =false;
        }
     }
      this.valueChange( this.value);
    });
  }

  public valueChange(v?) {

   //  console.log('switch',v);
   let bv =v;
    if(this.selectOptions['check'].hasOwnProperty('value') ){
      if(v===true){
        bv =this.selectOptions['check']['value'];
      }
   }
   if(this.selectOptions['close'].hasOwnProperty('value') ){
     if(v===false){
      bv =this.selectOptions['close']['value'];
     }
  }
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:bv,count:this.count};
    this.updateValue.emit(backValue);
    this.count +=1;
    
  }
  public cascadeAnalysis(c?) {}

  // 远程操作
public remoteOperation(){
  this.count =0;
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

}
