import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html'
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  constructor( private fb: FormBuilder ) {}

  onSave():void {
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
  }

}
