import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cfg-carousel',
  templateUrl: './cfg-carousel.component.html',
  styleUrls: ['./cfg-carousel.component.less']
})
export class CfgCarouselComponent implements OnInit {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  constructor() { }

  ngOnInit() {
  }

}
