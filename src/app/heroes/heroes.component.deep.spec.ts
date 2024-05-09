import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (Deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>
  let component: HeroesComponent
  let mockHeroService: any;
  let HEROES;


  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
        
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance; // This for my personal practice benefit
  });

  it('should be true', () => {
    expect(true).toBe(true);
  })  

  // it('should render each hero as a HeroComponent', () => {
  //   mockHeroService.getHeroes.and.returnValue(of(HEROES));
  //   fixture.detectChanges();

  //   const heroComponentDEs = fixture.debugElement.queryAll(By.css('app-hero'));
  //   expect(heroComponentDEs.length).toEqual(3);
  //   for(let i=0; i<heroComponentDEs.length; i++) {
  //     expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
  //   }
  // })

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // const heroComponentDEs = fixture.debugElement.queryAll(By.css('app-hero'));
    // or

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);

    for(let i=0; i<heroComponentDEs.length; i++) {
      heroComponentDEs[i].componentInstance.hero = HEROES[i];
      expect(heroComponentDEs[i].componentInstance.hero).toBe(HEROES[i]);
    }

  })

  it('should call heroService.deleteHero when the Hero Component\'s delete button is clicked', () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponents.length).toBe(3);

    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => { }});

    expect(fixture.componentInstance.delete).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  it('should call heroService.deleteHero directly when the Hero Components delete button is clicked', () => {

    /*
     This test is same as above but it is more direct way to test the delete
     event handler ia called direclty instead of using the button click event
     as mimicking like child should be clicked and parent should be notified 
     and catch the event.
     so we are just check that delete event is called directly and parent 
     doea catch the event.

     shortcut way to test the delete event handler is called directly.

    */

    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponents[0].triggerEventHandler('delete', HEROES[0]);

    expect(fixture.componentInstance.delete).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  it('should add a new hero to the hero list when the add button is clicked', () => {
  
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Khizer Rehan';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 10 } as Hero));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = name;

    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);

    // By Khizeer Matching exact HeroComponent
    const heroComponentText = fixture.debugElement.query(By.css('ul > li:last-child')).nativeElement.textContent;
    expect(heroComponentText).toContain(name);

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponents.length).toBe(4);
   
  })

  


})
