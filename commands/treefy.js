let path=require("path");
let fs=require("fs");

function treefy(src,dest,node){

    if(node.isFile==true){
        let srcpath=path.join(src,node.newName);
        let destPath=path.join(dest,node.oldName);
        fs.copyFileSync(srcpath,destPath);
    }else{
        let dirPath=path.join(dest,node.name);
        fs.mkdirSync(dirPath);
        let children=node.children;
        for(let i=0;i<children.length;i++){
            let child=children[i];
            let pPath=dirPath;
            treefy(src,pPath,child);
        }
    }
}

let src=process.argv[2];
let root=require(path.join(src,"metadata.json"));

treefy(process.argv[2],process.argv[3],root);