//--------------------- copy build script --------------------
function copy(Copyfield) {
  if (navigator.clipboard) {
    var CopyString = document.getElementById(Copyfield).value;
    navigator.clipboard.writeText(CopyString);
    alert("Code erfolgreich kopiert");
  } else {
    alert("Copy failed");
  }
}
//--------------------- hide Roles --------------------

function hideRoles(role, roleCheckBox) {
  var roleCheck = document.getElementById(roleCheckBox);
  var role = document.getElementsByClassName(role);
  Array.from(role).forEach((element) => {
    if (roleCheck.checked) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
}

function hideBySearch(search) {
  var spec = document.getElementsByClassName("ClassSpecTitle");
  console.log(search);
  Array.from(spec).forEach((element) => {
    if (element.innerText.toLowerCase().includes(search.toLowerCase())) {
      element.parentElement.style.display = "flex";
    } else {
      element.parentElement.style.display = "none";
    }
  });
}

//--------------------- generate Class div script --------------------
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
  SpecTitle,
  difficulty,
  waLink,
  buildsTitle,
  buildsString,
  classColor,
  role
) {
  var div = document.createElement("div");
  div.classList.add("ClassContainer", role);
  div.style.borderColor = classColor;

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
  dif.classList.add("difRaiting");
  dif.innerHTML = generateDificulty(difficulty);
  difContainer.appendChild(dif);
  div.appendChild(difContainer);

  //Builds
  var buildContainer = document.createElement("div");
  var buildTitle = document.createElement("h2");
  var buildSrc = document.createElement("label");
  buildContainer.classList.add("talentsBox");

  buildTitle.innerText = "Talente:";
  buildSrc.classList.add("buildSrc");
  buildSrc.innerHTML =
    "<a href='https://www.wowhead.com/'target='_blank'>by wowhead.com</a>";
  TalentsName = buildsTitle;
  TalentsString = buildsString;

  buildContainer.appendChild(buildTitle);
  buildContainer.appendChild(buildSrc);
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
  if (difficulty < 0 || difficulty > MaxDifficulty) {
    return prefix + "kommt in DF";
  }

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
  talentBox.classList.add("talentmargin");
  return talentBox;
}
