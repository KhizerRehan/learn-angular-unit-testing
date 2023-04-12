import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroComponent} from "../hero/hero.component";
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";


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
      console.log("Idx =>", idx, "=> Name:", HEROES[idx].name)
      expect(heroComponentsDEs[idx].componentInstance.hero.name).toEqual(HEROES[idx].name)
    }
  });

  // Approach-1
  // This is something to trigger event by
  // - grabbing DOM node
  // - trigger certain event
  // - do assertions

  it('should call heroservice.delete when the hero component delete button using DOM element', () => {

    spyOn(fixture.componentInstance, 'delete')

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit => which is fired by change detection
    fixture.detectChanges()

    /*
     Info: A component is basically a subclass of a directive.It's more sort of specialized directive.
    */

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDEs.length).toEqual(3);

    heroComponentsDEs[0].query(By.css('button'))
      .triggerEventHandler('click', {
        stopPropagation: () => {
        }
      }) // pass dummy implementation for event.stopPropagation

    expect(fixture.componentInstance.delete).toHaveBeenCalled();
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  })

  // Approach-2
  // This is something to trigger event by emitting even from EventEmitters instead of from DOM elements
  // - grabbing component instance
  // - access component event emitter property
  // - emit event and validate against assertions.


  it('should call heroservice.delete by emitting event emitter', () => {

    spyOn(fixture.componentInstance, 'delete')

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit => which is fired by change detection
    fixture.detectChanges()

    /*
     Info: A component is basically a subclass of a directive.It's more sort of specialized directive.
    */

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDEs.length).toEqual(3);

    // Fire EventEmitter from child to trigger event.
    (<HeroComponent>heroComponentsDEs[1].componentInstance).delete.emit();
    expect(fixture.componentInstance.delete).toHaveBeenCalled();
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);

  })

  it('should call heroservice.delete by triggerEventHandler', () => {

    spyOn(fixture.componentInstance, 'delete')

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit => which is fired by change detection
    fixture.detectChanges()

    /*
     Info: A component is basically a subclass of a directive.It's more sort of specialized directive.
    */

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDEs.length).toEqual(3);

    // Fire Event which parent is listening (delete) using @Output is catched
    // instead of making explicit trigger event from child and catch in parent.
    // (delete)="delete(hero)" => its basically calling (delete) directly from here
    (<DebugElement>heroComponentsDEs[2]).triggerEventHandler('delete', null)
    expect(fixture.componentInstance.delete).toHaveBeenCalled();
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[2]);

  })

});
