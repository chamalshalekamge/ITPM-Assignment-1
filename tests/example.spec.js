const { test, expect } = require('@playwright/test');

// Navigate before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
});

// POSITIVE TEST DATA
const positiveTests = [
  {
    id: "Pos_1",
    description: "Convert simple daily phrase",
    input: "oyaata kohomadha?",
    expected: "ඔයාට කොහොමද?"
  },
  {
    id: "Pos_2",
    description: "Convert compound greeting and request",
    input: "kohomadha, mata udhavu karanna puluvandha",
    expected: "කොහොමද, මට උදවු කරන්න පුලුවන්ද"
  },
  {
    id: "Pos_3",
    description: "Convert compound sentence with future intent",
    input: "mama gedhara giya passe oyata call karannam, iita passe api meet wenna puluvan",
    expected: "මම ගෙදර ගිය පස්සෙ ඔයට call කරන්නම්, ඊට පස්සෙ අපි meet වෙන්න පුලුවන්"
  },
  {
    id: "Pos_4",
    description: "Convert mixed Singlish and English question",
    input: "oyaa mage account eka update karalaa thiyenavaadha, and confirmation eka email karalaa thiyenavaadha?",
    expected: "ඔයා mage account එක update කරලා තියෙනවාද, and confirmation එක email කරලා තියෙනවාද?"
  },
  {
    id: "Pos_5",
    description: "Convert informal instruction sentence",
    input: "hariyata balala form eka fill karala hari nam submit karanna",
    expected: "හරියට බලල form එක fill කරල හරි නම් submit කරන්න"
  },
  {
    id: "Pos_6",
    description: "Convert polite formal request",
    input: "karunaakara mee document tika review karala mata feedback eka dhenna puluvandha?",
    expected: "කරුනාකර මේ document ටික review කරල මට feedback එක දෙන්න පුලුවන්ද?"
  },
  {
    id: "Pos_7",
    description: "Convert technical sentence with English terms",
    input: "mama server eka restart karala logs tika check karala balannam",
    expected: "මම server එක restart කරල logs ටික check කරල බලන්නම්"
  },
  {
    id: "Pos_8",
    description: "Convert sentence with numbers and system terms",
    input: "mama adha 3 veni paarata try kala namuth system eka hariyata respond une nae",
    expected: "මම අද 3 වෙනි පාරට try කල නමුත් system එක හරියට respond උනෙ නැ"
  },
  {
    id: "Pos_9",
    description: "Convert multiline paragraph input",
    input: "mama report eka hadhanava.oya data tika check karanava.api heta meeting eka thiyenava.",
    expected: "මම report එක හදනව.ඔය data ටික check කරනව.අපි හෙට meeting එක තියෙනව."
  },
  {
    id: "Pos_10",
    description: "Convert sentence with plural nouns",
    input: "students laa tika reports liyala submit karala thiyenava",
    expected: "students ලා ටික reports ලියල submit කරල තියෙනව"
  },
  {
    id: "Pos_11",
    description: "Convert long daily-use sentence",
    input: "adha udhe mama gedharin eliyata yanna kalin breakfast eka kanna amathaka unaa",
    expected: "අද උදෙ මම ගෙදරින් එලියට යන්න කලින් breakfast එක කන්න අමතක උනා"
  },
  {
    id: "Pos_12",
    description: "Convert short phrase-pattern command",
    input: "data tika hariyata check karanna",
    expected: "data ටික හරියට check කරන්න"
  },
  {
    id: "Pos_13",
    description: "Convert mixed Singlish + English compound question",
    input: "oya adha office ekata giye naethnam, meeting ekata online join karanna puluvanda kiyala ahanna , mokadha manager kivvā attendance very important kiyala, ehema nam please mata confirm karannako mokakdha hari plan eka?",
    expected: "ඔය අද office එකට ගියෙ නැත්නම්, meeting එකට online join කරන්න පුලුවන්ඩ කියල අහන්න , මොකද manager කිව්ව්ā attendance very important කියල, එහෙම නම් please මට confirm කරන්නකො මොකක්ද හරි plan එක?"
  },
  {
    id: "Pos_14",
    description: "Convert greeting with document confirmation request",
    input: "ayubovan oyaata, mama evva documents tika oyaata hariyata laebunadha kiyala ahanna",
    expected: "අයුබොවන් ඔයාට, මම එව්ව documents ටික ඔයාට හරියට ලැබුනද කියල අහන්න"
  },
  {
    id: "Pos_15",
    description: "Convert Singlish complex question with names and place",
    input: "Kamal Colombo giyaa kiyala kivvadha?",
    expected: "ඛමල් Colombo ගියා කියල කිව්වද?"
  },
  {
    id: "Pos_16",
    description: "Convert Singlish sentence with tenses, numbers, and punctuation",
    input: "oyaa dhaen office yanne naee, yesterday 2 meetings thibba, haebaei heta 3ta presentation eka karanna thiyenne, ee nisaa time eka hariyata plan karanna?",
    expected: "ඔයා දැන් office යන්නෙ නෑ, yesterday 2 meetings තිබ්බ, හැබැඉ හෙට 3ට presentation එක කරන්න තියෙන්නෙ, ඒ නිසා time එක හරියට plan කරන්න?"
  },
  {
    id: "Pos_17",
    description: "Convert Singlish text with negation and formatting",
    input: "oya ehema hithanne epaa api meeting eka cancel karala nae,haebaei dhaen plan eka venas karanna nae.",
    expected: "ඔය එහෙම හිතන්නෙ එපා අපි meeting එක cancel කරල නැ,හැබැයි දැන් plan එක වෙනස් කරන්න නැ"
  },
  {
    id: "Pos_18",
    description: "Convert Singlish text with pronoun variation and cleared lines",
    input: "mama hithanne nae mehema karana eka hari kiyala, mokadha mama dhannava mama karapu dhe hari nae kiyala.oya nam ehema hithanne nae kiyala api hodhata dhannava, mokadha oyaa situation eka therum gannava.",
    expected: "මම හිතන්නෙ නැ මෙහෙම කරන එක හරි කියල, මොකද මම දන්නව මම කරපු දෙ හරි නැ කියල.ඔය නම් එහෙම හිතන්නෙ නැ කියල අපි හොදට දන්නව, මොකද ඔයා situation එක තෙරුම් ගන්නව."
  },
  {
    id: "Pos_19",
    description: "Convert Singlish compound sentence with punctuation and numbers",
    input: "oyata 2 veni bus eka miss una  namuth 3ta meeting eka start venne kiyala manager kivva, ee nisa hurry up venna oona, hari nedha?",
    expected: "ඔයට 2 වෙනි bus එක miss උන  නමුත් 3ට meeting එක start වෙන්නෙ කියල manager කිව්ව, ඒ නිස hurry up වෙන්න ඕන, හරි නේද?"
    },
  {
    id: "Pos_20",
    description: "Convert Singlish text with phrase patterns and plural forms",
    input: "api kalin meetings okkoma plan karala thibba vidhihakata, daily reports, weekly updates saha monthly reviews okkoma on time submit karanavaa kiyala decision eka gaththa. namuth, team members la okkoma rules follow karanne nae, habits venas karanna time gannava kiyala api dhannava. ehema nisa future plans, new ideas saha backup options okkoma ready karala thiyaganna oona kiyala api hithanavaa.",
    expected: "අපි කලින් meetings ඔක්කොම plan කරල තිබ්බ විදිහකට, daily reports, weekly updates සහ monthly reviews ඔක්කොම on time submit කරනවා කියල decision එක ගත්ත. නමුත්, team members ල ඔක්කොම rules follow කරන්නේ නැ, habits වෙනස් කරන්න time ගන්නව කියල අපි දන්නව. එහෙම නිස future plans, new ideas සහ backup options ඔක්කොම ready කරල තියගන්න ඕන කියල අපි හිතනවා."
  },
  {
    id: "Pos_21",
    description: "Convert short Singlish negation with numbers",
    input: "oyaa 2ta enne nae nedha?",
    expected: "ඔයා 2ට එන්නෙ නැ නේද?"
  },
  {
    id: "Pos_22",
    description: "Convert Singlish imperative with numbers and punctuation",
    input: "oyaa 2ta documents print karanna, iita passe 3ta report submit karanna, hariyata check karala email send karanna.",
    expected: "ඔයා 2ට documents print කරන්න, ඊට පස්සෙ 3ට report submit කරන්න, හරියට check කරල email send කරන්න."
  },
  {
    id: "Pos_23",
    description: "Convert short Singlish question with cleared input",
    input: "oyaa office inne naedhdha?",
    expected: "ඔයා office ඉන්නේ නැද්ද?"
  },
  {
    id: "Pos_24",
    description: "Convert Singlish text with names and negation",
    input: "oya dhaen Colombo enne naedhdha, namuth ramesh kalin flight ekata giya nae, e nisa api plan karapu meeting eka postpone karanna one, mokadha attendees la okkoma ready nae.",
    expected: "ඔය දැන් Colombo එන්නෙ නැද්ද, නමුත් රමෙශ් කලින් flight එකට ගිය නැ, එ නිස අපි plan කරපු meeting එක postpone කරන්න one, මොකද attendees ල ඔක්කොම ready නැ."
  }
];

// NEGATIVE TEST DATA
const negativeTests = [
  {
    id: "Neg_1",
    description: "Convert messy Singlish question with typos, slang, and inconsistent",
    input: "oyaa dhaen office enavadha?  api meeting eka postpone karannadha???  naethnam dhaenma start karannadha??",
    expected: "ඔයා දැන් office එනවද?  අපි meeting එක postpone කරන්නද???  නැත්නම් දැන්ම start කරන්නද??"
  },
  {
    id: "Neg_2",
    description: "Convert Singlish sentence with multiple typos",
    input: "mama oyaa ge office ekata yanvaa. api meeting eka postpont karanna hithuvaa.",
    expected: "මම ඔයා ගෙ office එකට යන්වා. අපි meeting එක පොස්ට්පොන්ඩ් කරන්න හිතුවා."
  },
  {
    id: "Neg_3",
    description: "Convert messy Singlish command with names, places, and English words",
    input: "hari goto Colombo kdda! call Kamal & tell hime bring th docs 2 office asap",
    expected: "හරි Colombo යන්න! කමල්ට call කරලා කියන්න  bring docs "
  },
  {
    id: "Neg_4",
    description: "Handle short sentence with pronoun variation, names, and messy input",
    input: "I m going to colombo tmr, u join?",
    expected: "මම හෙට කොළඹ යන්නවා, ඔබ එක්වන්නවාද?"
  },
  {
    id: "Neg_5",
    description: "Convert daily language compound sentence",
    input: "broo oyaata kohomadha adha, mama oyaata call karanna try karaa namuth reply ekak naethi nisaa mata hithunaa oyaa busy dha naeththan ignore karaladha kiyala",
    expected: "බ්‍රෝ ඔයාට කොහොමද අද, මම ඔයාට call කරන්න try කරා නමුත් reply එකක් නැති නිසා මට හිතුනා ඔයා busy ද නැත්තන් ignore කරලද කියල"
  },
  {
    id: "Neg_6",
    description: "Convert phrase pattern with negation (long input)",
    input: "mama oyaata kiyanna hadhanne meka nam hari vidhihak nemei, mokada mama ehema dheyak karala nathi nisaa namuth oyata hithenne mama ehema karala kiyala, ehema nemei kiyala mama kalinuth kivvaa, eth oyaata eka hariyata theerenne naea, mama oyata call karanna try nokeruvaa nevei, time eka naethi nisa vitharayi ",
    expected: "මම ඔයාට කියන්න හදන්නෙ මෙක නම් හරි විදිහක් නෙමේ, මොකඩ මම එහෙම දෙයක් කරල නති නිසා නමුත් ඔයට හිතෙන්නෙ මම එහෙම කරල කියල, එහෙම නෙමේ කියල මම කලිනුත් කිව්වා, එත් ඔයාට එක හරියට තේරෙන්නෙ නැඅ, මම ඔයට call කරන්න try නොකෙරුවා නේවේ, time එක නැති නිස විතරයි "
  },
  {
    id: "Neg_7",
    description: "Convert plural form with names and places",
    input: "Colombos office walata mails",
    exp,ected: "Colombo office වලට mails"
  },
  {
    id: "Neg_8",
    description: "Convert complex sentence with typographical errors",
    input: "mama oyataa kiyanne meeka harima confusion ekak venna puluvan dheyak, mokadha mama oyata yestarday call karanna try karaa namuth signal prblm ekak nisa call eka connect une nae",
    expected: "මම ඔයාට කියන්නෙ මේක හරිම confusion එකක් වෙන්න පුලුවන් දෙයක්, මොකද මම ඔයට yesterday call කරන්න try කරා නමුත් සිග්නල් ප්‍රබ්ල්ම් එකක් නිස call එක connect උනෙ නැ"
  },
  {
    id: "Neg_9",
    description : "Convert interrogative sentence with punctuation and numbers",
    input: "oyaata meeting eka thiyennee 25 07 2026 dhaa 9 30 ta dha naeththan 10 ta dha kiyala mata sure nae oyaata hariyatama mathaka naedhdha",
    expected: "ඔයාට meeting එක තියෙන්නේ 25 07 2026 දා 9 30 ට ද? නැත්තන් 10 ට ද? කියල මට sure නැ ඔයාට හරියටම මතක නැද්ද?"
  },
  {
    id: "Neg_10",
    description: "Convert formatted sentence with mixed tenses",
    input: "mama yesterday office giyaa adha meeting thiyenavaa heta mama late venna puluvan kiyala oyata kiyanna hithuva",
    expected: "මම yesterday office ගියා අද meeting තියෙනවා හෙට මම late වෙන්න පුලුවන් කියල ඔයට කියන්න හිතුව"
  },

];

// POSITIVE TEST EXECUTION
for (const data of positiveTests) {
  test(`Positive | ${data.id} | ${data.description}`, async ({ page }) => {

    const inputBox = page.locator('textarea[placeholder*="Singlish"]');
    const outputBox = page.locator(
      '.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50'
    );

    await inputBox.fill(data.input);
    await page.waitForTimeout(5000);

    const actualOutput = await outputBox.textContent();

    console.log(`POSITIVE TEST: ${data.id}`);
    console.log(`Expected: ${data.expected}`);
    console.log(`Actual: ${actualOutput}`);

    expect(actualOutput).toContain(data.expected);
  });
}


// NEGATIVE TEST EXECUTION
for (const data of negativeTests) {
  test(`Negative | ${data.id} | ${data.description}`, async ({ page }) => {

    const inputBox = page.locator('textarea[placeholder*="Singlish"]');
    const outputBox = page.locator(
      '.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50'
    );

    await inputBox.fill(data.input);
    await page.waitForTimeout(5000);

    const actualOutput = await outputBox.textContent();

    console.log(`NEGATIVE TEST: ${data.id}`);
    console.log(`Expected: ${data.expected}`);
    console.log(`Actual: ${actualOutput}`);

    expect(actualOutput).toContain(data.expected);
  });
}