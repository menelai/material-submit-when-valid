import {Directive, EventEmitter, HostListener, inject, Output} from '@angular/core';
import {FormGroupDirective, NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {MAT_SUBMIT_WHEN_VALID_CONFIG} from './config';

@Directive({
  selector: '[matSubmitWhenValid]',
  standalone: true,
})
export class SubmitWhenValidDirective {
  @Output() readonly appSubmitWhenValid = new EventEmitter<NgForm | FormGroupDirective>();

  private readonly ngForm? = inject(NgForm, {optional: true});

  private readonly formGroup? = inject(FormGroupDirective, {optional: true});

  private readonly snackBar = inject(MatSnackBar);

  private readonly translate = inject(TranslateService);

  private readonly config = inject(MAT_SUBMIT_WHEN_VALID_CONFIG);

  @HostListener('ngSubmit')
  onSubmit(): boolean {
    const form = this.formGroup ?? this.ngForm;

    if (!form) {
      return false;
    }

    if (form.invalid) {
      this.snackBar.open(
        this.translate.instant('Check form validity'),
        undefined,
        this.config,
      );
      return false;
    }

    this.appSubmitWhenValid.emit(form);

    return true;
  }

}
