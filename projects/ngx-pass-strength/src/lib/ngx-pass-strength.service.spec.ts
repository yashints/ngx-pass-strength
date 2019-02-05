import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxPassStrengthService } from './ngx-pass-strength.service';

describe('NgxPassStrengthService', () => {
  let injector : TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxPassStrengthService
      ],
      imports: [
        HttpClientTestingModule
      ],
    });

    injector = getTestBed();

  });

  it('should be created', () => {
    const service = injector.get(NgxPassStrengthService);
    expect(service).toBeTruthy();
  });

  // describe('#range', () => {
  //   it('should return an Observable<string>', () => {
  //     const hash = 'AC3DC';
  //     const dummyHashes = `[
  //       { login: 'John' },
  //       { login: 'Doe' }
  //     ]`;
  
  //     service.range(hash).subscribe(data => {
  //       expect(data.length).toBe(2);
  //       expect(data).toEqual(dummyHashes);
  //     });
  
  //     const req = httpMock.expectOne(`${service.pwnedPasswordsApiUrl}/${service.RANGE_URL}/${hash}`);
  //     expect(req.request.method).toBe("GET");
  //     req.flush(dummyHashes);
  //   });
  // });
});
