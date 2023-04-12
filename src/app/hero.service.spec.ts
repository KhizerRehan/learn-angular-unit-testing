import {inject, TestBed} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Hero} from "./hero";

describe('HeroService Spec', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add'])

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  })


  describe('getHero', () => {

    it('should call get with correct URL using Callback Inject method', inject(
      [HeroService, HttpTestingController],
      (service: HeroService, controller: HttpTestingController) => {
        service.getHero(4).subscribe();


        // ****************************************
        // If you uncomment below line it will still make test pass
        // since we call method subscribe on different id asn expectOne checks
        // if following param request has been made inorder to avoid ANY multiple
        // requests needs to be send check next test case.
        // service.getHero(3).subscribe();
        // ****************************************
        const req =  controller.expectOne(`api/heroes/${4}`);

        // "flush" to is used to mock the response of an HTTP
        // request made by the HttpClient during testing.
        req.flush({id:4, name: "Khizer Rehan", strength: 100} as Hero)

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe('api/heroes/4');

      }));

    it('should verify 1(one) request is triggered', inject(
      [HeroService, HttpTestingController],
      (service: HeroService, controller: HttpTestingController) => {
        service.getHero(4).subscribe();

        // This will fail test if you try to trigger
        // multiple requests service.getHero(3).subscribe();
        const req =  controller.expectOne(`api/heroes/${4}`);

        // "flush" to is used to mock the response of an HTTP
        // request made by the HttpClient during testing.
        req.flush({id:4, name: "Khizer Rehan", strength: 100} as Hero)

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe('api/heroes/4');

        controller.verify();
      }));

    it('should call get with correct URL using local instance', () => {
      heroService.getHero(5).subscribe();
      const req =  httpTestingController.expectOne('api/heroes/5');
      // "flush" to is used to mock the response of an HTTP
      // request made by the HttpClient during testing.
      req.flush({id:5, name: "New Khizer Rehan", strength: 200} as Hero)

      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('api/heroes/5');

      httpTestingController.verify();
    });

  })

});
