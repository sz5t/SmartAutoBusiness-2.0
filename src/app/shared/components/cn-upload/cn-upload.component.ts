import { Component, OnInit, Inject } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cn-upload,[cn-upload]',
  templateUrl: './cn-upload.component.html',
  styleUrls: ['./cn-upload.component.less']
})
export class CnUploadComponent extends CnComponentBase implements OnInit {

  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
    this.tempValue = {};
    this.initValue = {};
    // init cacheValue
}
  ngOnInit() {
  }

  uploading = false;
  fileList: UploadFile[] = [];

 

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  execConfig={
    "ajaxConfig":{
      url:"",
      ajaxType:"post",
      params:[]
    }
  }
  handleUpload(): void {
debugger;
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any, index) => {
      formData.append('files[]', file);
      formData.append(`secretLevel_${index}`, '密级');
      formData.append(`remark_${index}`, '备注');
    });
    formData.append('refDataId', '引用id');
    this.uploading = true;
    // You can use any AJAX library you like
    const url = this.execConfig.ajaxConfig.url;
    const params = this.buildParameters( this.execConfig.ajaxConfig.params);
    this.fileList=[];
    this.uploading = false;

    // const response = await this.componentService.apiService[ this.execConfig.ajaxConfig.ajaxType](url, params).toPromise();

    // this._apiService.post(this.config.ajaxConfig['url'], formData).subscribe(

    // const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
    //   // reportProgress: true
    // });
    // this.http
    //   .request(req)
    //   .pipe(filter(e => e instanceof HttpResponse))
    //   .subscribe(
    //     () => {
    //       this.uploading = false;
    //       this.fileList = [];
    //       this.msg.success('upload successfully.');
    //     },
    //     () => {
    //       this.uploading = false;
    //       this.msg.error('upload failed.');
    //     }
    //   );
  }


  public buildParameters(paramsCfg, returnData?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: {},
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      returnValue: returnData ? returnData : {}
    });
  }


  /*
      【附件组件】：主要分为两部分，一部分是资源上传，一部分是资源查看
      readonly:上传资源，查看资源

      其他字段：表单描述 备注，密级等字段

      展示字段：表格配置，自定义配置 

      结构类似custom

      布局：{

      }
      组件：{
        上传组件：{
          上传所需的关键信息
        }
        表单组件：{
          完整表单配置，可级联等操作
        }
        表格组件：{
           完整表格配置
        }
      }
     
   */
  _config={

    


  };

  listOfData = [
    {
      key: '1',
      name: '附件001',
      age: "公开",
      address: '工艺规程001'
    },
    {
      key: '2',
      name: '附件002',
      age: "公开",
      address: '工艺规程002'
    },
    {
      key: '3',
      name: '附件003',
      age: "公开",
      address: '工艺规程003'
    }
  ];

}
