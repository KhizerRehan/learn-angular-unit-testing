import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("HerosComponent", () => {
  let HEROES: Hero[];
  let component: HeroesComponent;
  let mockHeroService: any;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    component = new HeroesComponent(mockHeroService);
  });

  // Extra Test by Khizer
  it("should set static mock defined in test", () => {
    component.heroes = [];
    component.heroes = HEROES; // Initialize with MOCK data
    expect(component.heroes.length).toBe(3);
  });

  // Testing Delete Functionality
  it("should remove indicated hero from the heros list", () => {
    /*
     To Avoid Error:
     - TypeError: Cannot read properties of undefined (reading 'subscribe')
     - Actual Service Calls backend HTTP call which required .subscribe call 
     to be invoked.
     - In Order to create spyMock we need to return return obs to act as obs$ 
     being returned
    */

    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;
    component.delete(HEROES[2]);
    expect(component.heroes.length).toBe(2);
    expect(component.heroes.length).not.toBe(HEROES.length); // Extra Assertion

    // NOTE:
    // This Test checking the STATE of component is changed but WE are not checking
    // Actual code:  this.heroService.deleteHero(hero).subscribe(); is NOT CHECKED
    // deleteHero was called?
    // deleteHero was called with correct Parameters?
    // That is basically called Interaction Test.
  });

  // Testing Delete Functionality
  it("should call deleteHero method", () => {
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;
    component.delete(HEROES[2]);

    expect(mockHeroService.deleteHero).toHaveBeenCalled();
    expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(1); // Extra Assettion
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]); // Extra Assettion
  });
});
