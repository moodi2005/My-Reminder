let forms = document.querySelectorAll(".b-t>form");
let add_serch = document.querySelectorAll(".click");
add_serch.forEach((fer, index) => {
  fer.addEventListener("click", (e) => {
    forms[0].className = "hidden";
    forms[1].className = "hidden";
    forms[index].classList.toggle("hidden");
  });
  forms[index].addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
let Reminder_list = localStorage.getItem("Reminder")
  ? localStorage.getItem("Reminder")
  : false;
if (!Reminder_list) {
  let Reminder = [];
  localStorage.setItem("Reminder", JSON.stringify(Reminder));
}
Reminder_list = JSON.parse(Reminder_list);
function new_list(two) {
  let div_list = document.querySelector("#reminder");
  div_list.innerHTML = "";
  two.forEach((text, index) => {
    let div = document.createElement("div");
    div.className = "work";
    let icon = document.createElement("i");
    icon.className = "material-icons";
    icon.innerText = "delete";
    icon.addEventListener("click", (e) => {
      Reminder_list.splice(index, 1);
      localStorage.setItem("Reminder", JSON.stringify(Reminder_list));
      new_list(Reminder_list);
    });
    let paragraf = document.createElement("p");
    paragraf.innerText = `${index + 1}.${text.text}`;
    if (text.dash == "ture") {
      paragraf.style.textDecoration = "line-through";
    }
    paragraf.addEventListener("click", (e) => {
      text.dash = "ture";
      localStorage.setItem("Reminder", JSON.stringify(Reminder_list));
      new_list(Reminder_list);
    });
    div.append(paragraf);
    div.append(icon);
    div_list.append(div);
  });
}
if (Reminder_list[0]) {
  new_list(Reminder_list);
}
forms[0].addEventListener("submit", (e) => {
  if (forms[0].add.value) {
    Reminder_list.push({ text: forms[0].add.value, dash: "false" });
  }
  localStorage.setItem("Reminder", JSON.stringify(Reminder_list));
  forms[0].add.value = "";
  new_list(Reminder_list);
});
forms[1].addEventListener("keyup", e=> {
  let filter_rmider=Reminder_list.filter(Reminder_list =>Reminder_list.text.includes(forms[1].serch.value));
  console.log(filter_rmider)
  new_list(filter_rmider)
});