import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order',
  template: `
    <div *ngIf="!toggleEdit" (click)="toggleEdit = true">
      № {{order}}
    </div>
    <form #orderForm="ngForm" (ngSubmit)="onFormSubmit(orderForm)">
      <mat-form-field *ngIf="toggleEdit">
        <input matInput
               #url="ngModel"
               [ngModel]="order"
               name="order"
               placeholder="Порядковый номер">
      </mat-form-field>
    </form>
  `,
  styles: []
})
export class OrderComponent implements OnInit {

  @Output() edited = new EventEmitter<number>();

  @Input() order: number;

  toggleEdit = false;

  constructor() {
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.edited.emit(this.order);
    this.toggleEdit = false;
    form.resetForm();
  }

}
