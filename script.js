
const btmToManagement = document.querySelector("#toManagement");
const btnToEdit = document.querySelector("#toEdit");

const managementPage = document.querySelector(".management");
const editPage = document.querySelector(".edit");

const tableData = document.querySelector(".tableData");


const selectAction = document.querySelector("#selectAction");
const inputFullName = document.querySelector("#inputFullName");
const inputRank = document.querySelector("#inputRank");
const inputPosition = document.querySelector("#inputPosition");
const inputPlatoon = document.querySelector("#inputPlatoon");
const btnAdd = document.querySelector("#btnAdd");

const UpdateSelectAction = document.querySelector("#UpdateSelectAction");
const UpdateFullName = document.querySelector("#UpdateFullName");
const UpdateRank = document.querySelector("#UpdateRank");
const UpdatePosition = document.querySelector("#UpdatePosition");
const UpdatePlatoon = document.querySelector("#UpdatePlatoon");
const sortFullName = document.querySelector("#sortFullName");

// btmToManagement.addEventListener("click", (e) => {
//     editPage.style.display = "none";
//     managementPage.style.display = "flex";
// })

// btnToEdit.addEventListener("click", (e) => {
//     managementPage.style.display = "none";
//     editPage.style.display = "flex";
// })





function SoldierObg(fullName, rank, position, platoon, status = "active") {
    this.fullName = fullName;//
    this.rank = rank;//דרגא
    this.position = position;//תפקיד
    this.platoon = platoon;//מחלקה
    this.status = status;//active, reserve, retired

}










const soldierDiv = (SoldierObg) => {
    const tableRow = document.createElement("div");
    tableRow.className = "tableRow";
    const tableCube1 = document.createElement("div");
    const tableCube2 = document.createElement("div");
    const tableCube3 = document.createElement("div");
    const tableCube4 = document.createElement("div");
    const tableCube5 = document.createElement("div");
    const tableCube6 = document.createElement("div");
    tableCube1.className = "tableCube";
    tableCube2.className = "tableCube";
    tableCube3.className = "tableCube";
    tableCube4.className = "tableCube";
    tableCube5.className = "tableCube";
    tableCube6.className = "tableCube";
    tableCube1.textContent = SoldierObg.fullName;
    tableCube2.textContent = SoldierObg.rank;
    tableCube3.textContent = SoldierObg.position;
    tableCube4.textContent = SoldierObg.platoon;
    tableCube5.textContent = SoldierObg.status;
    const removeBtn = document.createElement("div");
    const missionBtn = document.createElement("div");
    const editBtn = document.createElement("div");
    tableCube6.append(removeBtn, missionBtn, editBtn);
    removeBtn.className = "greenBtn";
    removeBtn.addEventListener("click", (e) => {
        remove(SoldierObg);
        fillingTableData();
    })
    missionBtn.className = "greenBtn";
    editBtn.className = "greenBtn";
    editBtn.addEventListener("click", (e) => {
        editSoldier(SoldierObg);
    })
    removeBtn.textContent = "remove";
    missionBtn.textContent = "mossion";
    editBtn.textContent = "edit";
    tableRow.append(tableCube1, tableCube2, tableCube3, tableCube4, tableCube5, tableCube6);
    return tableRow;
}

let allSoldiers = [];
let currentSort = "up";




const fillingTableData = () => {
    let try_get = localStorage.getItem("allSoldiers");
    if (try_get) {
        allSoldiers = JSON.parse(try_get);
        // console.log(allSoldiers);
    } else {
        allSoldiers = [];
    }
    tableData.textContent = "";
    allSoldiers.sort((a, b) => {return a.fullName >= b.fullName ? 1 : -1}, 0);
    for (let i of allSoldiers) {
        tableData.appendChild(soldierDiv(i));
    }
};



fillingTableData();



const appendSoldier = () => {
    const FullName = inputFullName.value;
    const Platoon = inputPlatoon.value;
    const Position = inputPosition.value;
    const Rank = inputRank.value;
    const Status = selectAction.value;
    if (FullName != "" && Platoon != "" && Position != "" && Rank != "") {
        const newS = new SoldierObg(FullName, Rank, Position, Platoon, Status);
        allSoldiers.push(newS);
        localStorage.setItem("allSoldiers", JSON.stringify(allSoldiers));
        console.log(allSoldiers);
        fillingTableData();
        inputFullName.value = "";
        inputPlatoon.value = "";
        inputPosition.value = "";
        inputRank.value = "";
        selectAction.value = "active";
    } else {
        alert("לא מילאת את כל הנתונים")
    }
}


btnAdd.addEventListener("click", (e) => {
    appendSoldier();
})





const remove = (SoldierObg) => {
    const name = SoldierObg.fullName;
    // const tryLoad = localStorage.getItem("allSoldiers");
    // const newArr = tryLoad ? JSON.parse(tryLoad) : [];
    const arrToSave = allSoldiers.filter((a) => (a.fullName != name));
    localStorage.setItem("allSoldiers", JSON.stringify(arrToSave));
    allSoldiers = arrToSave;
}




const editSoldier = (SoldierOld) => {
    managementPage.style.display = "none";
    editPage.style.display = "flex";
    UpdateFullName.value = SoldierOld.fullName;
    UpdatePlatoon.value = SoldierOld.platoon;
    UpdatePosition.value = SoldierOld.position;
    UpdateRank.value = SoldierOld.rank;
    UpdateSelectAction.value = SoldierOld.status;

    const btnSave = document.querySelector("#btnSave");
    btnSave.addEventListener("click", () => {
        const FullName = UpdateFullName.value;
        const Platoon = UpdatePlatoon.value;
        const Position = UpdatePosition.value;
        const Rank = UpdateRank.value;
        const Status = UpdateSelectAction.value;
        if(FullName != "" && Platoon != "" && Position != "" && Rank != ""){
            const newS = new SoldierObg(FullName, Rank, Position, Platoon, Status)
            const arrToSave = allSoldiers.filter((a) => (a.fullName != SoldierOld.fullName));
            arrToSave.push(newS);
            allSoldiers = arrToSave;
            localStorage.setItem("allSoldiers", JSON.stringify(arrToSave));
            window.location.reload();
        }else{
            alert("לא מילאת את כל הנתונים")
        }
    })
};

sortFullName.addEventListener("click", () => {
    if (currentSort == "up") {
        allSoldiers.sort((a, b) => {return a.fullName >= b.fullName ? 1 : -1}, 0);
        currentSort = "down";
        sortFullName.textContent = sortFullName.textContent.replace("⬆️", "⬇️");
    } else {
        allSoldiers.sort((a, b) => {return a.fullName <= b.fullName ? 1 : -1}, 0);
        currentSort = "up";
        sortFullName.textContent = sortFullName.textContent.replace("⬇️", "⬆️");
    }
    tableData.textContent = "";
    for (let i of allSoldiers) {
        tableData.appendChild(soldierDiv(i));
    }
});






