import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

// Used to create a mock HttpClient provided by Angular framework
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Hero } from "./hero";

describe('HeroService (Service)', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    // Inject method special method on TestBed that basically accesses
    // the DI registry so What below line is doing it Looks inside DI registry
    // for this TestBed module and find the service that correlates to that type
    //  and give Handle of that DI service
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService); // Get the instance of the service
  });

  it('should be true', ()=>{
    expect(true).toBeTruthy()
  })


  // HttpClientTestingModule will Intercept API call 
// We aren't doing actual API call

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      // Step1: Call getHero

      heroService.getHero(4).subscribe((hero: Hero ) => {
        expect(hero.id).toBe(4);
      })


      // Step2: Expect that the URL is correct
      const req = httpTestingController.expectOne('api/heroes/4');

      // req.flush decides which data to sends back when call is made

      req.flush({ id: 4, name: 'SuperDude', strength: 100 });


      httpTestingController.verify()

    
    })
  })

  // This should behave the same as the previous test
  // 2 different ways to write the same test
  //  - TestBed.inject
  //  - inject function from Testing module

  it('Duplicate: should call get with the correct URL', inject(
    [HeroService, HttpTestingController],
    (service: HeroService, controller: HttpTestingController) => {
     
      // Act
      heroService.getHero(4).subscribe((hero: Hero ) => {
        expect(hero.id).toBe(4);
      })


      // Assert
      const req = controller.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingController.verify();
    }
  ));


});
