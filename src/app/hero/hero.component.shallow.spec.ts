import {HeroComponent} from "./hero.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HeroComponent (Shallow) Spec', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    // Testbed allows to test both component + template

    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })

    // If you look on signature of this method it returns ComponentFixture
    // Component fixture is basically wrapper for component that is used for
    // testing and have "Few More" properties for testing purpose.
    fixture = TestBed.createComponent(HeroComponent)
  })


  it('should have the correct hero', ()=>{
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3};
    fixture.detectChanges()
    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  })


  it('should render hero name in an anchor tag', ()=>{
    fixture.componentInstance.hero = { id: 1, name: 'New Hero', strength: 3};
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('New Hero')

    // debugElement is basically wrapper around DOM node.
    // Advantage of debugElement also allows to access directive to DOM elements + many more
    let de = fixture.debugElement.query(By.css('a'))
    expect(de.nativeElement.textContent).toContain('New Hero')
  })



});
