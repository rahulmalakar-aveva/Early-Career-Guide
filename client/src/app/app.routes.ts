import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LinksComponent } from './pages/links/links.component';
import { QnaComponent } from './pages/qna/qna.component';
import { TipsComponent } from './pages/tips/tips.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FaqsComponent } from './pages/faqs/faqs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'links', component: LinksComponent },
  { path: 'qna', component: QnaComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'faqs', component: FaqsComponent }
];