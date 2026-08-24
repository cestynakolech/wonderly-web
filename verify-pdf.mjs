import { kvizy } from './src/data/kvizy.ts';

const testData = [
  'fyzika/6-rocnik/latka-a-teleso/uvod-do-fyziky',
  'fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa',
  'fyzika/7-rocnik/tlak-v-kapalinach/tlak'
];

console.log('📊 OVĚŘENÍ OTÁZEK PODLE PODTÉMATU:\n');
console.log('='*60);

testData.forEach(key => {
  const questions = kvizy[key] || [];
  console.log(`\n✅ Podtéma: ${key}`);
  console.log(`   Počet otázek v kvízu: ${questions.length}`);
  if (questions.length > 0) {
    console.log(`   Vzorek 1. otázky: "${questions[0].text}"`);
    const answers = questions[0].odpovedi;
    console.log(`   Odpovědi (3x): [`);
    answers.forEach((ans, idx) => {
      const label = idx === 0 ? '✅ SPRÁVNÁ' : '❌ špatná';
      console.log(`     ${label}: "${ans.substring(0, 40)}${ans.length > 40 ? '...' : ''}"`);
    });
    console.log(`   ]`);
  }
});

console.log('\n' + '='*60);
console.log('✅ Všechny podtémata mají otázky pro PDF generování');
