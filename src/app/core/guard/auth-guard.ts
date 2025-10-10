import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { TokenService } from "../services/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.getToken()) {
    return true;
  }

  return router.parseUrl('/login');
};
