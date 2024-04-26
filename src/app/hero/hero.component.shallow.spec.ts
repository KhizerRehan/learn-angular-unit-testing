import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent (Shallow Tests)", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
      // NO_ERRORS_SCHEMA As Console will throw Error as Template is using `routerLink`
      // We need to inform configureTestingModule we are ignoring ATM.
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should create the hero component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  })

  it("should have the correct hero", () => {
    fixture.componentInstance.hero = {id: 1, name: "SuperDude", strength: 3};
    expect(fixture.componentInstance.hero.name).toEqual("SuperDude");
  })

  it('should render the hero name in an anchor tag', () => {
    /*
      Template:
      <a routerLink="/detail/{{hero.id}}">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </a>
    */

    fixture.componentInstance.hero = {id: 1, name: "Khizer Rehan", strength: 3};
    fixture.detectChanges(); // Reflect Changes on Input box
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Khizer Rehan');

    // Getting Either by Native Element or DebugElement is Same
    // DebugElement is basically Wrapper over Native DOM Element inorder to provide some extra functionalities
    const element: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(element.nativeElement.textContent).toContain('Khizer Rehan');
  })
});
