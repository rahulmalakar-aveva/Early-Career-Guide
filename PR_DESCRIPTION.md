# Add FAQs Feature with Accordion Interface

**Summary:** This PR adds a comprehensive FAQ section where users can browse frequently asked questions organized by category with an expandable accordion interface.

## Changes

### Backend (.NET)
- ✅ Created Faq entity, DTO, service, and controller
- ✅ Database migration for Faqs table
- ✅ Seeded 8 FAQs across 4 categories

### Frontend (Angular)  
- ✅ Accordion-style FAQs component with expand/collapse
- ✅ Category filtering sidebar
- ✅ Help section with links to Q&A and Contacts
- ✅ Routing integration with home page

## FAQ Categories
- **Onboarding** - Team assignment, workstation setup
- **General** - Working hours, time off
- **Learning** - Training resources, mentorship
- **Benefits/Facilities** - Benefits access, office access

## API Endpoints
- `GET /api/faqs` - All FAQs
- `GET /api/faqs/category/{category}` - FAQs by category

## Testing
✅ Tested locally - API and UI working as expected  
✅ 8 FAQs properly seeded and displayed  
✅ Category filtering and accordion interface functional
