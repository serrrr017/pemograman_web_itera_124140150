import { 
  demoVariables, 
  demoArrowFunctions, 
  demoTemplateLiterals, 
  demoDestructuring, 
  demoSpreadRest,
  demoDefaultParams,
  demoClasses,
  demoObjectLiterals,
  demoArrayMethods,
  demoAdvancedArrays,
  demoPromises,
  demoAsyncAwait
} from './app.js';

// Fungsi helper untuk merender kartu hasil demo ke antarmuka web
export function addOutput(title, subtitle, content) {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;
  const card = document.createElement("div");
  card.className = "output-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-bold text-blue-600 text-base mb-1">${title}</h4>
    <p class="text-xs text-gray-500 mb-2">${subtitle}</p>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap overflow-x-auto result">${content}</pre>
  `;
  outputEl.appendChild(card);
}

// Event handler untuk tombol pembersih layar
document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});

// Fungsi utama untuk menjalankan semua demo
function runAllDemos() {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";

  // 1. Let dan Const
  const varResults = demoVariables();
  addOutput("1. Let dan Const", "var vs let/const dan block scope", `var (function scope): ${varResults.oldVar}\nlet (block scope): ${varResults.newLet}\nconst (immutable): ${varResults.PI}\nconst object (mutable content): ${JSON.stringify(varResults.user)}`);

  // 2. Arrow Functions
  const arrowResults = demoArrowFunctions();
  addOutput("2. Arrow Functions", "Perbandingan fungsi reguler dan arrow functions", `Regular function: ${arrowResults.regularSum}\nArrow function: ${arrowResults.arrowSum}\nShort arrow: ${arrowResults.shortArrowSum}\nNo params: ${arrowResults.sayHello}\nSingle param: ${arrowResults.square}`);

  // 3. Template Literals
  const templateResults = demoTemplateLiterals();
  addOutput("3. Template Literals", "String concatenation vs template literals", `Old way: ${templateResults.oldWay}\nNew way: ${templateResults.newWay}\nWith expression: ${templateResults.expression}\nMulti-line: ${templateResults.multiLine}`);

  // 4. Destructuring
  const destructuringResults = demoDestructuring();
  addOutput("4. Destructuring", "Ekstraksi nilai dari objek dan array", `Object basic: ${JSON.stringify(destructuringResults.objectBasic)}\nObject renamed: ${JSON.stringify(destructuringResults.objectRenamed)}\nObject default: ${destructuringResults.objectDefault}\nObject nested: ${JSON.stringify(destructuringResults.objectNested)}\nArray basic: ${JSON.stringify(destructuringResults.arrayBasic)}\nArray skipped: ${destructuringResults.arraySkipped}\nArray with rest: ${JSON.stringify(destructuringResults.arrayRest)}\nSwapped variables: ${JSON.stringify(destructuringResults.swapped)}`);

  // 5. Spread dan Rest Operators
  const spreadRestResults = demoSpreadRest();
  addOutput("5. Spread dan Rest Operators", "Penggunaan ... untuk array dan objek", `Spread in array: ${JSON.stringify(spreadRestResults.spreadArray)}\nCopy array: ${JSON.stringify(spreadRestResults.copyArray)}\nMerged arrays: ${JSON.stringify(spreadRestResults.mergedArrays)}\nSpread in object: ${JSON.stringify(spreadRestResults.spreadObject)}\nRest in function (sum): ${spreadRestResults.restSum}\nRest with regular params: ${JSON.stringify(spreadRestResults.restProcess)}`);

  // 6. Default Parameters
  const defaultParamsResults = demoDefaultParams();
  addOutput("6. Default Parameters", "Nilai default untuk parameter fungsi", `Old way: ${defaultParamsResults.oldWay}\nOld way with params: ${defaultParamsResults.oldWayParams}\nNew way: ${defaultParamsResults.newWay}\nNew way with params: ${defaultParamsResults.newWayParams}\nWith expression: ${JSON.stringify(defaultParamsResults.withExpression)}\nUsing previous params: ${JSON.stringify(defaultParamsResults.usingPrevious)}`);

  // 7. Classes
  const classesResults = demoClasses();
  addOutput("7. Classes", "Penggunaan class dan inheritance", `User: ${classesResults.user.info}\nUser created: ${classesResults.user.createdDate}\nAdmin: ${classesResults.admin.info}\nAdmin created: ${classesResults.admin.createdDate}\nAdmin has access: ${classesResults.admin.hasAccess}\nuser instanceof User: ${classesResults.isUserInstance}\nadmin instanceof User: ${classesResults.isAdminInstance}`);

  // 8. Enhanced Object Literals
  const objectLiteralsResults = demoObjectLiterals();
  addOutput("8. Enhanced Object Literals", "Penulisan objek yang lebih ringkas", `Property shorthand: ${JSON.stringify(objectLiteralsResults.newWay)}\nMethod shorthand: ${objectLiteralsResults.methods.new}\nComputed properties: ${JSON.stringify(objectLiteralsResults.computedProps)}\nDynamic properties: ${JSON.stringify(objectLiteralsResults.dynamicProps)}`);

  // 9. Modern Array Methods
  const arrayMethodsResults = demoArrayMethods();
  addOutput("9. Modern Array Methods", "Higher-Order Functions pada array", `map: ${JSON.stringify(arrayMethodsResults.map)}\nfilter (evenNumbers): ${JSON.stringify(arrayMethodsResults.filter.evenNumbers)}\nfilter (activeUsers): ${arrayMethodsResults.filter.activeUsers}\nfind: ${JSON.stringify(arrayMethodsResults.find)}\nsome (hasAdult): ${arrayMethodsResults.some}\nevery (allAdults): ${arrayMethodsResults.every}\nreduce (sum): ${arrayMethodsResults.reduce.sum}\nreduce (oldest): ${arrayMethodsResults.reduce.oldest}\nchaining (activeUsersNames): ${JSON.stringify(arrayMethodsResults.chaining.activeUsersNames)}\nchaining (totalActiveAge): ${arrayMethodsResults.chaining.totalActiveAge}`);

  // 10. Advanced Arrays
  const advArraysResults = demoAdvancedArrays();
  addOutput("10. Advanced Arrays", "Fitur array lanjutan", `Clone: ${JSON.stringify(advArraysResults.clone)}\nConcat: ${JSON.stringify(advArraysResults.concat.combinedArrays)}\nArray.from: ${JSON.stringify(advArraysResults.arrayFrom.withMapFn)}\nArray.of: ${JSON.stringify(advArraysResults.arrayOf)}\nflat: ${JSON.stringify(advArraysResults.flatAndFlatMap.flattened)}\ndeepFlat: ${JSON.stringify(advArraysResults.flatAndFlatMap.deepFlattened)}\nflatMap: ${JSON.stringify(advArraysResults.flatAndFlatMap.flatMapped)}\nincludes: ${advArraysResults.includes}`);

  // 11. Promises
  addOutput("11. Promises", "Penanganan operasi asinkron dengan Promise", "");
  const promiseOutput = demoPromises();
  document.querySelector('.output-item:last-child .result')?.appendChild(promiseOutput);

  // 12. Async/Await
  addOutput("12. Async/Await", "Penanganan operasi asinkron dengan syntax yang lebih bersih", "");
  const asyncOutput = demoAsyncAwait();
  document.querySelector('.output-item:last-child .result')?.appendChild(asyncOutput);
}

// Hubungkan tombol Run Demo dengan fungsi eksekusi
document.getElementById("runBtn")?.addEventListener("click", () => {
  runAllDemos();
});