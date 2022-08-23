import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { Span } from "./span.ts";

Deno.test("span test", () => {

  assertEquals(
    Span.nineToFive.every(30).excludeSpan(Span.lunch).strings,
    [
      "9:00am",
      "9:30am",
      "10:00am",
      "10:30am",
      "11:00am",
      "11:30am",
      "1:00pm",
      "1:30pm",
      "2:00pm",
      "2:30pm",
      "3:00pm",
      "3:30pm",
      "4:00pm",
      "4:30pm",
    ]
  )

});

