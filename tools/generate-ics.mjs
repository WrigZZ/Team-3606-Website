// tools/generate-ics.mjs
//
// Reads every document in the "calendar_events" Firestore collection and
// writes a static calendar.ics file (RFC 5545) to the project root.
//
// IMPORTANT: this is a build-time script. It never runs on Cloudflare —
// run it locally, or on a schedule via the included GitHub Action, and
// let Cloudflare Pages serve the resulting calendar.ics as a plain static
// file, exactly like your other pages.
//
// Usage:
//   npm install firebase
//   node tools/generate-ics.mjs

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Same public config already used by Calendar.js — the Firestore rules
// allow open read access to calendar_events, so no credentials are needed.
const firebaseConfig = {
  apiKey: "AIzaSyCAEza36fj_IKxd_0aP08g5mHdpq4OhFA8",
  authDomain: "resumewebsite-3d352.firebaseapp.com",
  projectId: "resumewebsite-3d352",
  storageBucket: "resumewebsite-3d352.firebasestorage.app",
  messagingSenderId: "910731753583",
  appId: "1:910731753583:web:7a5f1bd1265e6f5918359a",
  measurementId: "G-GV0D43RPYL"
};

const CALENDAR_NAME = "Owen's Website";
const OUTPUT_PATH   = join(dirname(fileURLToPath(import.meta.url)), "..", "calendar.ics");

// ==================== ICS HELPERS ====================

function escapeICS(str) {
  return String(str ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Fold lines longer than 75 octets per RFC 5545 section 3.1
function foldLine(line) {
  if (line.length <= 75) return line;
  let out  = line.slice(0, 75);
  let rest = line.slice(75);
  while (rest.length > 0) {
    out += "\r\n " + rest.slice(0, 74);
    rest = rest.slice(74);
  }
  return out;
}

// "2026-08-15" -> "20260815"
function toICSDate(dateStr) {
  return dateStr.replace(/-/g, "");
}

// "2026-08-15" -> "20260816" (exclusive DTEND for an all-day event)
function nextDay(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + 1);
  const yyyy = dt.getUTCFullYear();
  const mm   = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd   = String(dt.getUTCDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

function nowStamp() {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// ==================== MAIN ====================

async function main() {
  const app = initializeApp(firebaseConfig);
  const db  = getFirestore(app);

  const snapshot = await getDocs(collection(db, "calendar_events"));
  const events   = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  const valid    = events.filter(e => e.name && e.date);

  const dtstamp = nowStamp();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//owenspeer.com//Calendar Export//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeICS(CALENDAR_NAME)}`,
  ];

  for (const ev of valid) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${ev.id}@owenspeer.com`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART;VALUE=DATE:${toICSDate(ev.date)}`);
    lines.push(`DTEND;VALUE=DATE:${nextDay(ev.date)}`);
    lines.push(`SUMMARY:${escapeICS(ev.name)}`);
    if (ev.description) lines.push(`DESCRIPTION:${escapeICS(ev.description)}`);
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  const ics = lines.map(foldLine).join("\r\n") + "\r\n";
  writeFileSync(OUTPUT_PATH, ics, "utf8");

  console.log(`Wrote ${valid.length} event(s) to ${OUTPUT_PATH}`);
  process.exit(0);
}

main().catch(err => {
  console.error("Failed to generate calendar.ics:", err);
  process.exit(1);
});
