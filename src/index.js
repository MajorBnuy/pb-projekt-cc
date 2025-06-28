import rls from "readline-sync"
import chalk from "chalk"
import projects from "./projects.js"


//----------------------------------- MENU 
function showMenu() {
  console.log(`
╔════════════════════════════════════╗
║           Projekt-Menü             ║
╠════════════════════════════════════╣
║ [1] Projekt anzeigen               ║
║ [2] Projekt hinzufügen             ║
║ [3] Projekt ändern | Löschen       ║
║ [4] Beenden                        ║
╚════════════════════════════════════╝
`);
   const choiseMenu = rls.question("Wähle eine Option > ")
   return choiseMenu
}
//----------------------------------- LOOP
let running = true;

while (running) {
   const userChoice = showMenu();

   switch (userChoice) {
      case "1":
         showProjects();
         break;
      case "2":
         addProject()
         break;
      case "3":
        console.clear();
         manageProject()
         break;
      case "4":
        console.clear();
         console.log("\nTschüss!");
         running = false;
         break;
      default:
      console.log("\nBitte nur [1], [2] oder [3] eingeben!");
      console.log("Versuch's nochmal. Du schaffst das! (ง •̀_•́)ง\n");
   }
}
//----------------------------------- SHOW PROJECTS
function showProjects() {
  console.clear();
   console.log(chalk.underline("\nDEINE PROJEKTE:\n"));
   if (projects.length === 0) {
      console.log("Noch keine Projekte.");
      return;
   }
  projects.forEach((project, index) => {
    let number = index + 1;
    if (number < 10) {
      number = `0${number}`;
    }
    number = `[${number}]`;
    const name = project.name.padEnd(30, ' ');

    let statusColored;
      switch (project.status) {
         case "Offen":
            statusColored = chalk.red(project.status);
            break;
         case "In Arbeit":
            statusColored = chalk.yellow(project.status);
            break;
         case "Beendet":
            statusColored = chalk.green(project.status);
            break;
         default:
            statusColored = project.status;
      }
    const status = `[${statusColored}]`;
    console.log(`${number} ${name} || ${status}`);
  });
}

//----------------------------------- ADD PROJECT
function addProject() {
   console.log(chalk.underline("\nPROJEKT HINZUFÜGEN:\n"));
  const name = rls.question("=> Name des neuen Projekts, oder 'x' für zurück > ");
    if (name.toLowerCase() === "x") {
    return console.clear();
  }
  const status = "Offen";
  const project = {
    name,
    status,
  };
  projects.push(project);
  console.clear();
  return console.log("Projekt" + chalk.red(` ${name} `)+ "wurde hinzugefügt.");
}
//----------------------------------- MANAGE PROJECT
function manageProject() {
  let managing = true;

  while (managing) {
// console.clear();
console.log(`
╔════════════════════════════════════╗
║       Projekt ändern / löschen     ║
╠════════════════════════════════════╣
║ [1] Namen ändern                   ║
║ [2] Status ändern                  ║
║ [3] Projekt löschen                ║
║ [4] Zurück zum Hauptmenü           ║
╚════════════════════════════════════╝
`);

const choice = rls.question("Wähle eine Option > ");


    switch (choice) {
      case "1":
        changeName()
        break;
      case "2":
        changeStatus();
        break;
      case "3":
        deleteProject()
        break;
      case "4":
        console.clear();
        managing = false; 
        break;
      default:
        console.log("\nBitte nur [1] bis [4] eingeben!");
        console.log("Versuch's nochmal. Du schaffst das! (ง •̀_•́)ง\n");
    }
  }
}

//----------------------------------- CHANGE NAME
function changeName() {
  console.log(chalk.underline("\nPROJEKT-NAME ÄNDERN:\n"));
  console.log("Für welches Projekt möchtest du den Namen ändern?");
  
  projects.forEach((project, index) => {
    let number = index + 1;
    if (number < 10) {
      number = `0${number}`;
    }
    number = `[${number}]`;
    const name = project.name.padEnd(30, ' ');
    const status = `[${project.status}]`;
    console.log(`${number} ${name} || ${status}`);
  });
  console.log("- - - - - - -\nSchreibe x um zum Menü zurück zu kommen.");
  
  const indexInput = rls.question("Gib die Nummer des Projekts ein > ");
  const index = parseInt(indexInput) - 1;

  if (indexInput.toLowerCase() === "x") {
    return console.log("=> Zurück zum Menü");
  }
  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.clear();
    console.log(chalk.red("Ungültige Nummer. Bitte gib eine Zahl aus der Liste ein."));
    return changeName()
  }
  const project = projects[index];
  console.log("\nAktuelles Projekt:" + chalk.red(` ${project.name} [${project.status}]`));
  const statusName = rls.question("=> Gib den neuen Namen für das Projekt ein > ");

  project.name = statusName;
  console.clear();
  console.log("Projekt Name wurde erfolgreich auf" + chalk.red(` ${statusName} `) + "geändert!");
}
//----------------------------------- CHANGE STATUS
function changeStatus() {
  console.log(chalk.underline("\nPROJEKT-STATUS ÄNDERN:\n"));
  console.log("Für welches Projekt möchtest du den Status ändern?");
  
projects.forEach((project, index) => {
    let number = index + 1;
    if (number < 10) {
      number = `0${number}`;
    }
    number = `[${number}]`;
    const name = project.name.padEnd(30, ' ');

    let statusColored;
      switch (project.status) {
         case "Offen":
            statusColored = chalk.red(project.status);
            break;
         case "In Arbeit":
            statusColored = chalk.yellow(project.status);
            break;
         case "Beendet":
            statusColored = chalk.green(project.status);
            break;
         default:
            statusColored = project.status;
      }
    const status = `[${statusColored}]`;
    console.log(`${number} ${name} || ${status}`);
  });

  const indexInput = rls.question("Gib die Nummer des Projekts ein > ");
  const index = parseInt(indexInput) - 1;

  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.log("Ungültige Nummer. Bitte gib eine Zahl aus der Liste ein. (｡•́︿•̀｡)");
    return;
  }

  const project = projects[index];

  console.log(`\nAktuelles Projekt: "${project.name}" [${project.status}]`);
  console.log("Worauf soll der Status geändert werden?");
  console.log("[1]" + chalk.red(" Offen"));
  console.log("[2]"+ chalk.yellow(" In Arbeit"));
  console.log("[3]"+ chalk.green(" Beendet"));

  const statusNumber = rls.question("Gib die Nummer für den neuen Status ein > ");

  const statusMap = {
    "1": "Offen",
    "2": "In Arbeit",
    "3": "Beendet",
  };

  const newStatus = statusMap[statusNumber];

  if (!newStatus) {
    console.log("Ungültige Eingabe. Bitte gib eine Zahl von 1 bis 5 ein. (•ˋ _ ˊ•)");
    return;
  }

  project.status = newStatus;
  console.clear();
  console.log("Status von" + chalk.red(` ${project.name} `) + "wurde erfolgreich auf" + chalk.red(` ${newStatus} `) + "geändert!");
}

//----------------------------------- DELETE PROJECT
function deleteProject() {
  console.log(chalk.underline("\nPROJEKT LÖSCHEN:\n"));
  console.log("Welches Projekt möchtest du löschen?");
  

  projects.forEach((project, index) => {
    let number = index + 1;
    if (number < 10) {
      number = `0${number}`;
    }
    number = `[${number}]`;
    const name = project.name.padEnd(30, ' ');
    const status = `[${project.status}]`;
    console.log(`${number} ${name} || ${status}`);
  });
  console.log("- - - - - - -\nSchreibe x um zum Menü zurück zu kommen.");
  const indexInput = rls.question("Gib die Nummer des Projekts ein > ");
  const index = parseInt(indexInput) - 1;

  if (indexInput.toLowerCase() === "x") {
    console.clear();
    return console.log("=> Zurück zum Menü");
  }
  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.log("Ungültige Nummer. Bitte gib eine Zahl aus der Liste ein. (｡•́︿•̀｡)");
    return;
  }

  const confirm = rls.question(chalk.red(`\nBist du sicher, dass du "${projects[index].name}" löschen möchtest? (j/n) > `));

  if (confirm.toLowerCase() === "j") {
    const removed = projects.splice(index, 1);
    console.clear();
    console.log("Projekt" + chalk.red(` ${removed[0].name} `)+ "wurde gelöscht.");
  } else {
    console.clear();
    console.log("Abgebrochen. Projekt wurde nicht gelöscht.");
  }
}
//-----------------------------------