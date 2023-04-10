import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";

describe('HeroesComponent Spec', () => {

  let HEROES;
  let component: HeroesComponent
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Khizer', strength: 15},
      {id: 2, name: 'Faran', strength: 10},
      {id: 3, name: 'Shahzeb', strength: 5}
    ]

    // Method Names that a component needs from HeroService
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    component = new HeroesComponent(mockHeroService)
  })



  it('should fetch all hero list', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    component.getHeroes()
    expect(component.heroes.length).toBe(3);
  });


  it('should add new hero to the list', () => {
    const addHero = {name: 'new-value', strength: 20};
    mockHeroService.addHero.and.returnValue(of(addHero))

    component.heroes = HEROES;
    component.add(addHero.name);

    expect(component.heroes.length).toBe(4);
  });


  it('should delete hero from the hero list', () => {
    // Since deleteHero returns an Obs$ so we need to mock data and return obs$ value
    mockHeroService.deleteHero.and.returnValue(of(true))

    component.heroes = HEROES;
    component.delete(HEROES[2]);

    expect(component.heroes.length).toBe(2);
  });


  it('should check deleteHero have been called on delete invocation', () => {

    // Interaction Test to check Component Adn Helper utility has interacted
    // with each other In this case Helper utility is HeroService.

    mockHeroService.deleteHero.and.returnValue(of(true))

    component.heroes = HEROES;
    component.delete(HEROES[1]);

    expect(mockHeroService.deleteHero).toHaveBeenCalled();
    expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(1);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
  });

});
