// Компонет, открывающий окно https://github.com/nik-m2/window-modal/blob/master/docs/options.md
// Установка. 1. Выполнить npm install window-modal
//            2. В module.ts указать WindowModalComponent в declarations.

// Пример вставки компонента в html.
//                                                                                                              Начальные параметры:
// <app-window-modal [id]="'id1'" [widthWindow]='300' [heightWindow]='300'                                      id, ширина, высота окна,
//                   [leftDistance]='10' [topDistance]='10' [titleName]="'titleName'"                           отступы, наименование окна,
//                   [colorTitle]="'#19faff'" [colorMinimizeButton]="'white'" [colorCloseButton]="'#1e90ff'"    настройка цветов,
//                   [isDeleteMinimizeButton]="false" [isMove]="true"><ng-template #flag>                       удалить кнопку свернуть,
//                                                                                                              перемещение окна.
//  <p>контент окна №1</p>
//  <p>контент окна №2</p>
//  <p>контент окна №3</p>
//
// </ng-template></app-window-modal>


import {AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import WindowModal from 'window-modal'; // Импорт WindowModal

@Component({
  selector: 'app-window-modal',
  template: `<div id={{this.id}} ><ng-container *ngTemplateOutlet='flag'></ng-container></div>`
})

export class WindowModalComponent implements AfterViewInit, OnInit {
  @Input() id: string;
  @Input() colorTitle: string;
  @Input() colorMinimizeButton: string;
  @Input() colorCloseButton: string;
  @Input() widthWindow: number;
  @Input() heightWindow: number;
  @Input() leftDistance: number;
  @Input() topDistance: number;
  @Input() titleName: string;
  @Input() isMove: boolean;
  @Input() isDeleteMinimizeButton: boolean;
  @ContentChild('flag') flag: TemplateRef<any>;                 // Импорт содержимого ng-template из html в template компонента.
  @Output() onClose = new EventEmitter();

  constructor() {}

  openWindowModal() {
    let wnd = new WindowModal({
      title: this.titleName,                                    // При необходимости можно добавить опции:
      elementSelector: '#' + this.id,                           // 1. значок окна 2. удалить кнопку закрыть окно
      size: {x: this.widthWindow, y: this.heightWindow},        // 3. запретить изменять размер окна 4. компактный вид окна
      pos: {x: this.leftDistance, y: this.topDistance},
      hideMinimize: this.isDeleteMinimizeButton,
      movable: this.isMove,
    });
    wnd.addEventListener('close', () => this.onClose.emit());   // событие close
    return wnd;
  }

  ngOnInit() {                                                   // Проверки на ключевые начальные параметры
    if (typeof this.id === 'undefined') {
      this.id = 'Bad_id';
      console.log('Укажите атрибут "id" компонента app-window-modal. По ум. назначен "id" = Bad_id". Пример см. в компоненте.');
    }
    if (typeof this.widthWindow === 'undefined') {
      this.widthWindow = 200;
      console.log('Укажите атрибут "widthWindow" компонента app-window-modal. По ум. назначен "widthWindow" = 200. Пример см. в компоненте.');
    }
    if (typeof this.heightWindow === 'undefined') {
      this.heightWindow = 200;
      console.log('Укажите атрибут "heightWindow" компонента app-window-modal. По умолчанию назначен "heightWindow" = 200. Пример см. в компоненте.');
    }
    if (typeof this.topDistance === 'undefined') {
      this.topDistance = 90;
      console.log('Укажите атрибут "topDistance" компонента app-window-modal. По ум. назначен "topDistance" = 90. Пример см. в компоненте.');
    }
    if (typeof this.leftDistance === 'undefined') {
      this.leftDistance = 500;
      console.log('Укажите атрибут "leftDistance" компонента app-window-modal. По ум. назначен "leftDistance" = 500. Пример см. в компоненте.');
    }
  }

  ngAfterViewInit() {
    this.openWindowModal();
    const bufferTitle: HTMLElement = document.getElementById(this.id).getElementsByClassName('WindowModal-bar')[0] as HTMLElement;
    bufferTitle.style.backgroundColor = this.colorTitle; // Назначение цвета титлу.
    const bufferMinimize: HTMLElement = document.getElementById(this.id).getElementsByClassName('WindowModal-button')[0] as HTMLElement;
    bufferMinimize.style.backgroundColor = this.colorMinimizeButton; // Назначение цвета кнопке 'скрыть'.
    const bufferClose: HTMLElement = document.getElementById(this.id).getElementsByClassName('WindowModal-button')[1] as HTMLElement;
    bufferClose.style.backgroundColor = this.colorCloseButton; // Назначение цвета кнопке 'закрыть'.
  }

}
