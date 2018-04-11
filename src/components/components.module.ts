import { NgModule } from '@angular/core';
import { TreeViewComponent } from './tree-view/tree-view';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [TreeViewComponent],
	imports: [CommonModule],
	exports: [TreeViewComponent]
})
export class ComponentsModule {}
