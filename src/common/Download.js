const { dialog } = window.require('electron').remote
export function downloadFile(path, fileName, sftp) {
    dialog.showSaveDialog(null, {
        defaultPath: fileName
    }, (name, bookMark) => {
        sftp.fastGet(path, name , {}, function(downloadError){
            if(downloadError) throw downloadError;
            console.log("Succesfully uploaded");
        });
    })
}