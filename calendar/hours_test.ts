import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { Hours, hours } from './hours.ts'

Deno.test("available test", () => {

  assertEquals(hours()
    .from('10:00am').to('5:00pm')
    .exceptFrom('12:00pm').to('1:00pm')
    .every(15, 5)
    .times, [
    { hour: 10, minutes: 0 },
    { hour: 10, minutes: 20 },
    { hour: 10, minutes: 40 },
    { hour: 11, minutes: 0 },
    { hour: 11, minutes: 20 },
    { hour: 11, minutes: 40 },
    { hour: 13, minutes: 0 },
    { hour: 13, minutes: 20 },
    { hour: 13, minutes: 40 },
    { hour: 14, minutes: 0 },
    { hour: 14, minutes: 20 },
    { hour: 14, minutes: 40 },
    { hour: 15, minutes: 0 },
    { hour: 15, minutes: 20 },
    { hour: 15, minutes: 40 },
    { hour: 16, minutes: 0 },
    { hour: 16, minutes: 20 },
    { hour: 16, minutes: 40 }
  ]);

  assertEquals(hours()
    .from('10:00am').to('5:00pm')
    .every(15, 5)
    .times, [
    { hour: 10, minutes: 0 },
    { hour: 10, minutes: 20 },
    { hour: 10, minutes: 40 },
    { hour: 11, minutes: 0 },
    { hour: 11, minutes: 20 },
    { hour: 11, minutes: 40 },
    { hour: 12, minutes: 0 },
    { hour: 12, minutes: 20 },
    { hour: 12, minutes: 40 },
    { hour: 13, minutes: 0 },
    { hour: 13, minutes: 20 },
    { hour: 13, minutes: 40 },
    { hour: 14, minutes: 0 },
    { hour: 14, minutes: 20 },
    { hour: 14, minutes: 40 },
    { hour: 15, minutes: 0 },
    { hour: 15, minutes: 20 },
    { hour: 15, minutes: 40 },
    { hour: 16, minutes: 0 },
    { hour: 16, minutes: 20 },
    { hour: 16, minutes: 40 }
  ]);

  assertEquals(hours()
    .from('10:00am').to('11:00am')
    .every(30, 5)
    .times, [
    { hour: 10, minutes: 0 },
  ]);

  assertEquals(hours()
    .from('10:00am').to('11:00am')
    .every(60)
    .times, 
    [{ hour: 10, minutes: 0 }]
  );

  assertEquals(hours()
    .from('10:00am').to('11:00am')
    .every(30, 0)
    .times, [
      { hour: 10, minutes: 0 },
      { hour: 10, minutes: 30 },
  ]);

  assertEquals(
    Hours.nineToFive.every(30, 30).times,
    [
      { hour: 9, minutes: 0 },
      { hour: 10, minutes: 0 },
      { hour: 11, minutes: 0 },
      { hour: 12, minutes: 0 },
      { hour: 13, minutes: 0 },
      { hour: 14, minutes: 0 },
      { hour: 15, minutes: 0 },
      { hour: 16, minutes: 0 }
    ]
  );

  assertEquals(
    Hours.nineToFive.noMeetingsDuringLunch.every(30, 30).times,
    [
      { hour: 9, minutes: 0 },
      { hour: 10, minutes: 0 },
      { hour: 11, minutes: 0 },
      { hour: 13, minutes: 0 },
      { hour: 14, minutes: 0 },
      { hour: 15, minutes: 0 },
      { hour: 16, minutes: 0 }
    ]
  );

  assertEquals(
    Hours.nineToFive.every(60, 1).times,
    [
      { hour: 9, minutes: 0 },
      { hour: 10, minutes: 1 },
      { hour: 11, minutes: 2 },
      { hour: 12, minutes: 3 },
      { hour: 13, minutes: 4 },
      { hour: 14, minutes: 5 },
      { hour: 15, minutes: 6 }
    ]
  )

  assertEquals(
    Hours.nineToFive.every(60, 0).times,
    [
      { hour: 9, minutes: 0 },
      { hour: 10, minutes: 0 },
      { hour: 11, minutes: 0 },
      { hour: 12, minutes: 0 },
      { hour: 13, minutes: 0 },
      { hour: 14, minutes: 0 },
      { hour: 15, minutes: 0 },
      { hour: 16, minutes: 0 }
    ]
  )

  assertEquals(
    Hours.nineToFive.every(60, 0).stringTimes,
    ["9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm"]
  )

  assertEquals(
    Hours.nineToFive.every(30).stringTimes,
    [
      "9:00am",
      "9:30am",
      "10:00am",
      "10:30am",
      "11:00am",
      "11:30am",
      "12:00pm",
      "12:30pm",
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

  assertEquals(
    Hours.nineToFive.every(30, 5).stringTimes,
    [
      "9:00am",
      "9:35am",
      "10:10am",
      "10:45am",
      "11:20am",
      "11:55am",
      "12:30pm",
      "1:05pm",
      "1:40pm",
      "2:15pm",
      "2:50pm",
      "3:25pm",
      "4:00pm"
    ]
  )

});
