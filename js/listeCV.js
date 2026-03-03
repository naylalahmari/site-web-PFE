// Données mock pour tester le front-end
const employees = [
    {id: 1, matricule: "1001", nom: "Benali", prenom: "Sara", statut: "Permanent", fonction: "Ingénieur", structure: "IT", type: "Titulaire", naissance: "1998-05-12"},
    {id: 2, matricule: "1002", nom: "Kaci", prenom: "Yanis", statut: "Contractuel", fonction: "Technicien", structure: "Maintenance", type: "CDD", naissance: "1995-08-20"}
];

const tableBody = document.querySelector("#listeTable tbody");
let deleteId = null;
let editRow = null;
let editEmp = null;

// Modals
const confirmEditModal = document.getElementById("confirmEditModal");
const modalText = confirmEditModal.querySelector(".modal-content p");
const confirmYesBtn = document.getElementById("confirmEditYes");
const confirmNoBtn = document.getElementById("confirmEditNo");
const confirmModal = document.getElementById("confirmModal");

// Affichage de la table
function afficherEmployes() {
    tableBody.innerHTML = "";

    employees.forEach(emp => {
        const row = document.createElement("tr");

        for (let key of ["matricule","nom","prenom","statut","fonction","structure","type","naissance"]) {
            const td = document.createElement("td");
            td.textContent = emp[key];
            row.appendChild(td);
        }

        const actionTd = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Modifier";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => activerEdition(row, emp));
        actionTd.appendChild(editBtn);

        const delBtn = document.createElement("button");
        delBtn.textContent = "🗙";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => supprimerEmploye(emp.id));
        actionTd.appendChild(delBtn);

        row.appendChild(actionTd);
        tableBody.appendChild(row);
    });
}


//  ACTIVER ÉDITION 
function activerEdition(row, emp) {
    const tds = row.querySelectorAll("td");

    if (row.classList.contains("editing")) {
        editRow = row;
        editEmp = emp;
        modalText.textContent = "Voulez-vous vraiment enregistrer les modifications ?";
        confirmYesBtn.textContent = "Oui";
        confirmYesBtn.style.display = "inline-block";
        confirmNoBtn.style.display = "inline-block";
        confirmYesBtn.onclick = enregistrerModifications;
        confirmEditModal.style.display = "flex";
    } else {

        const fields = ["matricule","nom","prenom","statut","fonction","structure","type","naissance"];

        fields.forEach((key,i) => {

            let element;

            // INPUT TEXT
            if (key === "matricule" || key === "nom" || key === "prenom") {
                element = document.createElement("input");
                element.type = "text";
                element.value = emp[key];
            }

            // DATE
            else if (key === "naissance") {
                element = document.createElement("input");
                element.type = "date";
                element.value = emp[key];
            }

            // SELECT
            else {
                element = document.createElement("select");

                let options = [];

                if (key === "statut") options = ["Permanent", "Contractuel"];
                if (key === "fonction") options = ["Ingénieur", "Technicien", "Administrateur"];
                if (key === "structure") options = ["IT", "Maintenance", "RH"];
                if (key === "type") options = ["Titulaire", "CDD", "CDI"];

                options.forEach(opt => {
                    const option = document.createElement("option");
                    option.value = opt;
                    option.textContent = opt;
                    if (opt === emp[key]) option.selected = true;
                    element.appendChild(option);
                });
            }

            tds[i].textContent = "";
            tds[i].appendChild(element);
        });

        row.classList.add("editing");
        row.querySelector(".edit-btn").textContent = "Enregistrer";
    }
}


// ENREGISTRER 
function enregistrerModifications() {
    if (!editRow || !editEmp) return;
    const tds = editRow.querySelectorAll("td");
    let allFilled = true;

    ["matricule","nom","prenom","statut","fonction","structure","type","naissance"].forEach((key,i) => {

        const field = tds[i].querySelector("input, select");

        if (!field.value.trim()) {
            allFilled = false;
            field.classList.add("error");
        } else {
            field.classList.remove("error");
        }
    });

    if (!allFilled) {
        modalText.textContent = "Certains champs sont vides ! Remplissez-les pour enregistrer.";
        confirmYesBtn.textContent = "OK";
        confirmNoBtn.style.display = "none";

        confirmYesBtn.onclick = () => {
            confirmEditModal.style.display = "none";
            confirmYesBtn.textContent = "Oui";
            confirmNoBtn.style.display = "inline-block";
            modalText.textContent = "Voulez-vous vraiment enregistrer les modifications ?";
            confirmYesBtn.onclick = enregistrerModifications;
        };

        confirmEditModal.style.display = "flex";
        return;
    }

    ["matricule","nom","prenom","statut","fonction","structure","type","naissance"].forEach((key,i) => {
        const field = tds[i].querySelector("input, select");
        editEmp[key] = field.value;
        tds[i].textContent = editEmp[key];
    });

    editRow.classList.remove("editing");
    editRow.querySelector(".edit-btn").textContent = "Modifier";
    editRow = null;
    editEmp = null;

    confirmEditModal.style.display = "none";
}


// Supprimer employé
function supprimerEmploye(id) {
    deleteId = id;
    confirmModal.style.display = "flex";
}

document.getElementById("confirmYes").addEventListener("click", () => {
    const index = employees.findIndex(emp => emp.id === deleteId);
    if (index !== -1) employees.splice(index,1);
    afficherEmployes();
    confirmModal.style.display = "none";
    deleteId = null;
});

document.getElementById("confirmNo").addEventListener("click", () => {
    confirmModal.style.display = "none";
    deleteId = null;
});

document.getElementById("confirmEditNo").addEventListener("click", () => {
    if (editRow && editEmp) {
        const tds = editRow.querySelectorAll("td");
        ["matricule","nom","prenom","statut","fonction","structure","type","naissance"].forEach((key,i) => {
            tds[i].textContent = editEmp[key];
        });
        editRow.classList.remove("editing");
        editRow.querySelector(".edit-btn").textContent = "Modifier";
    }
    confirmEditModal.style.display = "none";
    editRow = null;
    editEmp = null;
});

afficherEmployes();