import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCopilotPageComponent } from './ai-copilot-page.component';

describe('AiCopilotPageComponent', () => {
  let component: AiCopilotPageComponent;
  let fixture: ComponentFixture<AiCopilotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiCopilotPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCopilotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
