function switchContend(activeElement, activeBtn) {
  const element = getComputedStyle(document.getElementById(activeElement));

  switch (element.display) {
    case "none":
      document.getElementById(activeElement).style.display = "contents";
      document.getElementById(activeBtn).style.color = "white";
      break;
    case "contents":
      document.getElementById(activeElement).style.display = "none";
      document.getElementById(activeBtn).style.color = "grey";
      break;
  }
}

function copy(Copyfield) {
  if (navigator.clipboard) {
    var CopyString = document.getElementById(Copyfield).value;
    navigator.clipboard.writeText(CopyString);
    alert("Code erfolgreich kopiert");
  } else {
    alert("Copy failed");
  }
}

//--------------------- generate Class div --------------------
//difSettings
var MaxDifficulty = 5;
var difficultyIcon0 = "&#10029;";
var difficultyIcon1 = "&#10032";
var prefix = "Schwiergkeit: ";

//TalentsButtonId
var TalentsName;
var TalentsString;
var talentsButtonId = 0;
function createButtonID() {
  talentsButtonId++;
  return talentsButtonId;
}

//called in HTML doc
function spawnDiv(
  name,
  SpecTitle,
  difficulty,
  waLink,
  buildsTitle,
  buildsString,
  classColor
) {
  var div = document.createElement("div");
  div.classList.add("ClassContainer", name);

  //Title
  var titleDiv = document.createElement("div");
  var titleP = document.createElement("p");
  titleDiv.classList.add("ClassSpecTitle");
  titleP.classList.add("ClassName");
  titleP.innerText = SpecTitle;
  titleP.style.color = classColor;
  titleDiv.appendChild(titleP);
  div.appendChild(titleDiv);

  //Difficulty
  var difContainer = document.createElement("div");
  var dif = document.createElement("p");
  dif.classList.add(name, "difRaiting");
  dif.innerHTML = generateDificulty(difficulty);
  difContainer.appendChild(dif);
  div.appendChild(difContainer);

  //Builds
  var buildContainer = document.createElement("div");
  var buildTitle = document.createElement("h2");
  var buildSrc = document.createElement("p");
  buildTitle.innerText = "Talente:";

  TalentsName = buildsTitle;
  TalentsString = buildsString;

  buildContainer.appendChild(buildSrc);
  buildContainer.appendChild(buildTitle);
  TalentsName.forEach((element, index) => {
    buildContainer.appendChild(generateBuilds(element, index));
  });
  div.appendChild(buildContainer);

  //WeakAura
  var weakContainer = document.createElement("div");
  var weakP = document.createElement("p");
  var WeakA = document.createElement("a");
  WeakA.href = waLink;
  WeakA.text = "Link zu Wago.io";
  WeakA.target = "_blank";
  weakP.innerText = "Weakaura: ";
  weakP.classList.add("difRaiting");
  weakContainer.appendChild(weakP);
  weakP.appendChild(WeakA);
  div.appendChild(weakContainer);

  //Spawn Element
  document.getElementById("BigContainer").appendChild(div);
}

//generate difficulty raiting
function generateDificulty(difficulty) {
  var text = "";
  let i = 0;
  while (i < difficulty) {
    text = text + difficultyIcon0;
    i++;
  }
  while (i < MaxDifficulty) {
    text = text + difficultyIcon1;
    i++;
  }
  return prefix + text;
}

//generate Talent div,label,input and Buttons
function generateBuilds(name, index) {
  var talentBox = document.createElement("div");
  var talentBox0 = document.createElement("div");
  var talentBox1 = document.createElement("div");
  var talentBox2 = document.createElement("div");

  //style
  talentBox.classList.add("flexrow");
  talentBox0.classList.add("lowlex");
  talentBox1.classList.add("highflex");
  talentBox2.classList.add("lowlex");
  //label
  var talentLabel = document.createElement("label");
  talentLabel.textContent = name;
  talentBox0.appendChild(talentLabel);
  //input
  var talentInput = document.createElement("input");
  talentInput.id = "copyBtn" + createButtonID();
  talentInput.classList.add("talentCode");
  talentInput.type = "text";
  talentInput.value = TalentsString[index];
  talentBox1.appendChild(talentInput);

  //Button
  var talentBtn = document.createElement("button");
  talentBtn.setAttribute("onclick", "copy('" + talentInput.id + "')");
  talentBtn.innerText = "kopieren";
  talentBox2.appendChild(talentBtn);
  //complete
  talentBox.appendChild(talentBox0);
  talentBox.appendChild(talentBox1);
  talentBox.appendChild(talentBox2);
  return talentBox;
}
