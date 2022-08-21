# deno-monorepo

This is a playground to explore ideas / modules and to serve a playground instance of fresh to `fresh.reggi.com`, hopefully connected to a postgres supabase instance.

## Open Questions

What's the best way to handle dependency errors? Import-maps?
What's the best way to create a deno monorepo?
What's the best way to "do modular import maps"? See `calendar` and `fresh.reggi.com`.
What's the best way to deploy `fresh.reggi.com`?

## What's the best way to set dev / prod envs for fresh?

DOT ENV!

### Can I conditionally import based on dev env?

Found a dontenv package, wokred well

### How can I pass env vars to a alt to `calendar/denodb/test_db.ts`?

Found a dontenv package, wokred well to replace this file