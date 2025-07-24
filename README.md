# CSV to JSON API – Node.js + PostgreSQL

This project reads a CSV file from disk, parses nested fields into JSON, stores the result in PostgreSQL, and prints age group distribution.

---

## Features

- Parses a `.csv` file with deeply nested keys like `name.firstName`, `address.line1`, etc.
- Converts each row into a nested JSON object
- Uploads each object to PostgreSQL using a transactional insert
- Extra fields are grouped into an `additional_info` JSON column
- Prints the age group percentage distribution:
  - `< 20`
  - `20–40`
  - `40–60`
  - `> 60`
- Built **without any external CSV-to-JSON packages**

---

##  Folder Structure

