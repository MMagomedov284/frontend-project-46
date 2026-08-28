import { program } from 'commander'
import gendiff from './gendiff.js'

program
  .name('genDiff') // имя команды
  .description('Моя первая CLI-программа') // описание
  .version('1.0.0') // версия
  .option('-f, --format [type]', 'output format', 'json') // формат файла
  .argument('<filePath1>') // запрос первого файла
  .argument('<filePath2>') // запрос второго файла
  .action((filePath1, filePath2, options) => {
    const diff = gendiff(filePath1, filePath2, options.format)
    console.log(diff)
  })
// Заставь Commander распарсить аргументы командной строки
program.parse()
