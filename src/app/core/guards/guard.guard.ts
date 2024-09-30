import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { firstValueFrom } from 'rxjs';

export const guardGuard: CanActivateFn = (route, state) => {
  const fb: FirebaseService = inject(FirebaseService);
  const router: Router = inject(Router);

  const userCode = localStorage.getItem('usercode');
  const key = localStorage.getItem('key');

  // Check if both values are present
  if (userCode && key) {
    return firstValueFrom(fb.getAllusers(userCode, key)).then((res: any) => {
      if (res.length > 0) {
        fb.canaccess.next(true)
        // router.navigate(['../entry']);
        return true;
      } else {
        // Navigate to user if no users found
        fb.canaccess.next(false)
        router.navigate(['../user']);

        return false; // Deny access
      }
    }).catch(() => {
      // Handle error and deny access
      fb.canaccess.next(false)
      router.navigate(['../user']);

      return false;
    });
  }

  // If usercode or key is not present, deny access
  router.navigate(['../user']);
  return false;
};
