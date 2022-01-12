import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {Apollo} from 'apollo-angular';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
