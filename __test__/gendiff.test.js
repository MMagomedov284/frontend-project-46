import gendiff from "../src/gendiff"
import { describe, expect, test } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const normalize = (str) => str.replace(/\r\n/g, '\n');
describe('gendiff', () => {

  test('should detect added key', () => {
    const file1 = join(__dirname, '../__fixtures__/file1_added.json');
    const file2 = join(__dirname, '../__fixtures__/file2_added.json');
    const result = gendiff(file1, file2, 'stylish');
    const expected = `{\n    host: hexlet.io\n    timeout: 50\n  + verbose: true\n}`
    expect(normalize(result)).toBe(normalize(expected));
  })
  test('should detect delete key', () => {
    const file1 = join(__dirname, '../__fixtures__/file1_delete.json');
    const file2 = join(__dirname, '../__fixtures__/file2_delete.json');
    const result = gendiff(file1, file2, 'stylish');
    const expected = `{\n    host: hexlet.io\n    proxy: 123.234.53.22\n  - timeout: 55\n}`
    expect(normalize(result)).toBe(normalize(expected))
  })
  test('should detect changet key', () => {
    const file1 = join(__dirname, '../__fixtures__/file1_changet.json');
    const file2 = join(__dirname, '../__fixtures__/file2_changet.json');
    const result = gendiff(file1, file2, 'stylish');
    const expected = `{\n  - follow: false\n  + follow: true\n}`
    expect(normalize(result)).toBe(normalize(expected))
  })
  test('should detect unchanget key', () => {
    const file1 = join(__dirname, '../__fixtures__/file1_unchanget.json');
    const file2 = join(__dirname, '../__fixtures__/file2_unchanget.json');
    const result = gendiff(file1, file2, 'stylish');
    const expected = `{\n    follow: false\n}`
    expect(normalize(result)).toBe(normalize(expected))
  })
  test('should detect empty object', () => {
    const file1 = join(__dirname, '../__fixtures__/file1_empty.json');
    const file2 = join(__dirname, '../__fixtures__/file2_empty.json');
    expect(() => gendiff(file1, file2)).toThrow()
  })
  test('should throw if file not found', () => {
    expect(() => gendiff('missing.json', 'file2.json')).toThrow();
  })
})
