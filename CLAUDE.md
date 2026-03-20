# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-file React component (`dch-name-conevrt.js`) that converts Chinese Pinyin names (pasted from Excel) into two standardized display formats. No build system or package.json is present — this component is designed to be used as a Claude artifact or dropped into an existing React project.

## Dependencies

- **React** (`useState`, `useMemo`) — state management
- **lucide-react** — icons (`Copy`, `Check`, `RefreshCcw`, `Trash2`, `ClipboardList`)
- **Tailwind CSS** — all styling via utility classes

## Core Logic

**Input format:** `yameisong,宋亚梅` (one entry per line, comma-separated: pinyin concatenated string, then Chinese characters)

**Pinyin tokenization** (`tokenizePinyin`): greedy longest-match against `PINYIN_SYLLABLES` (sorted descending by length). Strips non-alpha characters before processing.

**Name splitting assumption:** The **last** tokenized syllable is the surname; all preceding syllables are the given name.

**Output formats:**
- **Format 1:** `Ya Mei SONG (宋亚梅)` — given name syllables title-cased and space-joined, surname UPPERCASED, Chinese in parens
- **Format 2:** `Song YaMei` — surname title-cased first, given name syllables title-cased and concatenated

## Key Constraints

- The filename has a typo (`conevrt` instead of `convert`) — preserve this to avoid breaking any references.
- `PINYIN_SYLLABLES` must remain sorted by descending length (`.sort((a, b) => b.length - a.length)`) for greedy matching to work correctly.
- The surname-last convention in the raw pinyin string (e.g., `yameisong` → surname is `song`) is intentional and specific to this tool's data source.
