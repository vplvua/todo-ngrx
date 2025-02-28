import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';

import { selectIsLoading } from '../../store/loading/loading.selectors';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe, ProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  isLoading$ = this.store.select(selectIsLoading).pipe(distinctUntilChanged());

  constructor(private store: Store) {}
}
