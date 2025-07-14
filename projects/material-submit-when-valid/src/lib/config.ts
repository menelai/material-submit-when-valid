import {InjectionToken} from '@angular/core';
import {MatSnackBarConfig} from '@angular/material/snack-bar';

export const MAT_SUBMIT_WHEN_VALID_CONFIG = new InjectionToken<MatSnackBarConfig>(
  'MatSubmitWhenValidConfig',
  {
    providedIn: 'root',
    factory: () => ({
      duration: 5000,
      panelClass: 'warning',
    })
  }
);
