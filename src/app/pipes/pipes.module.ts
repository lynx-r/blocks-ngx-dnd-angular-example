import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from './safe.pipe';

const PIPES = [SafePipe];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {
}
