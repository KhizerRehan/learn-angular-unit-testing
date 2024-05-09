import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  flushMicrotasks,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HeroDetailComponent } from "./hero-detail.component";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

fdescribe("HeroDetailComponent", () => {
  let mockHeroService;
  let mockLocation;
  let mockActivatedRoute;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "Khizer", strength: 100 })
    );
  });

  it("should be true", () => {
    expect(true).toBe(true);
  });

  it("should render hero name in a h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "Khizer".toUpperCase()
    );
  });

  it("should set hero name in input box", () => {
    fixture.detectChanges();
    // expect(fixture.componentInstance.hero).toEqual({ id: 3, name: "Khizer", strength: 100 })

    // let inputElement = fixture.nativeElement.querySelector('input');
    // console.log(inputElement.value)

    expect(fixture.componentInstance.hero).toEqual({
      id: 3,
      name: "Khizer",
      strength: 100,
    });

    // Extra: Khizer Rehan
    // Wait for fixture to stabilize
    fixture.whenStable().then(() => {
      let inputElement = fixture.nativeElement.querySelector("input");
      expect(inputElement.value).toBe("Khizer");
    });
  });

  it("should call updateHero when save is called (done)", (done) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    setTimeout(
      () => {
        expect(mockHeroService.updateHero).toHaveBeenCalled();
        done();
      },
      300,
      false
    );
  });

  it("should call updateHero when save is called (async/await)", async () => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    await fixture.componentInstance.save();
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  });

  // Using fakeAsync to avoid fake timers

  it("should call updateHero when save is called (fakeAsync)", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    tick(250);

    expect(mockHeroService.updateHero).toHaveBeenCalled();

    /*
    using fakeAsync we are creating a fake zone and we are using tick to
    move the time forward by 250ms and then we are checking that the
    updateHero method is called or not.

    fakeAsync allows us to write async code in a synchronous way.
    */
  }));

  it("should call updateHero when save is called (flush)", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    /*
   flush()

    flush basically looks at the microtask queue and the macrotask queue and
    it flushes all the tasks in the queue and it will execute them all

    so if there are any tasks in the queue or waitinh it will execute them all and then
    it will fast forward the clock until all the tasks are done.

   */

    fixture.componentInstance.save();
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it("should call updateHero when saveWithPromise is called", waitForAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveWithPromise();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));


  it("should call updateHero when saveWithPromise (fakeAsync) is called ", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveWithPromise();

    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();

    // fixture.whenStable().then(() => {
    // });
  }));

  it("should call updateHero when saveWithPromiseWithDelay is called", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveWithPromiseWithDelay();

    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
    expect(mockHeroService.updateHero).toHaveBeenCalledTimes(1);

  }));
});
