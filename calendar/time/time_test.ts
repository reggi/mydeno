import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { Time } from "./time.ts";

Deno.test("span test", () => {
  assertEquals(Time.hour(10).am.string, '10:00am')
  assertEquals(Time.hour(10).min(30).am.string, '10:30am')
  assertEquals(Time.hour(10).pm.string, '10:00pm')
  assertEquals(Time.hour(10).min(30).pm.string, '10:30pm')
  assertEquals(Time.m(10).string, '10:00am')
  assertEquals(Time.m('10').string, '10:00am')
});


Time.hour(10).min(30).am.to(Time.hour(11).min(30).am)