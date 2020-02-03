if ("BroadcastChannel" in self) {
    // BroadcastChannel API supported!
    console.log("BroadcastChannel API supported!");

    let addNote = document.querySelector("#add-note"),
        note = document.querySelector("#note"),
        notesList = document.querySelector("#lists");
    // Connect to the channel named "add_note".
    const addNoteChannel = new BroadcastChannel("add_note");

    addNote.onclick = function () {
        let noteValue = note.value;
        if (!noteValue.length) return void alert("Notes are required!");
        let li = document.createElement("li"),
            vl = document.createTextNode(noteValue);
        li.appendChild(vl);
        notesList.appendChild(li);
        // Send a message on "add_note".
        addNoteChannel.postMessage(noteValue);
    };

    // Listen for messages on "add_note".
    addNoteChannel.onmessage = function (e) {
        console.log("Received note", e.data);
        let li = document.createElement("li"),
            vl = document.createTextNode(e.data);
        li.appendChild(vl);
        notesList.appendChild(li);
    };
}
