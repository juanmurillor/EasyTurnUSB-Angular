import { TestBed } from '@angular/core/testing';

import { TipoAdminService } from './tipo-admin.service';

describe('TipoAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoAdminService = TestBed.get(TipoAdminService);
    expect(service).toBeTruthy();
  });
});
