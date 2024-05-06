import { ComponentFixture, TestBed } from "@angular/core/testing";
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
});
