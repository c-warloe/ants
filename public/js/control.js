function compileCode(){
    terminal.setValue("Compiling...\n");
    terminal.gotoLine(2);
    clearInterval(tickInterval);
    document.getElementById("runButton").innerHTML = "Run";
    var result = compile(editor.getValue());
    if(result[0]){
        terminal.insert("Colony '" + result[2] + "' successfully compiled (" + result[1]+")\n");
        terminal.insert(compileInstructions);
        compiledProgram = result;
        sw = new StudentWorld();
        sw.init(compiledProgram,cpuProgram,cpuProgram,cpuProgram);
    	sw.draw();
    }else{
        terminal.insert("ERROR (Line "+result[1]+"): "+result[2]+"\n");
    }
    terminal.clearSelection();
}

function runSimulation(){
    var button = document.getElementById("runButton");
    if(button.innerHTML === "Run"){
        terminal.setValue("Running Colony '" + compiledProgram[2] + "'...\nPress 'Pause' to stop the simulation\nPress 'Compile' to reset the simulation");
        tickInterval = setInterval(function(){
            if(sw.ticks === 2000) {
                clearInterval(tickInterval)
                return;
            }
            sw.move();
            sw.draw();
        }, 50);
        button.innerHTML = "Pause";
    }else{
        terminal.setValue("Paused Colony '" + compiledProgram[2] + "'...\nPress 'Run' to resume the simulation\nPress 'Compile' to reset the simulation");
        clearInterval(tickInterval);
        button.innerHTML = "Run";
    }
    terminal.clearSelection();
}

function exportFile(){
    var tempFile = document.createElement('a');
    var source = editor.getValue();
    var title = parseColonyName(source.split('\n')[0]);
    if(title.length < 1){
        title = "untitled"
    }
    title += ".bug";
    tempFile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(source));
    tempFile.setAttribute('download', title);
    tempFile.style.display = 'none';
    document.body.appendChild(tempFile);
    tempFile.click();
    document.body.removeChild(tempFile);
}

function submitProgram(){
    alert("Submit");
}

function leftField(){
    clearInterval(tickInterval);
    var button = document.getElementById("runButton");
    button.innerHTML = "Run";
    field_index = (field_index == 0)?fields.length-1: field_index-1;
    sw = new StudentWorld();
    sw.init(compiledProgram,cpuProgram,cpuProgram,cpuProgram);
    sw.draw();
}

function rightField(){
    clearInterval(tickInterval);
    var button = document.getElementById("runButton");
    button.innerHTML = "Run";
    field_index++;
    sw = new StudentWorld();
    sw.init(compiledProgram,cpuProgram,cpuProgram,cpuProgram);
    sw.draw();
}

function addField(evt){
    var reader  = new FileReader();
    reader.addEventListener("load", function () {
        clearInterval(tickInterval);
        var button = document.getElementById("runButton");
        button.innerHTML = "Run";
        var f = atob(reader.result.substring(23));
        var fl = "";
        for(var i = 0; i < f.length; i++){
            if(f[i] != "\n")
                fl += f[i];
        }
        let invalid = (fl.length !== 4096);
        if(invalid){
            swal({
                title: "Invalid Map",
                text: `The map file contains ${fl.length} cells. It needs to contain exactly 4096 cells.`,
                type: "error",
                confirmButtonText: "Got it."
            }).then(function(){
                compileCode();
            });
        }
        for(var i = 0; i < 64 && !invalid; i++){
            if(!(fl[i]=='*' && fl[64*i] == '*' && fl[64*i+63] == '*' && fl[64*63 + i] == '*')){
                invalid = true;
                swal({
                    title: "Invalid Map",
                    text: `The edges of the map need to be filled with pebbles.`,
                    type: "error",
                    confirmButtonText: "Got it."
                }).then(function(){
                    compileCode();
                });
            }
        }
        for(var i = 0; i < fl.length && !invalid; i++){
            if(!"*g0123wpf ".includes(fl[i])){
                invalid = true;
                swal({
                    title: "Invalid Map",
                    text: `We didn't recognize '${fl[i]}' :( The map can only include *, 0, 1, 2, 3, g, w, p, f, and spaces.`,
                    type: "error",
                    confirmButtonText: "Got it."
                }).then(function(){
                    compileCode();
                });
            }
        }
        if(!invalid){
            fields.push(fl);
            field_index = fields.length-1;
            sw = new StudentWorld();
            sw.init(compiledProgram,cpuProgram,cpuProgram,cpuProgram);
            sw.draw();
        }
        
    }, false);

    if (file) {
        reader.readAsDataURL(evt.target.files[0]);
    }
}

function changeCode(evt){
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        clearInterval(tickInterval);
        var button = document.getElementById("runButton");
        button.innerHTML = "Run";
        console.log(reader.result);
        var f = atob(reader.result.substring(13));
        editor.setValue(f);
        sw = new StudentWorld();
        sw.init(compiledProgram,cpuProgram,cpuProgram,cpuProgram);
        sw.draw();
    }, false);

    if (file) {
        reader.readAsDataURL(evt.target.files[0]);
    }
}
document.getElementById("file").addEventListener('change', addField, false);
document.getElementById("code").addEventListener('change', changeCode, false);