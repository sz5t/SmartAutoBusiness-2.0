import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configure-form',
  templateUrl: './configure-form.component.html',
  styleUrls: ['./configure-form.component.less']
})
export class ConfigureFormComponent implements OnInit {
  @Input() public config: any;
  public formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
