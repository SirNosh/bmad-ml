# Step 02 - Build

1. Implement format-specific parsers:
   - **PDF parser**: Extract text with layout preservation, handle multi-column layouts, extract tables as structured data, detect and OCR scanned pages (using Tesseract or cloud OCR)
   - **HTML parser**: Strip navigation, headers, footers, and ads using readability algorithms, preserve content structure (headings, lists, tables), resolve relative URLs to absolute, handle character encoding declarations
   - **DOCX parser**: Extract paragraphs with heading level hierarchy, extract tables preserving row/column structure, handle embedded images (extract alt text or skip with placeholder), process footnotes and endnotes
   - **Markdown parser**: Parse frontmatter metadata (YAML/TOML), preserve code blocks with language tags, resolve relative links and image references
   - **Plain text parser**: Auto-detect encoding (UTF-8, Latin-1, Windows-1252), normalize line endings, detect and preserve structural elements (section breaks, bullet lists)

2. Implement metadata extraction:
   - Extract document title (from PDF metadata, HTML title tag, DOCX properties, filename as fallback)
   - Extract author and creation/modification dates from document properties
   - Extract section headers and build document outline (heading hierarchy)
   - Extract source-specific metadata (URL for web content, file path for local files, API response metadata)
   - Generate document fingerprint (content hash) for deduplication and change detection

3. Implement content cleaning:
   - Remove boilerplate content (repeated headers/footers, navigation elements, cookie notices)
   - Normalize whitespace (collapse multiple spaces/newlines, standardize indentation)
   - Fix common encoding issues (mojibake detection and correction, smart quote normalization)
   - Remove or replace non-content elements (page numbers, watermarks, confidentiality notices per policy)
   - Normalize Unicode characters (NFC normalization, decompose special characters)

4. Implement table and image handling:
   - Tables: Convert to structured format (markdown table, JSON array of rows, or CSV) preserving headers and cell alignment
   - Images: Extract alt text if available, run OCR on informational images if configured, generate placeholder text for decorative images
   - Charts/diagrams: Extract any embedded text, add descriptor placeholder for visual content
   - Embedded files: Extract and process recursively (e.g., images in DOCX, attachments in email)

5. Add quality validation:
   - Detect empty documents after processing (extraction produced no meaningful text)
   - Detect encoding issues (high ratio of replacement characters, garbled text patterns)
   - Detect truncation (document suspiciously shorter than file size suggests)
   - Detect language (for downstream language-specific processing)
   - Compute content quality score (text density, structural element ratio, metadata completeness)
   - Flag documents that fail quality thresholds for manual review

6. Implement error handling and logging:
   - Per-document try/catch with structured error logging (document ID, format, error type, stack trace)
   - Fallback parser chain: if primary parser fails, try alternative (e.g., pdfplumber fails, try PyPDF2)
   - Quarantine mechanism: move unparseable documents to quarantine directory with error report
   - Processing manifest: track every document's processing status (success, failed, quarantined, skipped)
   - Aggregate logging: total processed, success rate, failure rate by format, common error categories

Continue to ./step-03-finalize.md.
