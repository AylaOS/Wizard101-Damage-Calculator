let spells = [];

//Load spell data from .json
async function loadSpells() {
    const response = await fetch("spells.json");
    spells = await response.json();

    const spellSelect = document.getElementById("spellSelect");

    spells.forEach((spell, index) => {
        const option = document.createElement("option");

        option.value = index;
        option.textContent = spell.name;

        spellSelect.appendChild(option);
    });
}

//Saves current wizard
function saveWizardStats(){
    const wizardStats = {
        name: document.getElementById("wizardName").value,
        damage: Number(document.getElementById("savedDmgPercent").value),
        pierce: Number(document.getElementById("piercePercent").value)
};
    let allWizards = JSON.parse(localStorage.getItem("allWizards")) || [];

    allWizards.push(wizardStats);

    localStorage.setItem("allWizards", JSON.stringify(allWizards));

    updateWizardDropdown();

    alert("Wizard saved!");
}


//Updates dropdown for current log of wizards
function updateWizardDropdown() {
    const wizardSelect = document.getElementById("wizardSelect");

    wizardSelect.innerHTML = "";

    const allWizards =
        JSON.parse(localStorage.getItem("allWizards")) || [];

    allWizards.forEach((wizard, index) => {
        const option = document.createElement("option");

        option.value = index;
        option.textContent = wizard.name;

        wizardSelect.appendChild(option);
    });
}

//Loads selected wizard from dropdown
function loadSelectedWizard() {
    const allWizards = JSON.parse(localStorage.getItem("allWizards")) || [];
    const wizardSelect = document.getElementById("wizardSelect");

    const selectedWizard = allWizards[wizardSelect.value];

    if(!selectedWizard){
        alert("No wizard selected.");
        return;
    }

    document.getElementById("wizardName").value = selectedWizard.name;
    document.getElementById("savedDmgPercent").value = selectedWizard.damage;
    document.getElementById("piercePercent").value = selectedWizard.pierce;
}

//Deletes a stored wizard
function deleteWizard(){
    const wizardSelect = document.getElementById("wizardSelect");

    let allWizards = JSON.parse(localStorage.getItem("allWizards")) || [];

    allWizards.splice(wizardSelect.value, 1);

    localStorage.setItem("allWizards", JSON.stringify(allWizards));

    updateWizardDropdown();
}

//Calculate damage
function calculateDamage(){
    const spellSelect = document.getElementById("spellSelect");
    const selectedSpell = spells[spellSelect.value];

    const dmgPercent = Number(document.getElementById("savedDmgPercent").value);

    const resistPercent = Number(document.getElementById("resistPercent").value);

    const avgBaseDmg = (selectedSpell.minDmg + selectedSpell.maxDmg) / 2;

    //Calculate final damage based on spell stats
    const finalDmg = avgBaseDmg * (1 + dmgPercent / 100) * (1 - resistPercent / 100);

    document.getElementById("result").textContent = "Final Damage: " + Math.round(finalDmg);
}

loadSpells();
updateWizardDropdown();