import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html'
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor( 
    private fb: FormBuilder, 
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person )
  }

  isValidField( field: string ):boolean | null {
    return this.validatorService.isValidField( this.myForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validatorService.getFieldError( this.myForm, field )
  }


  onSave():void {
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

}
