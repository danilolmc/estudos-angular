import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'generic';

  form = new FormGroup({
    name: new FormControl({ value: 'teste', disabled: true })
  })

  ngOnInit(): void {
  }
}
