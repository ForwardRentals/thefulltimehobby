# Stock photo source data

Shared between Claude sessions that rebuild the stock pages. If you regenerate `stock/*.html`, use these:

- `visual.json`: slug → one or two sentences describing what's in the photo (written 2026-10-08 by looking at every image).
  Used as the photo page lead, meta/og description, and prepended to the ImageObject description.
  Pages show it as `<p class="lead">`, with the factual line ("… taken at <location> in <Month YYYY>") underneath as `<p class="photo-facts">`.
- `locations.json`: real shoot locations and context notes dictated by Jeremy (2026-10-07). Never guess locations.

Photos added after 2026-10-08 (e.g. TFTH-466–484) still need a `visual.json` entry.
