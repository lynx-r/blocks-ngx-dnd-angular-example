import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentComponent} from '../model/content-component';
import {BlockText} from '../model/block-text';
import {IBlockData} from '../model/block-data';
import {BaseComponent} from '../base-component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-string-block',
  template: `
    <mat-card class="block">
      <mat-card-header>
        <div mat-card-avatar class="header-image"></div>
        <mat-card-title>Текст</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="!toggleEdit">
          {{data.text}}
        </div>
        <form #textForm="ngForm" (ngSubmit)="onFormSubmit(textForm)">
          <mat-form-field *ngIf="toggleEdit">
            <textarea matInput
                      #text="ngModel"
                      [ngModel]="data.text"
                      name="text"
                      placeholder="Введите текст">
            </textarea>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <app-block-actions (toggleEdit)="toggleEditing(textForm)"></app-block-actions>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
      `
      .header-image {
        background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
        background-size: cover;
      }

      .block {
        background-color: yellow;
      }
    `
  ]
})
export class TextBlockComponent extends BaseComponent implements OnInit, ContentComponent {

  @Output() edited = new EventEmitter<IBlockData>();

  @Input() data: BlockText;

  toggleEdit: boolean;
  isValidFormSubmitted = false;

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.data.text = form.value.text;
    this.edited.emit(this.data);
    form.resetForm();
  }

}
