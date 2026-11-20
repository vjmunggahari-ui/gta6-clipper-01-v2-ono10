# GTA 6 Is Out — Wing-Walking Over a PACKED Beach

[![make.fun bounty](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Indramunggahari10/gta6-clipper-01-v2-ono10/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Indramunggahari10/gta6-clipper-01-v2-ono10/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

Entry for the make.fun bounty [Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01)
($500, top 20 most-watched videos share it). The video itself is the entry:
places go by its YouTube views, the most first, read again at the deadline.

## The clip

The wildest 30 seconds of Rockstar's official **GTA VI Launch Trailer**,
cut as one continuous escalation: the rooftop dirt-bike jump hooks in the
first 2 seconds, then a plane, a red sports car drifting, a police cruiser
sliding through Ocean Drive, an iguana, a rooftop helipad, Lucia firing
from a truck bed as a police car explodes, a rooftop crew, a glass tower
breaking, a rifle fireball — and the finale, slowed down: a wing-walker
standing on a biplane over a packed beach, pink smoke trailing, ocean
below. Every beat pays off; nothing flat survives the cut.

Then the clip turns to make.fun: an 8-second end card with the make.fun
ghost, "MAKE CLIPS LIKE THIS WITH AI — AND GET PAID", `make.fun`, the
bounty page and the play code. The ghost also rides top-right through the
whole clip. No bought or botted views — ever.

| Clip | Value |
| --- | --- |
| File | `out/clip.mp4` |
| Duration | 30.6 s (22.6 s GTA 6 moments + 8.0 s make.fun pitch) |
| Resolution | 1080 x 1920 (9:16 vertical, a YouTube Short) |
| Codec | H.264 + AAC, 12.5 MB |
| Source footage | Rockstar Games, GTA VI Launch Trailer (youtube.com/watch?v=rz1B4B2yBZY), 90.0 s; beats at 19.5, 38.0, 40.0, 46.0, 47.0, 48.6, 52.0, 54.4, 59.8, 61.4, 66.0, 68.0, 71.6 s |
| Ghost | make.fun's ghost, drawn fresh in-session (white dome, pink outline, two black eyes, smile) |
| Play code | `makefun-runway-trail-snail` |

## How the clip was cut

The agent fetched the official launch trailer in-session, watched its
frames (a 2-second contact sheet, then a 1-second sheet of the 36–80 s
action stretch, then full-res stills of every candidate beat), picked the
beats, and rendered `out/clip.mp4` with ffmpeg in that same session:
blur-fill to vertical 9:16, a caption over each beat, the ghost bug
top-right, the two biggest stunts slowed (bike jump 0.75x, biplane 0.6x),
then the 8-second end card. The rendered clip was then watched back
frame by frame — a first cut was rejected in-session because the finale
caption ran off the right edge — and re-rendered with the caption split
over two lines. `out/still.jpg` is a frame from the finished clip at the
jump. The audio is the trailer's own, fading out into the silent end card.

## Upload status

**NOT UPLOADED YET.** `VIDEO.json` holds a clearly-marked placeholder until
the clip is published public on YouTube. No YouTube channel or upload path
exists on this build machine, so the upload is a parent-side step: publish
`out/clip.mp4` public (as a Short), paste the title and description from
`YOUTUBE.md` verbatim, keep it public until the results are out, then
replace the placeholder in `VIDEO.json` with the video's address.

## The program

`main.ts` (Node 22, standard library only, no network at runtime) copies
`VIDEO.json` from the repository root to `/output/VIDEO.json`, after
checking it parses, stays under the 16384-byte cap, and names an `https://`
url of at most 2048 characters. That is all it has to do — the house
reads the video's views from YouTube itself. The copy is byte for byte, so
two runs write the same bytes.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## make.fun

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win:
https://make.fun/bounty/gta6-clipper-01

Note: this repository was created under `Indramunggahari10` and is transferred
to `vjmunggahari-ui` afterwards; after the transfer, update the owner segment
of the rank/reward badge URLs above to `vjmunggahari-ui`.
