import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

export const registerTests = () => {
  Deno.test("create and invoke a TypeScript function", () => {
    // const url = new URL("./foo.js", "https://deno.land/");
    // assertEquals(url.href, "https://deno.land/foo.js");
    assertEquals(true, false);
  });

  Deno.test("get empty list of all functions", () => {
    assertEquals(true, false);
  });
  Deno.test("create and invoke a WASM function (raw)", () => {
    assertEquals(true, false);
  });
  Deno.test("create and invoke a WASM function (rust)", () => {
    assertEquals(true, false);
  });
  Deno.test("get list of functions", () => {
    assertEquals(true, false);
  });
  /*
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});
  Deno.test("", () => {});*/
};
