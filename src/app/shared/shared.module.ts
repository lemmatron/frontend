import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { ServicesComponent } from './services/services.component';
import { PricingComponent } from './pricing/pricing.component';
import { FeaturesComponent } from './features/features.component';
import { TeamComponent } from './team/team.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ScrollspyDirective } from './scrollspy.directive';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ServicesComponent, PricingComponent, FeaturesComponent, TeamComponent, BlogComponent, ContactComponent, ScrollspyDirective, FooterComponent],
  imports: [
    CommonModule,
    ScrollToModule.forRoot(),
    HttpClientModule
  ],
  // tslint:disable-next-line: max-line-length
  exports: [ServicesComponent, PricingComponent, FeaturesComponent, TeamComponent, BlogComponent, ContactComponent, ScrollspyDirective, FooterComponent]
})
export class SharedModule { }
