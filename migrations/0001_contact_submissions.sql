CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);
