import { BackgroundColors, ForegroundColors, Styles, TextColorBuilder } from '../dist/index.js'
import test from 'ava'

test('Test 1 - Bold, White Background, Blue Text', (t) => {
  t.is(
    new TextColorBuilder()
      .setStyle(Styles.Bold)
      .setBackgroundColor(BackgroundColors.White)
      .setForegroundColor(ForegroundColors.Blue)
      .addText('Test1')
      .addText('Test2')
      .toString(),
    '```ansi\n' + '\u001b[1;34;47mTest1\u001b[0m\u001b[1;34;47mTest2\u001b[0m' + '\n```'
  )
})

test('Test 2 - Bold, White Background, Blue Text, Reset Styles', (t) => {
  t.is(
    new TextColorBuilder({ resetStyles: true })
      .setStyle(Styles.Bold)
      .setBackgroundColor(BackgroundColors.White)
      .setForegroundColor(ForegroundColors.Blue)
      .addText('Test1👌')
      .addText('Test2')
      .toString(),
    '```ansi\n' + '\u001b[1;34;47mTest1👌\u001b[0mTest2' + '\n```'
  )
})

test('Test 3 - Underlined Bold, Red Text,', (t) => {
  t.is(
    new TextColorBuilder()
      .setStyle(Styles.UnderlinedBold)
      .setForegroundColor(ForegroundColors.Red)
      .addText('ASDF')
      .addText('ASDF')
      .addText('test')
      .toString(),
    '```ansi\n' + '\u001b[1;4;31mASDF\u001b[0m\u001b[1;4;31mASDF\u001b[0m\u001b[1;4;31mtest\u001b[0m' + '\n```'
  )
})

test('Test 4 - No Styles', (t) => {
  t.is(new TextColorBuilder().addText('TEST').toString(), '```ansi\nTEST\n```')
})

test('Test 5 - Orange Background', (t) => {
  t.is(
    new TextColorBuilder().setBackgroundColor(BackgroundColors.Orange).addText('TEST').toString(),
    '```ansi\n' + '\u001b[41mTEST\u001b[0m' + '\n```'
  )
})

test('Test 6 - Blue Text', (t) => {
  t.is(
    new TextColorBuilder().setForegroundColor(ForegroundColors.Blue).addText('TEST').toString(),
    '```ansi\n' + '\u001b[34mTEST\u001b[0m' + '\n```'
  )
})
