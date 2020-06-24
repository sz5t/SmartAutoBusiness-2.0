import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-carouse,[cn-carouse]',
  templateUrl: './cn-carouse.component.html',
  styleUrls: ['./cn-carouse.component.less']
})
export class CnCarouseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  array = [1, 2, 3, 4];
  effect = 'scrollx';

}
