import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {Apollo} from 'apollo-angular';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
