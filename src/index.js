import rls from "readline-sync"
import projects from "./projects.js"

//-----------------------------------
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
         manageProject()
         break;
      case "4":
         console.log("Tschüss! 👋");
         running = false;
         break;
      default:
      console.log("\n⚠️ Bitte nur [1], [2] oder [3] eingeben!");
      console.log("Versuch's nochmal. Du schaffst das! (ง •̀_•́)ง\n");
   }
}
//-----------------------------------
function showMenu() {
   console.log("\n~~~~~~~~~~~~~~~~~~");
   console.log("[1] Projekt anzeigen");
   console.log("[2] Projekt hinzufügen");
   console.log("[3] Status Ändern | Löschen");
   console.log("[4] Beenden");
   console.log("~~~~~~~~~~~~~~~~~~\n");
   const choiseMenu = rls.question("Wähle eine Option > ")
   return choiseMenu
}
//-----------------------------------
function showProjects() {
   console.log("\nDeine Projekte:");
   if (projects.length === 0) {
      console.log("Noch keine Projekte.");
      return;
   }

   projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} [${project.status}] – ${project.tags}`);
   });
}

//-----------------------------------
function addProject() {
  const name = rls.question("Name des neuen Projekts: ");
  const status = "offen";
  const tags = rls.question("Tags (kommagetrennt, optional): ");

  const project = {
    name,
    status,
    tags
  };
  projects.push(project);
  console.log(`✅ Projekt "${name}" wurde hinzugefügt.`);
}
//-----------------------------------
function manageProject() {
  let managing = true;

  while (managing) {
    console.log("\n~~~~~~~~~~~~~~~~~~");
    console.log("[1] Namen ändern");
    console.log("[2] Status ändern");
    console.log("[3] Projekt löschen");
    console.log("[4] Zurück zum Hauptmenü");
    console.log("~~~~~~~~~~~~~~~~~~\n");

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
        managing = false; // zurück zum Hauptmenü
        break;
      default:
        console.log("\n⚠️ Bitte nur [1] bis [4] eingeben!");
        console.log("Versuch's nochmal. Du schaffst das! (ง •̀_•́)ง\n");
    }
  }
}

//-----------------------------------
function changeName() {
  console.log("Für welches Projekt möchtest du den Namen ändern?");
  
  projects.forEach((project, index) => {
    console.log(`[${index + 1}] ${project.name} [${project.status}]`);
  });

  const indexInput = rls.question("Gib die Nummer des Projekts ein > ");
  const index = parseInt(indexInput) - 1;

  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.log("❌ Ungültige Nummer. Bitte gib eine Zahl aus der Liste ein. (｡•́︿•̀｡)");
    return;
  }
  const project = projects[index];

  console.log(`\nAktuelles Projekt: "${project.name}" [${project.status}]`);
  console.log("Worauf soll der Name geändert werden?");

  const statusName = rls.question("Gib den neuen Namen für den das Projekt ein > ");

  project.name = statusName;
  console.log(`✅ Status Name wurde erfolgreich auf "${statusName}" geändert! ヽ(•‿•)ノ`);
}
//-----------------------------------
function changeStatus() {
  console.log("Für welches Projekt möchtest du den Status ändern?");
  
  projects.forEach((project, index) => {
    console.log(`[${index + 1}] ${project.name} [${project.status}]`);
  });

  const indexInput = rls.question("Gib die Nummer des Projekts ein > ");
  const index = parseInt(indexInput) - 1;

  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.log("❌ Ungültige Nummer. Bitte gib eine Zahl aus der Liste ein. (｡•́︿•̀｡)");
    return;
  }

  const project = projects[index];

  console.log(`\nAktuelles Projekt: "${project.name}" [${project.status}]`);
  console.log("Worauf soll der Status geändert werden?");
  console.log("[1] Offen");
  console.log("[2] In Arbeit");
  console.log("[3] Pause");
  console.log("[4] Beendet");
  console.log("[5] Abgebrochen");

  const statusNumber = rls.question("Gib die Nummer für den neuen Status ein > ");

  const statusMap = {
    "1": "Offen",
    "2": "In Arbeit",
    "3": "Pause",
    "4": "Beendet",
    "5": "Abgebrochen"
  };

  const newStatus = statusMap[statusNumber];

  if (!newStatus) {
    console.log("⚠️ Ungültige Eingabe. Bitte gib eine Zahl von 1 bis 5 ein. (•ˋ _ ˊ•)");
    return;
  }

  project.status = newStatus;
  console.log(`✅ Status von "${project.name}" wurde erfolgreich auf "${newStatus}" geändert! ヽ(•‿•)ノ`);
}

//-----------------------------------
function deleteProject() {
  console.log("Welches Projekt möchtest du löschen?");
  

  projects.forEach((project, index) => {
    console.log(`[${index + 1}] ${project.name} [${project.status}]`);
  });

  const indexInput = rls.question("Gib die Nummer des Projekts ein > ");
  const index = parseInt(indexInput) - 1;

  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.log("❌ Ungültige Nummer. Bitte gib eine Zahl aus der Liste ein. (｡•́︿•̀｡)");
    return;
  }

  const confirm = rls.question(`Bist du sicher, dass du "${projects[index].name}" löschen möchtest? (j/n) > `);

  if (confirm.toLowerCase() === "j") {
    const removed = projects.splice(index, 1);
    console.log(`🗑️ Projekt "${removed[0].name}" wurde gelöscht. ✨`);
  } else {
    console.log("Abgebrochen. Projekt wurde nicht gelöscht. (⌒_⌒;)");
  }
}


//-----------------------------------