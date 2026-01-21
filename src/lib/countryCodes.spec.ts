import { expect, test } from "@playwright/test";
import { normalizeCountryValues, toNumericCode } from "./countryCodes";

test.describe("Unit: Country Codes", () => {
  test.describe("toNumericCode", () => {
    test("returns numeric codes as-is", () => {
      expect(toNumericCode("840")).toBe("840");
      expect(toNumericCode("156")).toBe("156");
      expect(toNumericCode("040")).toBe("040");
    });

    test("pads numeric codes to 3 digits", () => {
      expect(toNumericCode("40")).toBe("040");
      expect(toNumericCode("4")).toBe("004");
    });

    test("converts Alpha-2 codes", () => {
      expect(toNumericCode("US")).toBe("840");
      expect(toNumericCode("CN")).toBe("156");
      expect(toNumericCode("DE")).toBe("276");
    });

    test("converts Alpha-3 codes", () => {
      expect(toNumericCode("USA")).toBe("840");
      expect(toNumericCode("CHN")).toBe("156");
      expect(toNumericCode("DEU")).toBe("276");
    });

    test("converts common names", () => {
      expect(toNumericCode("United States")).toBe("840");
      expect(toNumericCode("China")).toBe("156");
      expect(toNumericCode("Germany")).toBe("276");
    });

    test("returns input if no match found", () => {
      expect(toNumericCode("Atlantis")).toBe("Atlantis");
      expect(toNumericCode("ZZ")).toBe("ZZ");
    });

    test("is case insensitive", () => {
      expect(toNumericCode("us")).toBe("840");
      expect(toNumericCode("china")).toBe("156");
    });
  });

  test.describe("normalizeCountryValues", () => {
    test("converts keys in record object", () => {
      const input = {
        US: 100,
        China: 200,
        "276": 300,
      };

      const result = normalizeCountryValues(input);

      expect(result["840"]).toBe(100);
      expect(result["156"]).toBe(200);
      expect(result["276"]).toBe(300);
    });

    test("converts keys in Map", () => {
      const input = new Map([
        ["US", 100],
        ["China", 200],
      ]);

      const result = normalizeCountryValues(input);

      expect(result["840"]).toBe(100);
      expect(result["156"]).toBe(200);
    });
  });
});
