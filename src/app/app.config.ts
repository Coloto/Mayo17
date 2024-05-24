import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { entorno } from './_environment/entorno';
import { JwtModule } from '@auth0/angular-jwt';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export function tokenGetter(){
  return sessionStorage.getItem(entorno.TOKEN_NAME);
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ),
  provideHttpClient(
    withInterceptorsFromDi()
  ),]
};
