# How To Add A New Spec

## 1) Choose the right location

- Add new test file in `tests/specs/`.
- Reuse or create page object in `tests/pages/`.
- If input data is needed, add a factory helper in `tests/data/`.

## 2) Add tags for flexible execution

Use tags in `test.describe` title:

- `@smoke` for quick confidence tests
- `@regression` for broader suite
- `@visual` for screenshot/visual checks
- `@external` for third-party page validations

Example:

```ts
test.describe('@smoke @regression my feature', () => {
  test.describe.configure({ retries: 1 });
  test('does something important', async ({ page }) => {
    // ...
  });
});
```

## 3) Keep tests stable

- Prefer role-based locators (`getByRole`, `getByText` with care).
- Avoid brittle full-paragraph assertions.
- Use fallback assertions for external/login-wall pages.
- For visual checks, mask dynamic assets if needed.

## 4) Run targeted commands

- Smoke only: `npm run test:smoke`
- Visual only: `npm run test:visual`
- External only: `npm run test:external`
- Full regression: `npm run test:regression`

## 5) Update snapshots (if visual test changed)

```bash
npm run test:update
```

## 6) Generate summaries for reporting

```bash
npm run report:summary
```

Outputs:
- `reports/test-summary.md`
- `reports/test-summary.csv` (Google Sheets-ready)
- `reports/test-summary.xlsx` (Microsoft Excel-ready)

