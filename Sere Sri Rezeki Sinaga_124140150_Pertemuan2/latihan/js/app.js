// ----------------------------------------------------
// 1. Let dan Const & Arrow Functions
// ----------------------------------------------------
export function demoVariables() {
  var oldVar = "Old variable";
  {
    var oldVar = "Changed inside block (var bocor)";
  }

  let newLet = "New let variable";
  {
    let newLet = "Different variable inside block (let aman)";
  }

  const PI = 3.14159;
  const user = { name: "Sere Sri Rezeki Sinaga", age: 19, email: "sere.124140150@student.itera.ac.id" };
  user.age = 20;

  return { oldVar, newLet, PI, user };
}

export function demoArrowFunctions() {
  function regularSum(a, b) {
    return a + b;
  }

  const arrowSum = (a, b) => {
    return a + b;
  };

  const shortArrowSum = (a, b) => a + b;
  const sayHello = () => "Halo, Sere!";
  const square = x => x * x;

  return {
    regularSum: regularSum(5, 3),
    arrowSum: arrowSum(5, 3),
    shortArrowSum: shortArrowSum(5, 3),
    sayHello: sayHello(),
    square: square(4)
  };
}

// ----------------------------------------------------
// 2. Template Literals
// ----------------------------------------------------
export function demoTemplateLiterals() {
  const name = "Sere Sri Rezeki Sinaga";
  const age = 19;
  const email = "sere.124140150@student.itera.ac.id";

  const oldWay = "Nama saya " + name + ", email: " + email + ", dan umur saya " + age + " tahun.";
  const newWay = `Nama saya ${name}, email: ${email}, dan umur saya ${age} tahun.`;
  
  const multiLine = `
    Profil Mahasiswa ITERA:
    Nama: ${name}
    Email: ${email}
    Umur: ${age}
  `;

  const expression = `Tahun lahir: ${new Date().getFullYear() - age}`;

  return { oldWay, newWay, multiLine, expression };
}

// ----------------------------------------------------
// 3. Destructuring, Spread, dan Rest
// ----------------------------------------------------
export function demoDestructuring() {
  const person = {
    firstName: "Sere",
    lastName: "Sinaga",
    age: 19,
    email: "sere.124140150@student.itera.ac.id",
    address: { city: "Bandar Lampung", postalCode: "35141" }
  };

  const { firstName, lastName } = person;
  const { firstName: fName, lastName: lName } = person;
  const { hobby = "coding" } = person;
  const { address: { city, postalCode } } = person;

  const aliases = ["Wulan Sanji", "Sena Sulawesi", "Bango Labanz"];
  const [alias1, alias2] = aliases;
  const [, , thirdAlias] = aliases;

  let a = 1;
  let b = 2;
  [a, b] = [b, a];

  return {
    objectBasic: { firstName, lastName },
    objectRenamed: { fName, lName },
    objectDefault: hobby,
    objectNested: { city, postalCode },
    arrayBasic: { alias1, alias2 },
    arraySkipped: thirdAlias,
    swapped: { a, b }
  };
}

export function demoSpreadRest() {
  const aliases1 = ["Wulan Sanji", "Sena Sulawesi"];
  const aliases2 = ["Bango Labanz"];
  const mergedAliases = [...aliases1, ...aliases2];
  const aliasesCopy = [...aliases1];

  const person = { name: "Sere", age: 19 };
  const extendedPerson = { ...person, email: "sere.124140150@student.itera.ac.id", campus: "ITERA" };

  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }

  function process(first, second, ...rest) {
    return { first, second, rest };
  }

  return {
    spreadArray: mergedAliases,
    copyArray: aliasesCopy,
    spreadObject: extendedPerson,
    restSum: sum(10, 20, 30, 40),
    restProcess: process("Wulan Sanji", "Sena Sulawesi", "Bango Labanz")
  };
}

// ----------------------------------------------------
// 4. Default Parameters, Classes, & Enhanced Object Literals
// ----------------------------------------------------
export function demoDefaultParams() {
  function greetOld(name, greeting) {
    name = name || "Sere Sri Rezeki";
    greeting = greeting || "Hello";
    return `${greeting}, ${name}!`;
  }

  function greet(name = "Sere Sri Rezeki", greeting = "Hello") {
    return `${greeting}, ${name}!`;
  }

  function createUser(name = "Sere", role = "Teknik Informatika", createdAt = new Date().toISOString()) {
    return { name, role, createdAt };
  }

  function createOrder(product, quantity = 1, price, total = price * quantity) {
    return { product, quantity, price, total };
  }

  return {
    oldWay: greetOld(),
    oldWayParams: greetOld("Wulan Sanji", "Hi"),
    newWay: greet(),
    newWayParams: greet("Sena Sulawesi", "Hi"),
    withExpression: createUser("Sere"),
    usingPrevious: createOrder("Modul praktikum JS", 1, 50000)
  };
}

export function demoClasses() {
  class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
      this.createdAt = new Date();
    }
    
    getInfo() {
      return `${this.name} (${this.email})`;
    }
    
    getCreatedDate() {
      return this.createdAt.toLocaleDateString();
    }
  }

  class Admin extends User {
    constructor(name, email, role = "admin") {
      super(name, email);
      this.role = role;
    }
    
    getInfo() {
      return `${super.getInfo()} - ${this.role}`;
    }
    
    hasAccess(module) {
      return true;
    }
  }

  const user = new User("Sere Sri Rezeki Sinaga", "sere.124140150@student.itera.ac.id");
  const admin = new Admin("Wulan Sanji", "wulan@admin.itera.ac.id");

  return {
    user: { info: user.getInfo(), createdDate: user.getCreatedDate() },
    admin: { info: admin.getInfo(), createdDate: admin.getCreatedDate(), hasAccess: admin.hasAccess("dashboard") },
    isUserInstance: user instanceof User,
    isAdminInstance: admin instanceof User
  };
}

export function demoObjectLiterals() {
  const name = "Sere";
  const age = 19;
  const email = "sere.124140150@student.itera.ac.id";

  const oldPerson = { name: name, age: age, email: email, sayHello: function() { return "Halo dari Sere!"; } };
  
  const newPerson = {
    name,
    age,
    email,
    sayHello() { return "Halo dari Sere!"; },
    ["alias_" + 1]: "Wulan Sanji",
    ["alias_" + 2]: "Sena Sulawesi",
    ["alias_" + 3]: "Bango Labanz"
  };

  const prefix = "itera";
  const userData = {
    [`${prefix}_nim`]: 124140150,
    [`${prefix}_prodi`]: "Teknik Informatika",
    [Date.now()]: "timestamp"
  };

  return {
    oldWay: oldPerson,
    newWay: newPerson,
    methods: { old: oldPerson.sayHello(), new: newPerson.sayHello() },
    computedProps: { alias1: newPerson.alias_1, alias2: newPerson.alias_2, alias3: newPerson.alias_3 },
    dynamicProps: userData
  };
}

// ----------------------------------------------------
// 5. Modern Array Methods & Advanced Arrays
// ----------------------------------------------------
export function demoArrayMethods() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const users = [
    { id: 1, name: "Sere", age: 19, active: true },
    { id: 2, name: "Wulan Sanji", age: 20, active: true },
    { id: 3, name: "Sena Sulawesi", age: 21, active: false },
    { id: 4, name: "Bango Labanz", age: 22, active: true }
  ];

  const doubled = numbers.map(num => num * 2);
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  const activeUsers = users.filter(user => user.active);
  const userFind = users.find(user => user.name === "Wulan Sanji");
  const hasAdult = users.some(user => user.age >= 18);
  const allAdults = users.every(user => user.age >= 18);
  const sum = numbers.reduce((total, num) => total + num, 0);
  const oldest = users.reduce((oldest, user) => user.age > oldest.age ? user : oldest, users[0]);

  const activeUsersNames = users.filter(user => user.active).map(user => user.name);
  const totalActiveAge = users.filter(user => user.active).reduce((sum, user) => sum + user.age, 0);

  return {
    map: doubled,
    filter: { evenNumbers, activeUsers: activeUsers.length },
    find: userFind,
    some: hasAdult,
    every: allAdults,
    reduce: { sum, oldest: oldest.name },
    chaining: { activeUsersNames, totalActiveAge }
  };
}

export function demoAdvancedArrays() {
  const aliases = ["Wulan Sanji", "Sena Sulawesi", "Bango Labanz"];
  const aliasesCopy = [...aliases];
  const moreAliases = [...aliases, "Sere"];
  const combinedArrays = [...aliases, ...["ITERA", "Informatika"]];

  const fromIterable = Array.from("sere");
  const withMapFn = Array.from([1, 2, 3], n => n * n);
  const newArray = Array.of("Sere", 19, { nim: 124140150 });

  const nestedArrays = [1, [2, 3], [[4, 5], 6]];
  const flattened = nestedArrays.flat();
  const deepFlattened = nestedArrays.flat(2);
  const flatMapped = [1, 2, 3].flatMap(n => [n, n * 2]);
  const hasName = aliases.includes("Wulan Sanji");

  return {
    clone: aliasesCopy,
    concat: { moreAliases, combinedArrays },
    arrayFrom: { fromIterable, withMapFn },
    arrayOf: newArray,
    flatAndFlatMap: { flattened, deepFlattened, flatMapped },
    includes: hasName
  };
}

// ----------------------------------------------------
// 6. Promises & Async/Await
// ----------------------------------------------------
export function demoPromises() {
  function fetchData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          const names = ["Sere", "Wulan Sanji", "Sena Sulawesi", "Bango Labanz"];
          resolve({ id, name: names[id % names.length], success: true });
        } else {
          reject(new Error("ID tidak valid"));
        }
      }, 1000);
    });
  }

  const outputDiv = document.createElement('div');
  outputDiv.className = 'promise-outputs space-y-2';

  const createPromiseElement = (id, label) => {
    const el = document.createElement('div');
    el.className = 'promise-result text-xs';
    el.innerHTML = `<strong>${label}:</strong> <span id="${id}">Memuat...</span>`;
    outputDiv.appendChild(el);
  };

  createPromiseElement('promise-basic', 'Promise Dasar');
  createPromiseElement('promise-chain', 'Promise Chain');
  createPromiseElement('promise-all', 'Promise.all');
  createPromiseElement('promise-race', 'Promise.race');

  fetchData(1)
    .then(data => { outputDiv.querySelector('#promise-basic').textContent = `Sukses: ${JSON.stringify(data)}`; })
    .catch(err => { outputDiv.querySelector('#promise-basic').textContent = `Error: ${err.message}`; });

  fetchData(2)
    .then(user => {
      let res = `Dapat user: ${user.name}`;
      return fetchData(3).then(secondUser => ({ res, secondUser }));
    })
    .then(({ res, secondUser }) => {
      outputDiv.querySelector('#promise-chain').textContent = `${res} dan ${secondUser.name}`;
    })
    .catch(err => { outputDiv.querySelector('#promise-chain').textContent = `Error: ${err.message}`; });

  Promise.all([fetchData(4), fetchData(5), fetchData(6)])
    .then(results => {
      outputDiv.querySelector('#promise-all').textContent = `Semua selesai: ${results.map(r => r.name).join(', ')}`;
    })
    .catch(err => { outputDiv.querySelector('#promise-all').textContent = `Error: ${err.message}`; });

  Promise.race([
    fetchData(7),
    fetchData(8),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500))
  ])
    .then(winner => { outputDiv.querySelector('#promise-race').textContent = `Pemenang race: ${winner.name}`; })
    .catch(err => { outputDiv.querySelector('#promise-race').textContent = `Error race: ${err.message}`; });

  return outputDiv;
}

export function demoAsyncAwait() {
  function fetchUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) resolve({ id, name: "Sere Sri Rezeki", email: "sere.124140150@student.itera.ac.id" });
        else reject(new Error("ID user tidak valid"));
      }, 1000);
    });
  }

  function fetchUserPosts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ id: 1, title: "Tugas Jaringan Komputer" }, { id: 2, title: "Praktikum Web Next Gen" }]);
      }, 800);
    });
  }

  async function getUserData(id) {
    try {
      const user = await fetchUser(id);
      const posts = await fetchUserPosts(user.id);
      return { user, posts, success: true };
    } catch (error) {
      return { error: error.message, success: false };
    }
  }

  async function getMultipleUsers(ids) {
    try {
      const users = await Promise.all(ids.map(id => fetchUser(id)));
      const allPosts = await Promise.all(users.map(u => fetchUserPosts(u.id)));
      return users.map((user, i) => ({ user, posts: allPosts[i] }));
    } catch (error) {
      return { error: error.message };
    }
  }

  const outputDiv = document.createElement('div');
  outputDiv.className = 'async-outputs space-y-2 text-xs';

  const basicAsyncResult = document.createElement('div');
  basicAsyncResult.innerHTML = '<strong>User Tunggal:</strong> Memuat...';
  outputDiv.appendChild(basicAsyncResult);

  const parallelAsyncResult = document.createElement('div');
  parallelAsyncResult.innerHTML = '<strong>Beberapa User:</strong> Memuat...';
  outputDiv.appendChild(parallelAsyncResult);

  getUserData(42).then(result => {
    if (result.success) {
      basicAsyncResult.innerHTML = `<strong>User Tunggal:</strong> ${result.user.name} | Posts: ${result.posts.length}`;
    } else {
      basicAsyncResult.innerHTML = `<strong>Error:</strong> ${result.error}`;
    }
  });

  getMultipleUsers([101, 102, 103]).then(results => {
    if (!results.error) {
      parallelAsyncResult.innerHTML = `<strong>Beberapa User:</strong> ${results.map(r => r.user.name).join(', ')} | Total posts: ${results.reduce((sum, r) => sum + r.posts.length, 0)}`;
    } else {
      parallelAsyncResult.innerHTML = `<strong>Error:</strong> ${results.error}`;
    }
  });

  return outputDiv;
}