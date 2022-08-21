import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { id, add, parse, toString } from './time.ts'

Deno.test("time parse", () => {
  assertEquals(parse('12:00'), { hour: 12, minutes: 0 });
  assertEquals(parse('12:59'), { hour: 12, minutes: 59 });
  assertEquals(parse('12:00am'), { hour: 0, minutes: 0 });
  assertEquals(parse('12:00pm'), { hour: 12, minutes: 0 });
  assertEquals(parse('2:40pm'), { hour: 14, minutes: 40 });
  assertEquals(parse('1:00pm'), { hour: 13, minutes: 0 });
  assertEquals(parse('1:00Pm'), { hour: 13, minutes: 0 });
  assertEquals(parse('1:00PM'), { hour: 13, minutes: 0 });
  assertEquals(parse('1:00pM'), { hour: 13, minutes: 0 });
  assertEquals(parse('1:00am'), { hour: 1, minutes: 0 });
  assertEquals(parse('5:00pm'), { hour: 17, minutes: 0 });
  assertEquals(parse(5), { hour: 5, minutes: 0 });
  assertEquals(parse(1), { hour: 1, minutes: 0 });
  assertEquals(parse(12), { hour: 12, minutes: 0 });
  assertEquals(parse(14), { hour: 14, minutes: 0 });
});

Deno.test("time toString", () => {
  assertEquals(toString({ hour: 0, minutes: 0 }), '12:00am');
  assertEquals(toString({ hour: 1, minutes: 0 }), '1:00am');
  assertEquals(toString({ hour: 2, minutes: 0 }), '2:00am');
  assertEquals(toString({ hour: 3, minutes: 0 }), '3:00am');
  assertEquals(toString({ hour: 4, minutes: 0 }), '4:00am');
  assertEquals(toString({ hour: 5, minutes: 0 }), '5:00am');
  assertEquals(toString({ hour: 6, minutes: 0 }), '6:00am');
  assertEquals(toString({ hour: 7, minutes: 0 }), '7:00am');
  assertEquals(toString({ hour: 8, minutes: 0 }), '8:00am');
  assertEquals(toString({ hour: 9, minutes: 0 }), '9:00am');
  assertEquals(toString({ hour: 10, minutes: 0 }), '10:00am');
  assertEquals(toString({ hour: 11, minutes: 0 }), '11:00am');
  assertEquals(toString({ hour: 12, minutes: 0 }), '12:00pm');
  assertEquals(toString({ hour: 13, minutes: 0 }), '1:00pm');
  assertEquals(toString({ hour: 14, minutes: 0 }), '2:00pm');
  assertEquals(toString({ hour: 15, minutes: 0 }), '3:00pm');
  assertEquals(toString({ hour: 16, minutes: 0 }), '4:00pm');
  assertEquals(toString({ hour: 17, minutes: 0 }), '5:00pm');
  assertEquals(toString({ hour: 18, minutes: 0 }), '6:00pm');
  assertEquals(toString({ hour: 19, minutes: 0 }), '7:00pm');
  assertEquals(toString({ hour: 20, minutes: 0 }), '8:00pm');
  assertEquals(toString({ hour: 21, minutes: 0 }), '9:00pm');
  assertEquals(toString({ hour: 22, minutes: 0 }), '10:00pm');
  assertEquals(toString({ hour: 23, minutes: 0 }), '11:00pm');
});

Deno.test("time id", () => {
  assertEquals(id({ hour: 17, minutes: 0 }), 17 * 60);
  assertEquals(17 * 60, 1020);
});

Deno.test("time add", () => {
  assertEquals(add({ hour: 12, minutes: 0 }, 60), { hour: 13, minutes: 0 });
  assertEquals(add({ hour: 0, minutes: 0 }, 10), { hour: 0, minutes: 10 });
  assertEquals(add({ hour: 0, minutes: 10 }, 10), { hour: 0, minutes: 20 });
  assertEquals(add({ hour: 23, minutes: 10 }, 60), { hour: 0, minutes: 10 });
  assertEquals(add({ hour: 23, minutes: 10 }, 30), { hour: 23, minutes: 40 });
  assertEquals(add({ hour: 23, minutes: 10 }, 65), { hour: 0, minutes: 15 });
});