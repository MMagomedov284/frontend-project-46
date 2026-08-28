import { readFileSync } from 'fs'
import path from 'path'
import _ from 'lodash'

export default function gendiff(firstFilePath, secondFilePath) {
  const firstFile = readAndParseJson(firstFilePath)
  const secondFile = readAndParseJson(secondFilePath)

  const result = diffCreate(firstFile, secondFile)
  return result
}

function readAndParseJson(file) {
  const filePath = path.resolve(file)
  try {
    const data = readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  }
  catch (err) {
    throw new Error(`Ошибка при чтении/парсинге файла ${file}: ${err.message}`, { cause: err })
  }
}

function diffCreate(firstFile, secondFile) {
  const output = []
  output.push('{')
  const keys = [...new Set([...Object.keys(firstFile), ...Object.keys(secondFile)])].sort()
  keys.forEach((key) => {
    if (key in firstFile && !(key in secondFile)) {
      output.push(`  - ${key}: ${firstFile[key]}`)
    }
    else if (!(key in firstFile) && key in secondFile) {
      output.push(`  + ${key}: ${secondFile[key]}`)
    }
    else if (_.isEqual(firstFile[key], secondFile[key])) {
      output.push(`    ${key}: ${secondFile[key]}`)
    }
    else {
      output.push(`  - ${key}: ${firstFile[key]}`)
      output.push(`  + ${key}: ${secondFile[key]}`)
    }
  })
  output.push('}')
  return output.join('\n')
}
