const XOFFSET = 20;

var reader = new FileReader();
var filename;
var eDropZone = document.getElementById('dropzone');
var srcCanvas = document.getElementById('srcCanvas');
var solvedCanvas = document.getElementById('solvedCanvas');

function inspectObject(o) {
    var retVal = new String();
    for ( property in o ) {
        retVal += property + ": " + o[property];
    }

    return retVal;
}

function isFileDragValid(e) {
    if (null != e.dataTransfer && 'undefined' != e.dataTransfer ) {
        if (e.dataTransfer.files.length > 0 ) {
            if (e.dataTransfer.files[0].name.split('.').pop() == 'json' ) {
                return true;
            }
        }
    }
    return false;
}

eDropZone.ondragover = function(e) {
    if ( isFileDragValid(e) ) {
        this.className = 'hover';
    }
    return false;
}

eDropZone.ondragleave = function(e) {
    this.className = '';
    return false;
}

eDropZone.ondragend = function(e) {
    this.className = '';
    return false;
}

eDropZone.ondrop = function(e) {
    e.preventDefault();
    eDropZone.ondragend(e);

    if ( isFileDragValid(e) ) {
        var f = e.dataTransfer.files[0];
        filename = f.name;
        downloadFile(f);
    }

}

function onFileUploaded(e) {
    console.log(filename + " downloaded:\n" + e.target.result);
    var solution = eval("(" + e.target.result + ")");
    render(solution);
}

function downloadFile(f) {
    var file = f;
    console.log("Downloading file: " + f.name);
    reader.onload = onFileUploaded;
    reader.readAsText(file);

}

function render(solution) {
    renderRectangles(srcCanvas.getContext('2d'), solution.sourceRectangles)
    renderRectangles(solvedCanvas.getContext('2d'), solution.rectangles)
}

function renderRectangles(ctx, rectArray) {
    var numRects = rectArray.length;
    console.log("Rendering %s rectangles", numRects);

    ctx.strokeStyle = "#00000";
    ctx.fillStyle = "#FFFFFF";

    for ( var i = 0; i < numRects; i++ ) {
        ctx.strokeRect(XOFFSET + rectArray[i].x, rectArray[i].y, rectArray[i].width, -rectArray[i].height);
    }
}