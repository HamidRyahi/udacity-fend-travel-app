const buildTableFunc = () => {
  const firstRows = document.querySelector('.first_rows');
  const secondRows = document.querySelector('.second_rows');
  let firstRowsContent = '';
  let secondRowsContent = '';

  for (let i = 1; i <= 7; i++) {
    firstRowsContent = firstRowsContent + `<div class="date_row d${i}"></div>`;
    secondRowsContent = secondRowsContent + `
        <div class="weather_row w${i}">
        <img class="icon i${i}" src="">
        <hr>
        <div class="w${i}h${i}">
          <p class="w${i}h"></p>
          <hr>
          <p class="w${i}l"></p>
        </div>
        <hr>
      </div>`;
  }
  firstRows.innerHTML = firstRowsContent;
  secondRows.innerHTML = secondRowsContent;
}

export { buildTableFunc }
