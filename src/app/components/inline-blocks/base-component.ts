import {NgForm} from '@angular/forms';

export class BaseComponent {

  toggleEdit: boolean;
  isValidFormSubmitted = false;

  toggleEditing(form: NgForm) {
    if (this.toggleEdit) {
      form.ngSubmit.emit();
    }
    this.toggleEdit = !this.toggleEdit;
  }
}
