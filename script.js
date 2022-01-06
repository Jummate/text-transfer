let save = document.getElementById("save");
let entry = document.getElementById("entry");
let peek = document.querySelector(".peek-icon");
let closeOverlay = document.querySelector("#close");
let overlay = document.querySelector("#overlay");
let descriptionContainer = document.querySelector("#ctn-description");
let clear = document.getElementById("clear");
let description = document.getElementById("description");
let successMsg = document.getElementById("success-msg");
let errorMsg = document.getElementById("error-msg");
let table = document.querySelector("table");
//let count: number = 0;
// const controlSerialNumber = (numOfItems: number) : void => {
//     let serialNum = document.querySelectorAll(".serialNum") as any;
//     console.log(numOfItems)
//     console.log(serialNum)
//     if (serialNum.length) {
//         for (let x: number = 0; x < numOfItems; x++) {
//             console.log(x);
//             console.log(serialNum[x])
//             serialNum[x].textContent = "" + (x + 1);
//         }
//     }
// }
const getTimeStamp = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    let period = date.getHours() >= 12 ? "pm" : "am";
    let today = days[date.getDay()];
    return `${today} ${day}/${month}/${year} ${hour}:${minute}${period}`;
};
const pagination = (dataSource, pageWidth = 2) => {
    let paginationContainer = document.querySelector("#paginationContainer");
    let pageNumHolder = document.querySelector("#pageNumHolder");
    let next = document.querySelector("#next");
    let prev = document.querySelector("#prev");
    let tableBody = document.querySelector("tbody");
    if (dataSource.length < 1) {
        //     //$("#addNew").trigger("click");
        //     //swal("Hellooooooo")
        //     bootbox.confirm({
        //         message:"You are welcome",
        //         buttons:{
        //             confirm:{
        //                 label: 'OK',
        //                 className: 'btn-success'
        //             },
        //             cancel:{
        //                 label: 'Cancel',
        //                 className: 'btn-danger'
        //             },
        //         },
        //         callback: function(result:string){
        //             if(result){
        //                 console.log(20*11);
        //             }
        //         },
        //         backdrop:false,
        //         centerVertical : true
        //     });
        return;
    }
    paginationContainer.style.display = "initial";
    let pageNum = dataSource.length;
    let pNum = 0;
    let pageLength = Math.ceil(pageNum / pageWidth);
    let count = 0;
    function computePageLength() {
        pageNumHolder.innerHTML = "";
        for (let x = 1; x <= pageLength; x++) {
            pageNumHolder.innerHTML += `<button type="button" class="pageNavButton">${x}</button>`;
        }
    }
    function forwardPage() {
        count++;
        pNum += pageWidth;
        let max = pNum + pageWidth;
        if (max >= pageNum) {
            max = (pageNum - pNum) + pNum;
            next.style.display = "none";
        }
        else {
            next.style.display = "inline";
        }
        if (pNum > 0) {
            prev.style.display = "inline";
        }
        else {
            prev.style.display = "none";
        }
        tableBody.innerHTML = "";
        for (let x = pNum; x < max; x++) {
            if (dataSource[x].user_text != "") {
                tableBody.innerHTML += createRow(dataSource[x]);
                let serialNumTag = tableBody.children[tableBody.children.length - 1].children[0];
                serialNumTag.textContent = x + 1;
            }
        }
        let copyIcon = document.querySelectorAll(".copy-icon");
        new ClipboardJS(copyIcon);
        for (let x = 0; x < pageLength; x++) {
            if (x == count) {
                pageNumHolder.children[x].classList.add("pageButton");
            }
            else {
                pageNumHolder.children[x].classList.remove("pageButton");
            }
        }
    }
    function reversePage() {
        count--;
        let min = pNum;
        pNum -= pageWidth;
        if (pNum > 0) {
            next.style.display = "inline";
            prev.style.display = "inline";
        }
        else {
            next.style.display = "inline";
            prev.style.display = "none";
            pNum = 0;
        }
        if (pNum >= 0) {
            tableBody.innerHTML = "";
            for (let x = pNum; x < min; x++) {
                if (dataSource[x].user_text != "") {
                    tableBody.innerHTML += createRow(dataSource[x]);
                    let serialNumTag = tableBody.children[tableBody.children.length - 1].children[0];
                    serialNumTag.textContent = x + 1;
                }
            }
            let copyIcon = document.querySelectorAll(".copy-icon");
            new ClipboardJS(copyIcon);
        }
        for (let x = 0; x < pageLength; x++) {
            if (x == count) {
                pageNumHolder.children[x].classList.add("pageButton");
            }
            else {
                pageNumHolder.children[x].classList.remove("pageButton");
            }
        }
    }
    prev.style.display = "none";
    pageLength < 2 ? next.style.display = "none" : next.style.display = "inline";
    tableBody.innerHTML = "";
    for (let x = pNum; x < pageWidth; x++) {
        if (dataSource[x].user_text != "") {
            tableBody.innerHTML += createRow(dataSource[x]);
            let serialNumTag = tableBody.children[tableBody.children.length - 1].children[0];
            serialNumTag.textContent = x + 1;
        }
    }
    let copyIcon = document.querySelectorAll(".copy-icon");
    new ClipboardJS(copyIcon);
    computePageLength();
    pageNumHolder.children[0].classList.add("pageButton");
    next.addEventListener("click", () => {
        forwardPage();
    });
    prev.addEventListener("click", () => {
        reversePage();
    });
    pageNumHolder.addEventListener("click", (event) => {
        for (let elem of event.target.parentNode.children) {
            if (elem == event.target) {
                elem.classList.add("pageButton");
            }
            else {
                elem.classList.remove("pageButton");
            }
        }
        pNum = (pageWidth * (Number(event.target.textContent) - 1));
        count = Number(event.target.textContent) - 1;
        let max = pNum + pageWidth;
        if (max >= pageNum) {
            max = (pageNum - pNum) + pNum;
            next.style.display = "none";
        }
        else {
            next.style.display = "inline";
        }
        if (pNum > 0) {
            prev.style.display = "inline";
        }
        else {
            prev.style.display = "none";
        }
        tableBody.innerHTML = "";
        for (let x = pNum; x < max; x++) {
            if (dataSource[x].user_text != "") {
                tableBody.innerHTML += createRow(dataSource[x]);
                let serialNumTag = tableBody.children[tableBody.children.length - 1].children[0];
                serialNumTag.textContent = x + 1;
            }
        }
        let copyIcon = document.querySelectorAll(".copy-icon");
        new ClipboardJS(copyIcon);
    });
};
const createRow = (subData) => {
    const { id, user_text, description, timestamp } = subData;
    let newRow = '<tr scope="row" class="tableRow">';
    let formattedTimestamp = timestamp.split(" ");
    formattedTimestamp = formattedTimestamp.join("<br>");
    newRow += '<td scope="col" class="serialNum"></td>';
    newRow += `<td data-clipboard-target = #${id} data-clipboard-action="copy" class="copy-icon"><i class="fa fa-copy" title="Copy Text"></i></td>`;
    // newRow += `<td scope="col" ><input type="text" id=${id} class="form-control textInput" readonly value=${user_text} /></td>`;
    newRow += `<td scope="col" ><textarea id=${id} class="form-control textInput" readonly >${user_text}</textarea></td>`;
    newRow += `<td scope="col">${description}</td>`;
    newRow += `<td scope="col">${formattedTimestamp}</td>`;
    newRow += `<td scope="col" class=${id}><i class="fa fa-trash deleteRow" title="Delete Row"></i></td>`;
    newRow += '</tr>';
    return newRow;
};
const populateTable = (data) => {
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    for (let x = data.length - 1; x >= 0; x--) {
        if (data[x].user_text) {
            tableBody.innerHTML += createRow(data[x]);
        }
    }
};
const addText = (event) => {
    event.preventDefault();
    if (entry.value) {
        let id = "ID" + Date.now();
        let timestamp = getTimeStamp();
        const data = JSON.stringify({ ID: id, text: entry.value, description: description.value, time_stamp: timestamp });
        const url = "http://localhost/text-transfer/api/text/create.php";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then((response) => {
            description.value = "";
            entry.value = "";
            //successMsg.style.display = "block";
            //successMsg.style.animation = "fadeOut 2s normal";
            const obj = {
                title: "Success",
                text: "Added Succesfully",
                icon: 'success',
                timer: 2000,
            };
            swal(obj);
            // setTimeout(() => {
            //     successMsg.style.display = "";
            // }, 1500);
        })
            .catch((error) => {
            const obj = {
                title: "Operation failed!",
                text: "Oops! An error occured!",
                icon: 'error',
                timer: 1000
            };
            swal(obj);
            console.log(error);
        });
    }
    else {
        const obj = {
            title: "Error!",
            text: "You must enter some text to be saved!",
            icon: 'error',
            timer: 2000
        };
        swal(obj);
        // errorMsg.style.display = "block";
        // errorMsg.style.animation = "fadeOut 2s normal";
        // setTimeout(() => {
        //     errorMsg.style.display = "";
        // }, 2000);
    }
};
const searchText = () => {
    let searchKeyWords = document.querySelector("#search");
    if (searchKeyWords.value) {
        const data = JSON.stringify({ keywords: searchKeyWords.value });
        const url = "http://localhost/text-transfer/api/text/search.php";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.data.length > 0) {
                pagination(data.data);
                searchKeyWords.value = "";
                //successMsg.style.display = "block";
                //successMsg.style.animation = "fadeOut 2s normal";
                const obj = {
                    title: "Success",
                    text: "Search Successful",
                    icon: 'success',
                    timer: 2000,
                };
                swal(obj);
            }
            else {
                throw new Error();
            }
            // setTimeout(() => {
            //     successMsg.style.display = "";
            // }, 1500);
        })
            .catch((error) => {
            const obj = {
                title: "Operation failed!",
                text: "Oops! No results found!",
                icon: 'error',
                timer: 1000
            };
            swal(obj);
            console.log(error);
        });
    }
    else {
        const obj = {
            title: "Error!",
            text: "You must enter some text to be searched!",
            icon: 'error',
            timer: 2000
        };
        swal(obj);
        // errorMsg.style.display = "block";
        // errorMsg.style.animation = "fadeOut 2s normal";
        // setTimeout(() => {
        //     errorMsg.style.display = "";
        // }, 2000);
    }
};
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchText);
const getText = () => {
    const url = "http://localhost/text-transfer/api/text/read.php";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        //populateTable(data.data);
        pagination(data.data);
        //controlSerialNumber(Object.keys(data.data).length)
        // let copyIcon = document.querySelectorAll(".copy-icon");
        // new ClipboardJS(copyIcon);
    })
        .catch((error) => {
        const obj = {
            title: "Operation failed!",
            text: "Oops! An error occured!",
            icon: 'error',
            timer: 1000
        };
        swal(obj);
        console.log(error);
    });
};
let form = document.querySelector("#user-entry");
form.addEventListener("submit", addText);
peek.addEventListener("click", () => {
    overlay.style.display = "flex";
    descriptionContainer.style.zIndex = "-1";
    getText();
});
closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
    descriptionContainer.style.zIndex = "";
});
clear.addEventListener("click", () => {
    entry.value = "";
});
table.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteRow")) {
        let rowID = e.target.parentNode.getAttribute("class");
        // e.target.closest("tr").remove();
        const data = JSON.stringify({ ID: rowID });
        const url = "http://localhost/text-transfer/api/text/delete.php";
        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then((response) => {
            setTimeout(() => {
                getText();
                e.target.closest("tr").remove();
                const obj = {
                    title: "Success",
                    text: "Deleted successfully!",
                    icon: 'success',
                    timer: 1000
                };
                swal(obj);
            }, 1000);
            //return response.json()
        })
            .catch((error) => {
            const obj = {
                title: "Operation failed!",
                text: "Oops! An error occured!",
                icon: 'error',
                timer: 1000
            };
            swal(obj);
            console.log(error);
        });
    }
});
let slideRight = document.querySelector("#slideRight");
let slideLeft = document.querySelector("#slideLeft");
slideRight.addEventListener("click", () => {
    let textTable = document.querySelector("#text-table");
    textTable.scrollLeft += 100;
});
slideLeft.addEventListener("click", () => {
    let textTable = document.querySelector("#text-table");
    textTable.scrollLeft -= 100;
});
getText();
