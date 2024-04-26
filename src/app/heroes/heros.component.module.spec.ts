import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";

// NOTE:

// THIS FILE TESTS ARE 100% SAME as of `heros.component.spec.ts`
// THIS FILE ONLY USES "TestBed" TO CONFIGURE `configureTestingModule`

describe("HerosComponent Using TestBed", () => {
  let HEROES: Hero[];
  let mockHeroService: any;
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: "SpiderDude", strength: 8},
      {id: 2, name: "Wonderful Woman", strength: 24},
      {id: 3, name: "SuperDude", strength: 55},
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
    });

    fixture = TestBed.createComponent(HeroesComponent)
    component = fixture.componentInstance;
  });


  it('should create a component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should set heroes correctly from the service", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // console.log("Before:Heroes", component.heroes)
    fixture.detectChanges()
    // console.log("After:Heroes", component.heroes)
    expect(component.heroes.length).toBe(3);
  })

  it("should delete hero correctly from the service", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES)); // fetch heroes
    fixture.detectChanges()

    mockHeroService.deleteHero.and.returnValue(of(true)); // deleteHero returns an osb$ we need to mock obs return
    component.delete(component.heroes[1]);
    expect(component.heroes.length).toBe(2);
  })

  it("should call deleteHero method", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES)); // fetch heroes
    fixture.detectChanges()

    mockHeroService.deleteHero.and.returnValue(of(true));
    console.log("Before:Hero", component.heroes[2])
    component.delete(HEROES[2]);
    console.log("After:Hero", component.heroes[2])

    expect(mockHeroService.deleteHero).toHaveBeenCalled();
    expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(1);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  });

});
