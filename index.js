//form validations etc etc
//autocomplete date
document.getElementById('input-date').valueAsDate = new Date();
//decimal point for amounts
const inputPrice = document.getElementById('input-price');
inputPrice.onchange = (e)=>{
    let el = e.target;
    el.value = el.value.replace(/[\s,₱]/g, '').trim();
    let elValue = parseFloat(el.value);
    if(Number.isNaN(elValue)){
        el.value = "";
        return;
    }else{
        el.value = "₱"+((parseFloat(elValue).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }   
}
//submit new entry
const formDiv = document.getElementById('entry-div');
formDiv.onsubmit =(e)=>{
    e.preventDefault();
    if(!confirm("Would you like to confirm?")){
        return;
    }
    let formData = {
        chequeNo: parseInt(formDiv.elements[0].value),
        desc: formDiv.elements[1].value,
        name: formDiv.elements[2].value,
        amount: parseFloat((formDiv.elements[3].value).replace(/[\s,₱]/g, '').trim()),
        voucherNo: parseInt(formDiv.elements[4].value),
        date: formDiv.elements[5].value,
        valid: 0
    }
    for(let i = 0; i <formDiv.elements.length; i++){
        formDiv.elements[i].value = '';
    }
    document.getElementById('input-date').valueAsDate = new Date();
    tableData.push(formData);

    //FUNCTION HERE TO SUBMIT THE TABLEDATA INTO DATABASE
    console.log(formData);
}


const refreshBtn = document.getElementById('refresh-btn');
let tableData = [
    {
        amount: 1123,
        chequeNo: 112002,
        date: "2023-11-15",
        desc: "Test",
        name: "Marilou",
        valid: 0,
        voucherNo: 121212,
    }
];
refreshBtn.onclick = () =>{

    //FUNCTION TO LOAD DATA FROM DATABASE
    loadTable(tableData);
}

function loadTable(data){
    const dataDiv = document.getElementById('data-div');
    while (dataDiv.hasChildNodes()) dataDiv.removeChild(dataDiv.lastChild);
    for(let i = data.length - 1; i>=0; i--){
        const chequeNo = document.createElement('input');
        const desc = document.createElement('input');
        const name = document.createElement('input');
        const amount = document.createElement('input');
        const voucherNo = document.createElement('input');
        const date = document.createElement('input');
        const valid = document.createElement('div');
        chequeNo.classList.add("num-input");
        desc.classList.add("text-input");
        name.classList.add("text-input");
        amount.classList.add("num-input");
        voucherNo.classList.add("num-input");
        date.classList.add("num-input");
        valid.classList.add("pending");

        chequeNo.value = data[i].chequeNo;
        desc.value = data[i].desc;
        name.value = data[i].name;
        amount.value = "₱"+((parseFloat(data[i].amount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        voucherNo.value = data[i].voucherNo;
        date.value = (data[i].date).replace(/^([^,]+)- ?([^ ]+)- ?([^ ]+).*$/, "$2-$3-$1");

        const tableDiv = document.createElement('div');
        tableDiv.classList.add('table-div')

        const checkbox = document.createElement('input');
        checkbox.setAttribute("type","checkbox");
        if(data[i].valid){
            checkbox.setAttribute("checked", true);
            checkbox.setAttribute("disabled", true);
        }
        checkbox.onclick = () =>{
            if(!confirm("Would you like to confirm?")){
                return;
            }
            console.log(data[i].chequeNo);
            checkbox.setAttribute("disabled", true);
        }
        valid.appendChild(checkbox);

        tableDiv.appendChild(chequeNo);
        tableDiv.appendChild(desc);
        tableDiv.appendChild(name);
        tableDiv.appendChild(amount);
        tableDiv.appendChild(voucherNo);
        tableDiv.appendChild(date);
        tableDiv.appendChild(valid);
        for(let i = 0; i <tableDiv.childNodes.length - 1; i++){
            tableDiv.childNodes[i].setAttribute("readonly", true)
        }
        dataDiv.appendChild(tableDiv);
    }
}

//GET DATA FROM DATABASE
function getData(){
    //code to retrieve database items
    //placeholder
    const tempTable = tableData;
    return tempTable;
}
//sort buttons
const sortCheque = document.getElementById("cheque-no-btn");
sortCheque.onclick = () =>{
    let toSort = getData();
    toSort.sort((a,b)=>{return a.chequeNo - b.chequeNo});
    loadTable(toSort);
}

const sortDesc = document.getElementById("description-btn");
sortDesc.onclick = () =>{
    let toSort = getData();
    toSort.sort((a,b)=>{
        const nameA = a.desc.toUpperCase();
        const nameB = b.desc.toUpperCase();
        if (nameA < nameB) {
            return -1;
         }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    loadTable(toSort);
}

const sortName = document.getElementById("name-btn");
sortName.onclick = () =>{
    let toSort = getData();
    toSort.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
         }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    loadTable(toSort);
}

const sortAmount = document.getElementById("amount-btn");
sortAmount.onclick = () =>{
    let toSort = getData();
    toSort.sort((a,b)=>{return a.amount - b.amount});
    loadTable(toSort);
}

const sortVoucher = document.getElementById("voucher-btn");
sortVoucher.onclick = () =>{
    let toSort = getData();
    toSort.sort((a,b)=>{return a.voucherNo - b.voucherNo});
    loadTable(toSort);
}

const sortDate = document.getElementById("date-btn");
sortDate.onclick = () =>{
    let toSort = getData();
    loadTable(toSort);

}

const sortValid = document.getElementById("valid-btn");
sortValid.onclick = () =>{
    let toSort = getData();
    toSort.sort((a,b)=>{return a.valid - b.valid});
    loadTable(toSort);
}

//build function to GET THE TABLE DATA THEN LOAD IT IN
loadTable(tableData);