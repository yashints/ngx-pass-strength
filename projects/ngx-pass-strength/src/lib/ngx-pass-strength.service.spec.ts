import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxPassStrengthService } from './ngx-pass-strength.service';

describe('NgxPassStrengthService', () => {
  let injector : TestBed;
  let service: NgxPassStrengthService;
  let httpMock: HttpTestingController;

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
    service = injector.get(NgxPassStrengthService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#range', () => {
    it('should return an Observable<string>', () => {
      const hash = 'AC3DC';
      const dummyHashes = [
        { login : "John "},
        { login : "Doe"}
      ];
  
      service.range(hash)      
      .subscribe(data => {
        const dataObject = JSON.parse(data);
        expect(dataObject.length).toBe(2);
        expect(dataObject).toEqual(dummyHashes);
      });
  
      const req = httpMock.expectOne(`${service.pwnedPasswordsApiUrl}/${service.RANGE_URL}/${hash}`);
      expect(req.request.method).toBe("GET");
      req.flush(JSON.stringify(dummyHashes));
    });
  });
});
