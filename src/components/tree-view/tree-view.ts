import { Component, forwardRef, Input } from '@angular/core';

/**
 * Generated class for the TreeViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tree-view',
  templateUrl: 'tree-view.html'
})
export class TreeViewComponent {
  @Input() node;

  constructor() {
  }

}
