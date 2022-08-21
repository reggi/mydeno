import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

export default class Calendar extends Model {
  static table = 'rcalendar';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    date: DataTypes.DATETIME,
    duration: DataTypes.INTEGER,
  }
}