function redirect_market(){
  window.location.href = "/market";
}

function redirect_entrance(){
  if (confirm("Veux-tu vraiment quitter le marché ?")) {
    window.location.href = "/entrance";
  }
}

function quit(){
  window.location.href = "/entrance";
}

function redirect_stand_fruits(id_elv){
  window.location.href = "/stand_fruits/" + id_elv;
}

function redirect_stand_fleurs(id_elv){
  window.location.href = "/stand_fleurs/" + id_elv;
}

function redirect_stand_legumes(id_elv){
  window.location.href = "/stand_legumes/" + id_elv;
}

function redirect_stand_final(){
  window.location.href = "/stand_final";
}

let form_mdp = document.getElementById("form_mdp");

function redirect_recap(){
  if (form_mdp.style.visibility === "hidden"){
    form_mdp.style.visibility = "visible";
  } else {
    form_mdp.style.visibility = "hidden";
  }
}

function delete_eleve(id){
  window.location.href = "/delete_eleve/" + id;
}

function connect_eleve(id){
  window.location.href = "/connect_eleve/" + id;
}

let select = document.getElementById("select");
select.addEventListener('input', refresh_list);

function refresh_list(e){
  window.location.href = "/recap/" + select.value;
}

let input_edit = document.getElementById("input_edit");
function edit_mdp(){
  window.location.href = "/input_edit/" + input_edit.value;
}