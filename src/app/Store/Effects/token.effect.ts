import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {setToken} from '../Actions/token.action';
import {Observable, tap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {tokenSelector} from '../Selectors/token.selector';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class TokenEffect {
  private readonly _actions: Actions <any> = inject (Actions);
  private readonly _store: Store <any> = inject (Store);
  private readonly _cookieService: CookieService = inject (CookieService);

  saveTokenOnCookies: Observable <any> = createEffect(
    (): Observable <any> => this._actions.pipe(
      ofType(setToken),
      withLatestFrom(this._store.select(tokenSelector)),
      tap(([state, tokenSelector]) => {
        this._cookieService.set('TOKEN',  tokenSelector, {secure: true, sameSite: "Strict"});
      })
    ), {dispatch: false}
  );
}
