Title: Timezones on Unix
Category: Programming
Tags: Unix, Linux

- There is an extensive time zones database maintained by IANA: [tz database](https://en.wikipedia.org/wiki/Tz_database)
- Informations about time zones supported by the systems are found in `/usr/share/zoneinfo/`
    - Read the files with `zdump`
- Information about current (local) time zone: `/etc/localtime` (links to `/usr/share/zoneinfo/...`)
    - Print information from that file: `zdump /etc/localtime`
- For setting the local time zone the environment variable `TZ` can be used
    - the value of `TZ` (if present) is appended to `/usr/share/zoneinfo/` to point to the time zone file
