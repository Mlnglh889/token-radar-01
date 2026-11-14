# Token Radar / 02

A deterministic, offline token-launch radar for `token-radar-01`.

## What it does

`main.ts` reads the sealed snapshot, ranks 200 pre-token protocol records, writes `board.json`, emits a local `data.js` dataset, copies the static dashboard and screenshots, and builds the final dossier with the vendored make.fun helper. It covers all snapshot watchlist slugs and adds a deterministic TVL-selected set of other pre-token records.

The value model is explicit and name-agnostic. It combines TVL, clipped seven-day growth, time since first listing, category risk, and chain diversity. The value is an estimate of this entry, not a token-price forecast.

The dashboard is offline-only: search, category filtering, metric sorting, ranked rows, and a protocol detail view with score components and six concrete steps. Farm plans include capital, fees, time windows, verification checks, and a clear warning that no token or airdrop is guaranteed.

## Reproduce locally

```bash
rm -rf out && mkdir out
MAKEFUN_OUTPUT_DIR=out node main.ts --input /home/ubuntu/makefun/radar-kit/token-radar-01-kit/input/snapshot.json
```

Open `out/dashboard/index.html` through a local static server if desired. The grader supplies `/input/snapshot.json` and writable `/output`.

## Verification performed

- Node 22.23.2 executed the entry successfully twice.
- Both complete output trees were byte-identical, including the dossier.
- 200 rows were emitted; all 40 watchlist slugs were covered.
- Ranks were exactly 1 through 200 and implied values were non-increasing.
- Every row had six farm steps, each within the 20–600 character gate.
- Chromium generated board, detail, and filtered screenshots at 1440×900; each was below 512 KiB.
- No network URL is used in HTML attributes, CSS, or JavaScript imports.

The competition's RULES.txt states there is no standalone local score for this program/v1 contest; server grading remains authoritative.

License: MIT.
