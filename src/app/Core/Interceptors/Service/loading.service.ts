import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {setLoadingValue} from '../../../Store/Actions/loading.action';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  _store: Store<{ loading: boolean }> = inject(Store);

  show(isLoading: boolean): void {
    this._store.dispatch(setLoadingValue({value: isLoading}));
  }

  hide(isLoading: boolean): void {
    this._store.dispatch(setLoadingValue({ value: isLoading }));
  }
}
