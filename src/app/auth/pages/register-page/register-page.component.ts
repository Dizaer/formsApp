import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email.validator.service';

@Component({
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ this.emailValidator ]],
    username: ['', [Validators.required, this.validatorService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  });


  constructor( 
    private fb: FormBuilder, 
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.myForm, field );
  }

  onSubmit():void {
    this.myForm.markAllAsTouched();
  }

}
