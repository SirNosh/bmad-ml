# Step 03 - Finalize

1. Process test documents from each supported format:
   - Prepare a test corpus with at least 3 representative documents per format
   - Include edge cases: scanned PDF, multi-column PDF, complex HTML with tables, DOCX with images, Markdown with code blocks
   - Run the full processing pipeline on the test corpus
   - Report per-format results: documents processed, success rate, processing time

2. Validate output quality:
   - For each format, manually compare processed output against source document:
     - Text completeness: all meaningful content preserved
     - Structure preservation: headings, lists, and tables correctly represented
     - Metadata accuracy: title, author, date correctly extracted
   - Report quality score per format (content completeness, structure fidelity, metadata accuracy)
   - List any formats or document subtypes that produced subpar results

3. Document supported formats and limitations:
   - Supported format matrix: format, parser used, features supported, known limitations
   - Configuration reference: all tunable parameters (OCR settings, cleaning aggressiveness, quality thresholds)
   - Performance characteristics: processing speed per format (documents/minute, pages/minute)
   - Known limitations per format (e.g., "scanned PDFs require OCR enabled", "complex HTML layouts may lose sidebar content")
   - Troubleshooting guide: common failure modes and resolution steps

4. Present results to the user:
   - Processing pipeline architecture diagram
   - Test corpus results with per-format quality metrics
   - Supported format matrix
   - Integration guide: how the embedding pipeline or other consumers should call this pipeline
   - Known limitations and recommended improvements

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
