import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from "@angular/common";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";

describe('HeroesComponent Spec', () => {

  let fixture: ComponentFixture<HeroDetailComponent>
  let mockActivatedRoute, mockHeroService, mockLocationService;

  beforeEach(() => {

    // Tried to create mock just like -> this.route.snapshot.paramMap.get('id');
    mockActivatedRoute = {
      snapshot: {
        paramMap: {get: () => '3'}
      }
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocationService = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocationService},
      ]
    })

    fixture = TestBed.createComponent(HeroDetailComponent)
  })

  it('should render hero name in a h2 tag', ()=>{
    mockHeroService.getHero.and.returnValue(of({id:3, name:'SuperDude', strength: 100}))
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE')
  })


});
