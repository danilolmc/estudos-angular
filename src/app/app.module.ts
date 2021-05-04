import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonModule } from './components/button/button.module';
import { RippeEffectDirective } from './directives/ripple-effect/rippe-effect.directive';
import { TabComponent } from './components/tab/tab.component';
import { TabItemComponent } from './components/tab/tab-item/tab-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RippeEffectDirective,
    TabComponent,
    TabItemComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
