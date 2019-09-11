import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare let CodeMirror: any;
@Component({
  selector: 'app-cn-code-edit',
  templateUrl: './cn-code-edit.component.html',
  styleUrls: ['./cn-code-edit.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CnCodeEditComponent implements OnInit ,AfterViewInit{
  @ViewChild('CodeMirror', { static: true }) codeEditor: ElementRef;
  editor;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
      mode: "text/x-sql",
      highlightFormatting: true,
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
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
       console.log('blur',this.getValue());
     // this.onblur();
    });


  }


  public getValue() {
    return this.editor.getValue();
  }

  public setValue(data?) {
    this.editor.setValue(data);
  }


}
