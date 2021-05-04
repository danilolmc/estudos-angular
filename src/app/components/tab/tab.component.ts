import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterContentInit {

  @ContentChildren(TabItemComponent)
  tabs: QueryList<TabItemComponent>;

  constructor() { }

  ngAfterContentInit() {

    const tabIsSelected = this.tabs.find(tab => tab.selected);

    if (!tabIsSelected) this.selectTab(this.tabs.first);

  }

  selectTab(clickedTab: TabItemComponent) {
    this.tabs.forEach(tab => tab.selected = false);

    clickedTab.selected = true;
  }

  get tabsContext() {
    return { tabs: this.tabs };
  }
}
