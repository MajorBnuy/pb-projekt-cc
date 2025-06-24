import rls from "readline-sync"

let projects = [
   { name: "Website", status: "offen", tags: ["WebDev"] },
   { name: "Badezimmer", status: "in Arbeit", tags: ["Haushalt"] }
]

// function showMenu() {
//    console.log("\n~~~~~~~~~~~~~~~~~~");
//    console.log("[1] Projekt anzeigen");
//    console.log("[2] Projekt hinzufügen");
//    console.log("[3] Beenden");
//    console.log("~~~~~~~~~~~~~~~~~~\n");
//    const choiseMenu = rls.question("Wähle eine Option > ")
//    return choiseMenu
// }
// showMenu()

// function showProjects() {
//    console.log("\n deine Projekte:");
//    if (projects.length === 0) {
//       console.log("Noch keine Projekte.");
//       return
//    }
// }

// function addProject(n, s, t) {
//    const project = {
//       name: n,
//       status: s,
//       tags: t,
//    }
//    return projects.push(project)
// }

// console.log(addProject("Artwork", "in Arbeit", "Kunst" ));

// console.log(projects);

function addProject() {
  const name = rls.question("Name des neuen Projekts: ");
  const status = "offen";
  const tagsInput = rls.question("Tags (kommagetrennt, optional): ");
  const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

  const project = {
    name,
    status,
    tags
  };

  projects.push(project);
  console.log(`✅ Projekt "${name}" wurde hinzugefügt.`);
}
addProject()

console.log(projects);