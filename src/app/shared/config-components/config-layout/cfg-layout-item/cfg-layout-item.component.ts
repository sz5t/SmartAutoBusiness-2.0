import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
import { BehaviorSubject } from 'rxjs';
import { BsnRelativesMessageModel, BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'cfg-layout-item,[cfg-layout-item]',
  templateUrl: './cfg-layout-item.component.html',
  styleUrls: ['./cfg-layout-item.component.css']
})
export class CfgLayoutItemComponent extends CnComponentBase implements OnInit, OnDestroy {
  @Input() public config;
  // public commonRelationSubject: BehaviorSubject<BsnRelativesMessageModel>;
  // public commonRelationTrigger: BehaviorSubject<BsnRelativesMessageModel>;
  public is_drag = true;
  public is_dragj = true;
  public component = '';
  modelstyle = {};
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  public ngOnInit() {
    console.log('-->布局列-》', this.config);
    if (this.config) {
      if (this.config.container)
        this.component = this.config.container;
    } else {
      this.config = {};
    }
    this.js();
  }

  public f_ondrop(e?, d?) {
    e.preventDefault();
    console.log('拖动行ondrop', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行ondrop临时值', ss);
    this.component = ss;
    this.config.container = 'component';
    const fieldIdentity = CommonUtils.uuID(36);
    const componentTitle = ss + '组件';
    this.config['component'] = { id: fieldIdentity, title: componentTitle, type: ss, container: ss };
    console.log('拖拽后组件状态----》', this.component);
  }
  public f_ondragover(e?, d?) {
    // 进入，就设置可以拖放进来（设置不执行默认：【默认的是不可以拖动进来】）
    if (this.is_drag)
      e.preventDefault();
    // --05--设置具体效果copy
    e.dataTransfer.dropEffect = 'copy';
    // if (this.is_dragj) {
    //   this.is_dragj = false;
    //   window.setTimeout(() => { this.setState(); }, 500);
    // }


  }

  public f_ondragleave(e) {
    console.log('离开当前领地++++');
  }
  public f_ondragenter(e, d?) {
    console.log('***进入当前领地****');
  }

  public setState() {
    this.is_dragj = true;
    // console.log('进入当前领地++++');
  }
  public divClick() {

    if (this.modelstyle.hasOwnProperty('border')) {
      this.modelstyle = {};
      this.fs();
    }
    else {
      this.modelstyle = { "border": "2px solid rgb(247, 4, 4)" }
      this.fs();
    }
    // console.log('点击div', this.config);


  }


  // 选中，取消选中消息发送

  public js() {
    if (!this.subscription$) {
      this.subscription$ = this.componentService.commonRelationSubject.subscribe(
        data => {
       //  console.log('liu 接收消息', data, this.config.id);
          if (data.trigger.triggerType === "LAYOUT") {
            if (data.trigger.trigger === "COMPONENT_SELECTED") {
              if (data.viewId === this.config.id) {

              } else {
                if (this.modelstyle.hasOwnProperty('border')) {
                  this.modelstyle = {};
                }
              }
            }
          }
       

        });

    }
  }

  /**
   * name
   */
  public fs() {
    this.componentService.commonRelationSubject.next(
      new BsnRelativesMessageModel(
        {
          triggerType: "LAYOUT",
          trigger: "COMPONENT_SELECTED"
        },
        this.config.id,
        this.config
      )
    );



  }

  public ngOnDestroy() {
    // 释放级联对象
    this.unsubscribeRelation();
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }





}
