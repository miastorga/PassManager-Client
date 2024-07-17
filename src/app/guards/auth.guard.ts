import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const navigation = router.getCurrentNavigation();

  if (navigation && navigation.extras.state?.['email']) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
