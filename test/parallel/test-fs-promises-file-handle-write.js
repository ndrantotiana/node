'use strict';

const common = require('../common');

// The following tests validate base functionality for the fs/promises
// FileHandle.read method.

const fs = require('fs');
const { open } = require('fs/promises');
const path = require('path');
const tmpdir = require('../common/tmpdir');
const assert = require('assert');
const tmpDir = tmpdir.path;

tmpdir.refresh();
common.crashOnUnhandledRejection();

async function validateWrite() {
  const filePathForHandle = path.resolve(tmpDir, 'tmp-write.txt');
  const fileHandle = await open(filePathForHandle, 'w+');
  const buffer = Buffer.from('Hello world'.repeat(100), 'utf8');

  await fileHandle.write(buffer, 0, buffer.length);
  const readFileData = fs.readFileSync(filePathForHandle);
  assert.deepStrictEqual(buffer, readFileData);
}

async function validateEmptyWrite() {
  const filePathForHandle = path.resolve(tmpDir, 'tmp-empty-write.txt');
  const fileHandle = await open(filePathForHandle, 'w+');
  const buffer = Buffer.from(''); // empty buffer

  await fileHandle.write(buffer, 0, buffer.length);
  const readFileData = fs.readFileSync(filePathForHandle);
  assert.deepStrictEqual(buffer, readFileData);
}

validateWrite()
  .then(validateEmptyWrite)
  .then(common.mustCall());
