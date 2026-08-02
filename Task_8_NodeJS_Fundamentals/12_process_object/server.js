// argv --> it has 2 things by default --> 1. path to nodejs 2. path of the file
// console.log(process);
console.log(process.argv);
console.log(process.argv[3]);
// process.env
console.log(process.env);
console.log(process.env.LOGNAME);
// pid --> to get the nodejs working process id
console.log(process.pid);

// cwd() --> to get the current working directory
console.log(process.cwd());

// title
console.log(process.title);

// memoryUsage()
console.log(process.memoryUsage());

// uptime()
console.log(process.uptime());

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

// exit()
process.exit(0);

console.log("Hello from after exit");
