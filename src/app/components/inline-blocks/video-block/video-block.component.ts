import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentComponent} from '../../../model/content-component';
import {BlockVideo} from '../../../model/block-video';
import {BaseComponent} from '../base-component';
import {BlockData} from '../../../model/block-data';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-media-block',
  template: `
    <mat-card class="block">
      <mat-card-header>
        <div mat-card-avatar class="header-image"></div>
        <mat-card-title>Видео</mat-card-title>
        <mat-card-subtitle>
          <app-order [order]="order"></app-order>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="!toggleEdit">
          <div *ngIf="data.youtubeId">
            <iframe [src]="'https://www.youtube.com/embed/' + data.youtubeId | safe" width="560" height="315" allowfullscreen></iframe>
          </div>
          <div *ngIf="data.url">
            <video width="400" height="300" controls="controls">
              <source [src]="data.url" type="video/mp4">
            </video>
          </div>
        </div>
        <form #videoForm="ngForm" (ngSubmit)="onFormSubmit(videoForm)">
          <table>
            <tr>
              <td>
                <mat-form-field *ngIf="toggleEdit">
                  <input matInput
                         #url="ngModel"
                         [ngModel]="data.url"
                         name="url"
                         placeholder="Укажите URL видео в формате mp4"
                         [pattern]="urlPattern">
                  <div *ngIf="url.invalid && (url.dirty || url.touched)">
                    <mat-error *ngIf="url.errors.pattern">
                      Не верный URL
                    </mat-error>
                  </div>
                </mat-form-field>
              </td>
            </tr>
            <tr>
              <td>
                <mat-form-field *ngIf="toggleEdit">
                  <input matInput
                         #youtubeId="ngModel"
                         [ngModel]="data.youtubeId"
                         name="youtubeId"
                         placeholder="Укажите ID видео с YouTube">
                </mat-form-field>
              </td>
            </tr>
          </table>
        </form>
      </mat-card-content>
      <mat-card-actions (mouseleave)="moves.emit(true)" (mouseenter)="moves.emit(false)">
        <app-block-actions (toggleEdit)="toggleEditing(videoForm)" (destroy)="destroy.emit()"></app-block-actions>
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
        background-color: darkred;
      }
    `
  ]
})
export class VideoBlockComponent extends BaseComponent implements OnInit, ContentComponent {

  @Output() edited = new EventEmitter<BlockData>();
  @Output() destroy = new EventEmitter<any>();
  @Output() moves = new EventEmitter<boolean>();

  @Input() data: BlockVideo;
  @Input() order: number;

  urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.data.url = form.value.url;
    this.data.youtubeId = form.value.youtubeId;
    this.edited.emit(this.data);
    form.resetForm();
  }

}
