import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { DataService } from '../../shared/services/data.service';

export const dataAvailableGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const dataService = inject(DataService);
  const router = inject(Router);
  const path = route.routeConfig?.path;

  return dataService.hasDataForRoute(path).pipe(
    map((hasData) => {
      if (hasData) {
        return true;
      } else {
        return router.createUrlTree(['/home']);
      }
    }),
  );
};
