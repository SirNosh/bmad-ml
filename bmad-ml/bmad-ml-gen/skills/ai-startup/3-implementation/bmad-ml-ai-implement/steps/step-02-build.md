# Step 02 - Build

1. Implement each component per architecture spec, following the dependency order from Step 01:
   - For each component: create module structure, implement core logic, add configuration loading
   - Follow the coding patterns established in the project (check existing code for conventions)
   - Ensure each component is independently testable with clear input/output boundaries

2. Wire integration points between components:
   - **API integrations**: Implement HTTP clients/servers with retry logic, circuit breakers, and timeout config
   - **Message queues**: Implement producers and consumers with dead letter handling and idempotency
   - **Shared state**: Implement data access layers with connection pooling and transaction management
   - **File-based integration**: Implement readers/writers with format validation and atomic writes

3. Implement health checks and graceful degradation:
   - Each service exposes a `/health` endpoint reporting dependency status
   - Define degraded-mode behavior when non-critical dependencies are unavailable
   - Implement circuit breakers for external service calls (LLM APIs, databases, third-party services)
   - Add startup probes (dependencies ready) and liveness probes (process healthy)

4. Add comprehensive error handling:
   - Classify errors: transient (retry), permanent (fail with message), partial (degrade gracefully)
   - Implement structured error responses with error codes, user-safe messages, and debug context
   - Add request tracing (correlation IDs) across component boundaries
   - Implement error reporting and aggregation hooks

5. Write tests for critical paths:
   - Unit tests for each component's core logic (business rules, data transformations, validation)
   - Integration tests for each component pair (API caller/responder, producer/consumer)
   - Contract tests to verify integration contracts match between components
   - End-to-end tests for primary user flows (happy path + top 3 error scenarios)

6. Document API contracts and configuration:
   - Generate or update API documentation (OpenAPI spec for REST endpoints)
   - Document all configuration parameters with defaults and valid ranges
   - Document environment variables and secrets required per component
   - Create a component dependency diagram showing runtime communication

Continue to ./step-03-finalize.md.
