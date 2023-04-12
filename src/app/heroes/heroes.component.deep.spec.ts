import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroComponent} from "../hero/hero.component";
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";


describe('HeroesComponent (Deep) Spec', () => {

  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService;
  let HEROES: Hero[];

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    HEROES = [
      {id: 1, name: 'Khizer', strength: 15},
      {id: 2, name: 'Faran', strength: 10},
      {id: 3, name: 'Shahzeb', strength: 5}
    ]

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
    });

    // If you look on signature of this method it returns ComponentFixture
    // Component fixture is basically wrapper for component that is used for
    // testing and have "Few More" properties for testing purpose.
    fixture = TestBed.createComponent(HeroesComponent);
  })


  it('should be render each hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit => which is fired by change detection
    fixture.detectChanges()
    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentsDEs.length).toEqual(3);

    for (let idx = 0; idx < heroComponentsDEs.length; idx++) {
      console.log("Idx =>",idx, "=> Name:", HEROES[idx].name)
      expect(heroComponentsDEs[idx].componentInstance.hero.name).toEqual(HEROES[idx].name)
    }
  });

});
