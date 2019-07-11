import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  @Input()
  public layoutCollapsed;
  constructor(public settings: SettingsService) { }
  ngOnInit() {
    console.log('sidebar', this.layoutCollapsed);
  }
}
