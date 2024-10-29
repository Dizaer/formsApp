import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { retry } from 'rxjs';
import { ValidatorService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([
      [ 'Persona 4 Golden', Validators.required ],
      [ 'God Of War', Validators.required ]
    ])
  });

  public newFavorite: FormControl = new FormControl( '', Validators.required );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ):boolean | null {
    return this.validatorService.isValidField( this.myForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validatorService.getFieldError( this.myForm, field )
  }

  isValidFieldInArray( formArray: FormArray, i: number ) {
    return formArray.controls[i].errors
      && formArray.controls[i].touched;
  }

  onAddToFavorites():void {

    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite( i: number ):void {
    this.favoriteGames.removeAt(i);
  }

  onSubmit():void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }

}
