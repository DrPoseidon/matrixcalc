const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableB = document.querySelector('.tableOfMatrixB');
const vertexValue = document.querySelector('.vertexInput');
const containerForG = document.querySelector('.container_for_G')
btnCreate.addEventListener('click', getValue);

function getValue() {
    const valueOfInput = vertexValue.value;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>-</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', outMatrixB);
    btnOutMatrix.addEventListener('click',outG)
}

function outMatrixB() {
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];
    let sumOfArcs;
    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
        arr[el] = arr[el].filter(Number);
    }
    sumOfArcs = [].concat(...arr);
    sumOfArcs = sumOfArcs.filter(Number);
    let lineMas = sumOfArcs.filter(Number);
    sumOfArcs = sumOfArcs.length; 

    let numberOfArcs = [];
    let iteration = 1;
    numberOfArcs = arr.map(el => {
        return el.map(() => {
            return iteration++;
        });
    })
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < sumOfArcs + 1; c++) {
            if (i === 0) { 
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; 
                }
                else {
                    th.textContent = c; 
                }
                tr.appendChild(th);
            }
            else { 
                if (c == 0) { 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    td.textContent = 0;
                    if (numberOfArcs[i - 1].indexOf(c) != -1) { 
                        td.textContent = -1;
                    }
                    else if (lineMas[c - 1] == i){
                        td.textContent = 1;
                    }

                    tr.appendChild(td);
                    
                }
            }
        }
        fragment.appendChild(tr); 
    }
    tableB.textContent = '';
    tableB.appendChild(fragment);
}

function outG(){
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];
    let arr1 = []
    let sumOfArcs;
    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
containerForG.textContent =''

for(let t=0;t<dataOfInputs.length;t++){
   for(let i=0;i<dataOfInputs.length;i++){
       for(let j=0;j<arr[i].length;j++){
           if(t+1==arr[i][j]){

                containerForG.innerHTML+="G<sup>+</sup>("+arr[i][j]+") = ["+(i+1)+"]<br>"
           }
       }
   }
}
}

