const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const itemClear=document.getElementById('clear');
const filter=document.getElementById('filter');
const formBtn=itemForm.querySelector('button');
let isEditMode=false;



function displayItems(){
    const itemsFromStorage=getItemFromStorage();

    itemsFromStorage.forEach(item=>addItemToDom(item))
    checkUI();
}



function addItem(e){
    e.preventDefault();
    const newItem=itemInput.value;
    //validate Input
    if(newItem.value==='')
    {
        alert('please add an Item');
        return;
    }
    //create item dom element

    if(isEditMode==true)
    {
      const itemToEdit=itemList.querySelector('.edit-mode')
      removeItemFromStoarge(itemToEdit.textContent);
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      isEditMode=false; 
    }
    else{
        if(checkIfItemExists(newItem)){
            alert('item aleardy exits'); 
            return ;
        }
    }
    
        addItemToDom(newItem);

        //add item to local storage
        addItemToStorage(newItem);
   
   

    checkUI();
    itemInput.value='';
}

function addItemToDom(item){
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button=createButton('remove-item btn-link text-red')
    li.appendChild(button);
    //add li to dom
    itemList.appendChild(li);

   
}

function addItemToStorage(item){
    let itemsFromStorage=getItemFromStorage() ;
    // if(localStorage.getItem('items')===null)
    // {
    //     itemsFromStorage=[];
    // }
    // else
    // {
    //     itemsFromStorage=JSON.parse(localStorage.getItem('item'))
    // }
    //ADD new item to array
  //  itemsFromStorage.push(item);
    itemsFromStorage.push(item);
    //Convert to JSON string and set to local storage
    localStorage.setItem('item',JSON.stringify(itemsFromStorage));
}


function getItemFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('item') === null)
    {
        itemsFromStorage=[];
    }
    else
    {
        itemsFromStorage=JSON.parse(localStorage.getItem('item'))
    }
    return itemsFromStorage;
}
function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item'))
    {
        removeItem(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item){
    const itemsFromStorage=getItemFromStorage();
    return itemsFromStorage.includes(item);
    
}


function setItemToEdit(item){
        isEditMode=true;
        itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));
        item.classList.add('edit-mode')
        formBtn.innerHTML='<i class="fa-solid fa-pen"></i>  Update item';
        formBtn.style.backgroundColor='#228822';
        itemInput.value=item.textContent;
}

function removeItem(item){
     if(confirm('Are You sure to delete item'))
     {
        //remove item dom
          item.remove();

          // reomeve form storage
        removeItemFromStoarge(item.textContent)
         checkUI();
     }

    // if(e.target.parentElement.classList.contains('remove-item')){
    //     if(confirm('Are You sure to delete item')){

    //         e.target.parentElement.parentElement.remove();
    //         checkUI();
    //     }
    // }
}


function removeItemFromStoarge(item){
    let itemsFromStorage=getItemFromStorage();

   //filter out item from storage

   itemsFromStorage=itemsFromStorage.filter((i)=>i!=item)

   // reset item to local stoarge
   localStorage.setItem('item',JSON.stringify(itemsFromStorage))
 }

function clearItem(){
    while(itemList.firstChild)
    {   
            itemList.removeChild(itemList.firstChild);   
    }
    localStorage.clear();
    checkUI();
}

function filterItems(e){
    const items=itemList.querySelectorAll('li');
    const text=e.target.value.toLowerCase();
    items.forEach((item)=>{
        const itemName=item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!=-1){
            item.style.display='flex'
        }
        else{
            item.style.display='none'
        }
    })
    
}
function checkUI(){
 
    const items=itemList.querySelectorAll('li');
  
    if(items.length===0){
            clear.style.display='none'
            filter.style.display='none'
    }
    else{
        clear.style.display='block'
            filter.style.display='block'
    }

    formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor="#333";
    isEditMode=false;
}

//initilize function

function intil(){

//Event Listeners
itemForm.addEventListener('submit',addItem);

itemList.addEventListener('click',onClickItem);

itemClear.addEventListener('click',clearItem);
 
filter.addEventListener('input',filterItems);

document.addEventListener('DOMContentLoaded',displayItems);
checkUI();
}

intil();