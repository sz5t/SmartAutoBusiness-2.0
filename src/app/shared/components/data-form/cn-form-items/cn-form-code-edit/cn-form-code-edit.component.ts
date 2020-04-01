import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup } from '@angular/forms';
declare let CodeMirror: any;
@Component({
  selector: 'cn-code-edit,[cn-code-edit]',
  templateUrl: './cn-form-code-edit.component.html',
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./cn-form-code-edit.component.css']
})
// encapsulation: ViewEncapsulation.None Native Emulated ,
export class CnFormCodeEditComponent implements OnInit, AfterViewInit {
  @ViewChild('CodeMirror', { static: false }) codeEditor: ElementRef;
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  value = null;
  _value = null;
  isSpinning = true;
  editor;
  divstyle = { width: '100%', height: '330px' };
  constructor(
    private http: _HttpClient
  ) { }

  ngOnInit() {
    if (this.config.height) {
      this.divstyle.height = this.interpret(this.config.height);
    }
  }
  interpret(val) {
    return typeof val === "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
  }

  /**
   * text/x-sql
   * text/x-markdown
   * application/json
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
        //   mode: this.config.mode,
        //   readOnly: this.config.readOnly,
        //   styleActiveLine: true,
        //   highlightFormatting: true,
        //   indentWithTabs: true,
        //   smartIndent: true,
        //   lineNumbers: true,
        //   matchBrackets: true,
        //   autofocus: this.config.autofocus,
        //   //  lineWrapping: true, // 代码折叠
        //     // 代码折叠
        // // lineWrapping: true,
        // foldGutter: true,
        //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        //   extraKeys: { 'Ctrl-Space': 'autocomplete' },
        //   hintOptions: {
        //     tables: {
        //       users: { name: null, score: null, birthDate: null },
        //       countries: { name: null, population: null, size: null }
        //     }
        //   }

        mode: this.config.mode ? this.config.mode : "text/javascript",//  this.config.mode ? this.config.mode : "application/json",  // text/x-sql
        readOnly: this.config.readOnly,
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
      if (this.config.height) {
        this.editor.setSize(null, this.config.height);
      }
      this.isSpinning = false;

      // this.editor.on("cursorActivity",  () =>{
      //   // 调用显示提示
      //  console.log('cursorActivity');
      // });
      this.editor.on("blur", () => {
        // 调用显示提示
        // console.log('blur',this.getValue());
        this.onblur();
      });

      this.setValue(this._value);
    });

  }


  public getValue() {
    if (this.editor) {
      return this.editor.getValue();
    } else {
      return this._value;
    }

  }

  public setValue(data?) {
    if (!data)
      data = "";
    if (this.editor)
      this.editor.setValue(data);
  }


  public valueChange(v?) {

    // console.log('sql', v);
    if (v) {
      if (v !== this._value) {
        this._value = v;
        this.setValue(this._value);
      }
    } else {
      this._value = "";
      this.setValue(this._value);
    }
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    this.updateValue.emit(backValue);
  }

  public cascadeAnalysis(c?) {
  }
  public onblur(e?, type?) {
    this.assemblyValue();

  }
  public onKeyPress(e?, type?) {
    if (e.code === 'Enter') {
      this.assemblyValue();
    }
  }

  // 组装值
  public assemblyValue() {
    this._value = this.getValue();
    //  console.log('组装值', this._value);
    this.value = this._value;
    //  this.valueChange( this._value );
  }

}
