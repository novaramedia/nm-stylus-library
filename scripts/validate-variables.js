#!/usr/bin/env node
/**
 * Validation Script for Variables Synchronization
 * 
 * This script validates that variables.styl and variables.js
 * are properly synchronized with variables.json
 */

const fs = require('fs');
const path = require('path');

const VARIABLES_JSON_PATH = path.join(__dirname, '../variables.json');
const VARIABLES_STYL_PATH = path.join(__dirname, '../variables.styl');
const VARIABLES_JS_PATH = path.join(__dirname, '../variables.js');

function validateSynchronization() {
  try {
    console.log('Validating variable synchronization...\n');

    // Check if all files exist
    const files = [
      { path: VARIABLES_JSON_PATH, name: 'variables.json' },
      { path: VARIABLES_STYL_PATH, name: 'variables.styl' },
      { path: VARIABLES_JS_PATH, name: 'variables.js' }
    ];

    for (const file of files) {
      if (!fs.existsSync(file.path)) {
        console.error(`Missing file: ${file.name}`);
        process.exit(1);
      }
    }
    console.log('All required files exist');

    // Load variables.json
    const variablesJson = JSON.parse(fs.readFileSync(VARIABLES_JSON_PATH, 'utf8'));
    
    // Test: Check if Stylus file contains expected breakpoint variables
    const stylusContent = fs.readFileSync(VARIABLES_STYL_PATH, 'utf8');
    
    for (const [key, value] of Object.entries(variablesJson.breakpoints)) {
      const expectedLine = `$breakpoint-${key} = ${value}px`;
      if (!stylusContent.includes(expectedLine)) {
        console.error(`Stylus missing breakpoint: ${expectedLine}`);
        process.exit(1);
      }
    }
    console.log('Stylus breakpoint variables are synchronized');

    // Test: Check if Stylus file contains expected color CSS custom properties
    for (const [key, value] of Object.entries(variablesJson.colors)) {
      const cssVar = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const expectedLine = `--color-${cssVar}: ${value}`;
      if (!stylusContent.includes(expectedLine)) {
        console.error(`Stylus missing color variable: ${expectedLine}`);
        process.exit(1);
      }
    }
    console.log('Stylus color variables are synchronized');

    // Test: Check if JavaScript file can be required/imported
    const jsContent = fs.readFileSync(VARIABLES_JS_PATH, 'utf8');
    
    // Basic syntax check for JavaScript
    if (!jsContent.includes('export const variables = {')) {
      console.error('JavaScript file missing main export');
      process.exit(1);
    }

    if (!jsContent.includes('export const cssVariableNames = {')) {
      console.error('JavaScript file missing CSS variable names export');
      process.exit(1);
    }

    if (!jsContent.includes('export default variables;')) {
      console.error('JavaScript file missing default export');
      process.exit(1);
    }
    console.log('JavaScript file has correct exports');

    // Test: Check if JavaScript contains all expected color values
    for (const [key, value] of Object.entries(variablesJson.colors)) {
      const expectedLine = `${key}: '${value}',`;
      if (!jsContent.includes(expectedLine)) {
        console.error(`JavaScript missing color: ${expectedLine}`);
        process.exit(1);
      }
    }
    console.log('JavaScript color variables are synchronized');

    // Test: Check if JavaScript contains breakpoints as integers
    for (const [key, value] of Object.entries(variablesJson.breakpoints)) {
      const expectedLine = `${key}: ${value},`;
      if (!jsContent.includes(expectedLine)) {
        console.error(`JavaScript missing breakpoint: ${expectedLine}`);
        process.exit(1);
      }
    }
    console.log('JavaScript breakpoint variables are synchronized');

    // Test: Check if JavaScript contains transitions as integers
    for (const [key, value] of Object.entries(variablesJson.transitions)) {
      const expectedLine = `${key}: ${value},`;
      if (!jsContent.includes(expectedLine)) {
        console.error(`JavaScript missing transition: ${expectedLine}`);
        process.exit(1);
      }
    }
    console.log('JavaScript transition variables are synchronized');

    // Test: Check file timestamps (generated files should be newer or same age as JSON)
    const jsonStats = fs.statSync(VARIABLES_JSON_PATH);
    const stylusStats = fs.statSync(VARIABLES_STYL_PATH);
    const jsStats = fs.statSync(VARIABLES_JS_PATH);

    if (stylusStats.mtime < jsonStats.mtime) {
      console.warn('variables.styl is older than variables.json - consider running build:variables');
    }

    if (jsStats.mtime < jsonStats.mtime) {
      console.warn('variables.js is older than variables.json - consider running build:variables');
    }

    console.log('\nAll synchronization checks passed!');
    console.log('variables.json <-> variables.styl: synchronized');
    console.log('variables.json <-> variables.js: synchronized');
    
  } catch (error) {
    console.error('\nValidation failed:', error.message);
    process.exit(1);
  }
}

// Run validation if called directly
if (require.main === module) {
  validateSynchronization();
}

module.exports = { validateSynchronization };