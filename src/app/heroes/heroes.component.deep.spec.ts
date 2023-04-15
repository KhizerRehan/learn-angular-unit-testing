import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroComponent} from "../hero/hero.component";
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {DebugElement, Directive, Input} from "@angular/core";

// Define RouterLink stub

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

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
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
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

  // Approach-3
  // This is something to trigger event by emitting even from EventEmitters instead of from DOM elements
  // - grabbing component instance
  // - access component event emitter property
  // - emit event and validate against assertions.

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

  it('should add a new hero to the hero list when add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()

    const name = "New Hero"
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 10}));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // We now each child instance <app-hero> will have its own button on DOM, so we need
    // to grab first button always as it will be besides input element for add new Hero
    const addButtonElement = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name; // set value to input box

    // Trigger event to invoke add method
    addButtonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;


    expect(heroText).toContain(name); // Video assertion

    // Assertion to check new Instance of app-hero is added
    const heroComponentsDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDEs.length).toEqual(4);

  })


  it('should NO new hero to the hero list when add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()

    const noName = null;
    mockHeroService.addHero.and.returnValue(of(null));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // We now each child instance <app-hero> will have its own button on DOM, so we need
    // to grab first button always as it will be besides input element for add new Hero
    const addButtonElement = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = noName; // set value to input box

    // Trigger event to invoke add method
    addButtonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;


    expect(heroText).not.toContain(noName); // Video assertion

    // Assertion to check new Instance of app-hero is added
    const heroComponentsDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDEs.length).toEqual(3);

  })


  it('should have the correct route for the first hero', () => {

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()

    const heroComponentsDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent))


    /*
      This will give Debug element for the anchor tag that has routerLink on it.
     */
    let routerLink = heroComponentsDEs[0].query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    // click on <app-hero> so that we can navigate to component and route URL can be updated
    heroComponentsDEs[0].query(By.css('a')).triggerEventHandler('click', null)


    // since testing against first hero
    expect(routerLink.navigatedTo).toBe('/detail/1');

  })

});
