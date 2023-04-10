import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroComponent} from "../hero/hero.component";
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from "@angular/core";
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {By} from "@angular/platform-browser";



fdescribe('HeroesComponent (Shallow) Spec', () => {

  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService;
  let HEROES: Hero[];

  @Component({
    selector: 'app-hero', // Same element as actual component
    template: '<div></div>',
  })
  class FakeHeroComponent {
    @Input() hero: Hero;

  }

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    HEROES = [
      {id: 1, name: 'Khizer', strength: 15},
      {id: 2, name: 'Faran', strength: 10},
      {id: 3, name: 'Shahzeb', strength: 5}
    ]

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
    });

    // If you look on signature of this method it returns ComponentFixture
    // Component fixture is basically wrapper for component that is used for
    // testing and have "Few More" properties for testing purpose.
    fixture = TestBed.createComponent(HeroesComponent)
  })


  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()
    expect(fixture.componentInstance.heroes.length).toBe(3)
  });


  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()

    let de = fixture.debugElement.queryAll(By.css('li'))
    expect(de.length).toBe(3)
  });


});
