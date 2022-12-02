import { assertEquals, assertThrows } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { addFunction, invokeFunction, listFunctions, listFunctionVersions } from "../../../modules/functions/index.ts";
import { getId } from "../../../modules/shared/identifier.ts";

// wasm method that returns 42
const theAnswer = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127,
  3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0,
  5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145,
  128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97,
  105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0,
  65, 42, 11
]);
// TODO: make a wasm function that takes params and echoes the input and output so we can test it better

  Deno.test("Get empty list of all functions", () => {
    const emptyArr: string[] = [];
    assertEquals(listFunctions(), emptyArr);
  });

  Deno.test("create and invoke a WASM function", async () => {
    addFunction("test1", getId(), theAnswer);
    
    const response = await invokeFunction("test1");

    assertEquals(response, 42);
  });

  Deno.test("create multiple WASM functions and invoke the latest instance", async () => {
    addFunction("test2", getId(), theAnswer);
    addFunction("test2", getId(), theAnswer);
    addFunction("test2", getId(), theAnswer);

    const response = await invokeFunction("test2");

    assertEquals(response, 42);
  });

  Deno.test("create multiple WASM functions and invoke a specific instance", async () => {

    const middleId = getId();
    addFunction("test3", getId(), theAnswer);
    addFunction("test3", middleId, theAnswer);
    addFunction("test3", getId(), theAnswer);

    const response = await invokeFunction("test3", middleId);

    assertEquals(response, 42);
  });


  Deno.test({name: "Get list of all function names", fn() {
    // Verify all the functions we've registered so far are in the list.
    assertEquals(listFunctions(), ["test1", "test2", "test3"]);
}});

  Deno.test("Get list of a function's versions, oldest to newest", () => {
   // assertEquals(true, false);
    addFunction("test4", getId(), theAnswer);
    assertEquals(listFunctionVersions("test4").length, 1);
    addFunction("test4", getId(), theAnswer);
    assertEquals(listFunctionVersions("test4").length, 2);
    addFunction("test4", getId(), theAnswer);
    assertEquals(listFunctionVersions("test4").length, 3);
    // TODO: verify all entries are distinct.
  });

  Deno.test("Listing nonexistent function throws", () => {
    assertThrows(() => listFunctionVersions("undefined-function"));
  });

  Deno.test("Creating function with invalid function name throws", () => {
    assertThrows(() => listFunctionVersions("invalid-name$"));
    assertThrows(() => listFunctionVersions("   invalid-name"));
    assertThrows(() => listFunctionVersions("inv##%name$"));
    assertThrows(() => listFunctionVersions("invali%d-name$"));
    assertThrows(() => listFunctionVersions("inva@lid-name$"));
    assertThrows(() => listFunctionVersions("inval[]\\|id-na!me$"));
    assertThrows(() => listFunctionVersions("inval*id-n(ame$"));
    assertThrows(() => listFunctionVersions("invalid)-name$"));
  });