import { expect, test } from "@playwright/test";
import { createFormatter } from "./formatters";

test.describe("Unit: Formatters", () => {
  test("formats percentages correctly", () => {
    const fmt = createFormatter("%");
    expect(fmt(42.567)).toBe("42.6%");
    expect(fmt(100)).toBe("100.0%");
  });

  test("formats currency correctly", () => {
    const fmt = createFormatter("$");
    expect(fmt(1234567)).toBe("$1,234,567");
    expect(fmt(100)).toBe("$100");
  });

  test("formats years correctly", () => {
    const fmt = createFormatter("years");
    expect(fmt(2.5)).toBe("2.5 yrs");
  });

  test("formats rate-based units correctly", () => {
    const fmt = createFormatter("per 1000 people");
    expect(fmt(12.345)).toBe("12.3");
  });

  test("formats index values correctly", () => {
    const fmt = createFormatter("index");
    expect(fmt(0.12345)).toBe("0.123");
  });

  test("falls back to default formatting for unknown units", () => {
    const fmt = createFormatter("apples");
    expect(fmt(5)).toBe("5 apples");
    expect(fmt(5.56)).toBe("5.6 apples");
  });
});
