import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 65
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl( '' ),
  //   price: new FormControl( 0 ),
  //   inStorage: new FormControl( 0 )
  // })
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ] ], 
  })

  constructor( 
    private fb: FormBuilder,
    private validatorService: ValidatorService 
  ) {}

  ngOnInit(): void {
    // this.myForm.reset( rtx5090 )
  }

  isValidField( field: string ):boolean | null {
    return this.validatorService.isValidField( this.myForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validatorService.getFieldError( this.myForm, field )
  }

  onSave(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();  
      return;
    }
    
    console.log(this.myForm.value);
    
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}
