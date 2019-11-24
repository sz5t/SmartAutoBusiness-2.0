import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
declare let CodeMirror: any;
@Component({
  selector: 'app-cn-code-edit',
  templateUrl: './cn-code-edit.component.html',
  styleUrls: ['./cn-code-edit.component.less'],
  encapsulation: ViewEncapsulation.None
})
//   encapsulation: ViewEncapsulation.None,
export class CnCodeEditComponent implements OnInit ,AfterViewInit{
  @Input() public config;
  @Input() public value;

  @ViewChild('CodeMirror', { static: true }) codeEditor: ElementRef;
  editor;
  divstyle={width:'100%',height:'330px'};
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
      mode: this.config.mode ?this.config.mode:"text/x-sql",
      readOnly: false,
      styleActiveLine:true,
      highlightFormatting: true,
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: this.config.autofocus?this.config.autofocus:true,
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      hintOptions: {
        tables: {
          users: { name: null, score: null, birthDate: null },
          countries: { name: null, population: null, size: null }
        }
      }
    });

    // this.editor.on("cursorActivity",  () =>{
    //   // 调用显示提示
    //  console.log('cursorActivity');
    // });
    this.editor.on("blur", () => {
      // 调用显示提示
     //  console.log('blur',this.getValue());
     // this.onblur();
    });

    if(this.value)
    this.setValue(this.value);


  }


  public getValue() {
    return this.editor.getValue();
  }

  public setValue(data?) {
    this.editor.setValue(data);
  }


}
