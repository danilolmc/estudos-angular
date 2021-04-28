import { Component, Input, OnInit } from '@angular/core';



/**
 * @example Botão padrão
 * <app-button>Botão</app-button>
 *
 *
 * @example Com propriedades customizáveis
 * <app-button
 * [width]="'150px'"
 * [height]="'50px'"
 * [padding]="5px"
 * [background-color]="'blue'"
 * [color]="'white'"
 * [label]="'Botão'"
 * >Botão</app-button>
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() width = '120px';
  @Input() height = '40px';
  @Input() padding = '';
  @Input() backgroundColor = '';
  @Input() color = '';
  @Input() label = '';

  constructor() { }

  ngOnInit(): void {
  }

}
