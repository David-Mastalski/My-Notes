const addBtn = document.querySelector('.menuButtons__button--add')
const deleteAllBtn = document.querySelector('.menuButtons__button--deleteAll')
const cancelBtn = document.querySelector('.panelButtons__button--cancel')

const notePanel = document.querySelector('.notePanel')
const noteArea = document.querySelector('.app__noteArea')
const error = document.querySelector('.notePanel__error')

let notes = []
const myNotes = JSON.parse(localStorage.getItem('myNotes'))

const handleTogglePanel = (value) => {
    value? notePanel.style.display = 'flex' : notePanel.style.display = 'none'
}

const checkForm = () => {
    const category = document.querySelector('#category')
    const textArea = document.querySelector('#noteContent')
    if(category.options[category.selectedIndex].value !== '0' && textArea.value !== ''){
        addNote(category.options[category.selectedIndex].value, textArea.value)
        category.selectedIndex = 0
        textArea.value = ""
        handleTogglePanel(false)
    }else{
        error.style.visibility = 'visible'
    }
}

const addNote = (category, content) => {
    const newNote = {
        "category": category,
        "content": content
    }
    notes.push(newNote)
    render(notes)
}

const render = (notes) => {
    noteArea.innerHTML = ''
    notes.forEach((note,index) => {
        createNote(note,index)
    });
    localStorage.setItem('myNotes', JSON.stringify(notes));
}

const createNote = ({category,content},id) => {
    const note = document.createElement('div')
    note.classList.add('note', `note--${category}`)

    const header = document.createElement('div')
    header.classList.add('note__header', 'noteHeader')

    const title = document.createElement('div')
    title.classList.add('noteHeader__title')
    title.innerText = `Notatka #${id+1}`

    const deleteNoteBtn = document.createElement('button')
    deleteNoteBtn.classList.add('noteHeader__deleteBtn')
    deleteNoteBtn.innerHTML = '<i class="fas fa-times icon"></i>'
    deleteNoteBtn.addEventListener('click', () => deleteNote(id))

    header.append(title,deleteNoteBtn)

    const body = document.createElement('div')
    body.classList.add('note__body')

    const noteContent = document.createElement('p')
    noteContent.classList.add('note__content')
    noteContent.innerText = content

    body.appendChild(noteContent)
    note.append(header,body)
    noteArea.appendChild(note)
}

const deleteNote = (noteIndex) => {
    notes.splice(noteIndex,1)
    render(notes)
}

const deleteAllNote = () => {
    notes.length = 0
    render(notes)
}

if(myNotes !== null){
    notes = [...myNotes]
    render(notes)
}

addBtn.addEventListener('click', () => handleTogglePanel(true))
cancelBtn.addEventListener('click', () => handleTogglePanel(false))
deleteAllBtn.addEventListener('click', deleteAllNote)
notePanel.addEventListener('submit', (e) => {
    e.preventDefault()
    checkForm()
})
