/**
 * test/setup.ts
 *
 * Global test setup — preloaded before every test file.
 *
 * The DOM environment (happy-dom) is activated by bunfig.toml:
 *   [test]
 *   environment = "happy-dom"
 *
 * This file only needs to:
 *   1. Extend bun:test's expect() with jest-dom DOM matchers
 *   2. Register afterEach cleanup to unmount React trees
 */
import "@testing-library/jest-dom";
import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";

// Signal to React 18 that we're in a test environment
(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

// Unmount React trees after each test to prevent state leaking between tests
afterEach(() => {
  cleanup();
});

