import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from "@angular/common";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";

describe('HeroesComponent Spec', () => {

  let fixture: ComponentFixture<HeroDetailComponent>
  let mockActivatedRoute, mockHeroService, mockLocationService;

  beforeEach(() => {

    // Tried to create mock just like -> this.route.snapshot.paramMap.get('id');
    mockActivatedRoute = {
      snapshot: {
        paramMap: {get: () => '3'}
      }
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocationService = jasmine.createSpyObj(['back']);

    console.log("BeforeEach")

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocationService},
      ]
    })

    fixture = TestBed.createComponent(HeroDetailComponent)
  })

  it('should render hero name in a h2 tag', () => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}))
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE')
  })

  //  Testing since it is sync code being called

  it('should call updateHero when save is called', () => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}))
    mockHeroService.updateHero.and.returnValue(of({}))
    fixture.detectChanges();

    // invoke method of component
    fixture.componentInstance.save();
    expect(mockHeroService.updateHero).toHaveBeenCalled()
  })

  // ********************************
  // Testing Async code
  // Not sure following test is not passing but it custom implementation
  // to show difference between synchronous and asynchronous code implementation

  xit('should call updateHero when saveAsync is called', (done) => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}))
    mockHeroService.updateHero.and.returnValue(of({}))
    fixture.detectChanges();

    // invoke method of component
    fixture.componentInstance.saveAsync();

    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled()
      done();
    }, 300)
  })


  xit('should call updateHero when saveAsync is called and use fakeAsync', fakeAsync(() => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}))
    mockHeroService.updateHero.and.returnValue(of({}))
    fixture.detectChanges();

    // invoke method of component
    fixture.componentInstance.saveAsync();
    /*
       Angular provides fakeAsync() as part of the async testing utility,
       which allows you to write asynchronous tests in a synchronous-like
       manner using async and tick().

       - fakeAsync creates a special zone which allows async code to be
         executed in sync manner
     */
    tick(260)
    // To Fast forward time instead of manually waiting for <n of seconds>
    expect(mockHeroService.updateHero).toHaveBeenCalledOnceWith()
  }))

  // This ticket it useful when some promise or promise based library is used
  // to handle async operations

  it('should call updateHero when saveAsPromise is called and use waitForAsync', waitForAsync(() => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}))
    mockHeroService.updateHero.and.returnValue(of({}))
    fixture.detectChanges();

    fixture.componentInstance.saveAsPromise();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled()
    })
  }))

  // ********************************


});
