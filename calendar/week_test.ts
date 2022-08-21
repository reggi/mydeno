import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { Hours } from "./hours.ts";
import { Week } from "./week.ts";

Deno.test("week parse", () => {
  const example = Week.onlyWeekdays(Hours.nineToFive.every(30, 5).stringTimes)
  const results = {
    0: [],
    1: ["9:00am","9:35am","10:10am","10:45am","11:20am","11:55am","12:30pm","1:05pm","1:40pm","2:15pm","2:50pm","3:25pm","4:00pm"],
    2: ["9:00am","9:35am","10:10am","10:45am","11:20am","11:55am","12:30pm","1:05pm","1:40pm","2:15pm","2:50pm","3:25pm","4:00pm"],
    3: ["9:00am","9:35am","10:10am","10:45am","11:20am","11:55am","12:30pm","1:05pm","1:40pm","2:15pm","2:50pm","3:25pm","4:00pm"],
    4: ["9:00am","9:35am","10:10am","10:45am","11:20am","11:55am","12:30pm","1:05pm","1:40pm","2:15pm","2:50pm","3:25pm","4:00pm"],
    5: ["9:00am","9:35am","10:10am","10:45am","11:20am","11:55am","12:30pm","1:05pm","1:40pm","2:15pm","2:50pm","3:25pm","4:00pm"],
    6: []
  }
  assertEquals(example, results)
});