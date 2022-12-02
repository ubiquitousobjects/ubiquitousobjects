import { assert } from "https://deno.land/std@0.161.0/testing/asserts.ts";

Deno.test({name: "passing test console output", fn() {
    console.log("hello world");
}})

Deno.test({name: "failing test console output", fn() {
    console.log("hello world 2");
    assert(false);
}})
