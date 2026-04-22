# Test Architecture

This project uses Playwright + TypeScript with a POM-first structure and tagged specs.

```mermaid
flowchart TD
  Dev[Developer/CI Trigger] --> NpmTest["npm test or npm run test:all"]
  NpmTest --> PwConfig["playwright.config.ts"]
  PwConfig --> Projects["Browser + Device Matrix"]
  Projects --> Specs["tests/specs/*.spec.ts"]
  Specs --> POM["tests/pages/*.ts (POM)"]
  Specs --> DataFactory["tests/data/factory.ts (faker)"]
  Specs --> Assertions["UI + Visual + External + A11y + Crawler assertions"]
  Assertions --> JsonReport["test-results/report.json"]
  JsonReport --> SummaryScript["scripts/generate-test-summary.mjs"]
  SummaryScript --> Md["reports/test-summary.md"]
  SummaryScript --> Csv["reports/test-summary.csv"]
  SummaryScript --> Xlsx["reports/test-summary.xlsx"]
  SummaryScript --> ReadmeBadge["README test badge update"]
```

## Layers

- **Config layer**: base URL via `.env`, retry policy, reporter, matrix projects.
- **Spec layer**: feature-focused tests tagged by execution purpose.
- **POM layer**: reusable selectors and page interactions.
- **Data layer**: structured fake data generation for forms.
- **Reporting layer**: HTML + JSON + auto-generated summary files.

