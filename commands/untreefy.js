let fs=require("fs");
let path=require("path");
let uniqid=require("uniqid");
function checkPathisDirectoryorNot(src){
    let ans=fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src){
    let childrens=fs.readdirSync(src);
    return childrens;
}

function untreefy(src,dest,node){
    let isFile=checkPathisDirectoryorNot(src);
    if(isFile==true){
        let newFileName=uniqid();
        let destPath=path.join(dest,newFileName);
        fs.copyFileSync(src,destPath);
        node.oldName=path.basename(src);
        node.newName=newFileName;
        node.isFile=true;
    }else{
        node.name=path.basename(src);
        node.isFile=false;
        node.children=[];

        let childrens=childrenReader(src);
        for(let i=0;i<childrens.length;i++){
            let cpath=path.join(src,childrens[i]);
            let chobj={};
            untreefy(cpath,dest,chobj);
            node.children.push(chobj);
        }
    }
}

let root={};

untreefy(process.argv[2],process.argv[3],root);
fs.writeFileSync(path.join(process.argv[3],"metadata.json"),JSON.stringify(root));