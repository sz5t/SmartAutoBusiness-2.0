import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
declare let CodeMirror: any;
@Component({
  selector: 'app-cn-code-edit',
  templateUrl: './cn-code-edit.component.html',
  styleUrls: ['./cn-code-edit.component.less'],
  encapsulation: ViewEncapsulation.ShadowDom
})
//   encapsulation: ViewEncapsulation.None, Native
export class CnCodeEditComponent implements OnInit, AfterViewInit {
  @Input() public config;
  @Input() public value;

  @ViewChild('CodeMirror', { static: true }) codeEditor: ElementRef;
  validateForm: FormGroup;
  editor;
  isSpinning = true;
  public modelstyle = { width: '100%', 'max-height': (window.document.body.clientHeight - 160).toString() + 'px', 'height': (window.document.body.clientHeight - 160).toString() + 'px' };

  divstyle = { width: '100%', 'min-height': (window.document.body.clientHeight - 160).toString() + 'px' };
  // divstyle = { width: '100%'};
  constructor() { }

  ngOnInit() {
    // this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
    //   mode: this.config.mode ?this.config.mode:"application/json",  // text/x-sql
    //   readOnly: false,
    //   styleActiveLine:true,
    //   height: (window.document.body.clientHeight-160).toString()+ 'px',
    //   highlightFormatting: true,
    //  // indentUnit : 2,  // 缩进单位，默认2
    //   indentWithTabs: true,
    //   smartIndent: true, // 是否智能缩进
    //   lineNumbers: true,
    //   matchBrackets: true,  // 括号匹配
    //   autofocus: this.config.autofocus?this.config.autofocus:true,
    //   extraKeys: { 'Ctrl-Space': 'autocomplete' },
    //   hintOptions: {
    //     tables: {
    //       users: { name: null, score: null, birthDate: null },
    //       countries: { name: null, population: null, size: null }
    //     }
    //   }
    // });
    // this.isSpinning = false;

  }



  ngAfterViewInit() {

    new Promise((resolve) => {
      this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
        mode: "text/javascript",//  this.config.mode ? this.config.mode : "application/json",  // text/x-sql
        readOnly: false,
        showCursorWhenSelecting: true, // 在选择时是否显示光标，默认为false。
        //    maxHighlightLength: 1000, //  当需要高亮很长的行时，为了保持响应性能，当到达某些位置时，编辑器会直接将其他行设置为纯文本(plain text)。默认为10000，可以设置为Infinity来关闭此功能。
        styleActiveLine: true,
        highlightFormatting: true,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true, // 括号匹配
        //  lineWrapping: true, // 代码折叠
        // 代码折叠

        // lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

        autofocus: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        hintOptions: {
          tables: {
            users: { name: null, score: null, birthDate: null },
            countries: { name: null, population: null, size: null }
          }
        }
      });
      setTimeout(() => {
        this.isSpinning = false;
      });
      this.editor.on("blur", () => {
        // 调用显示提示
        console.log('blur');
        //  this.onblur();
      });
      resolve();
    }).then(() => {

      setTimeout(() => {
        if (this.value) {

          console.log('ngAfterViewInitValue');
          this.setValue(this.value);

        }
      }, 200);
    });
    // this.editor.on("cursorActivity",  () =>{
    //   // 调用显示提示
    //  console.log('cursorActivity');
    // });



  }


  public getValue() {
    return this.editor.getValue();
  }

  public setValue(data?) {
    this.editor.setValue(data);
  }


}
