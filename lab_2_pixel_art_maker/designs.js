  let color = document.getElementById("colorPicker").value;
  let button = document.getElementById("submit");
  let size = document.getElementById("sizePicker");
  let canvas = document.getElementById("pixelCanvas");

 size.addEventListener("submit",  function(event){
   event.preventDefault();
   makeGrid();
})

function makeGrid() {
  let height = document.getElementById('inputHeight').value;
  let width = document.getElementById("inputWidth").value;
  canvas.innerHTML="";


  var table = document.createElement('table');
  for (let r = 0; r < height; r++) {
    let newRow = document.createElement('tr');
    	for (let c = 0; c < width; c++) {
        let newCell = document.createElement('td');
        newRow.appendChild(newCell)
    }
    table.appendChild(newRow);

  }
  canvas.appendChild(table);
}

  $(canvas).on("click", "td", function() {
    $(this).css("backgroundColor",$("#colorPicker").val());
  })
  $(canvas).on("click", "td", function() {
    $(this).css("backgroundColor",$("white"));
  })
