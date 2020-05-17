let fs=require("fs");
let path=require("path");

module.exports.view=function(){
    let src=arguments[0];
    let mode=arguments[1];

    if(mode=="-t"){
        viewAsTree(src,"");
    }
    else if(mode=="-f"){
        viewAsFlatFile(src,path.basename(src));
    }else{
        console.log("Wrong mode");
    }
}
function checkPathisDirectoryorNot(src){
    let ans=fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src){
    let childrens=fs.readdirSync(src);
    return childrens;
}

function viewAsFlatFile(src,toprint){
    let isFile=checkPathisDirectoryorNot(src);
    if(isFile==true){
        console.log(toprint+"*");
    }else{
        console.log(toprint);
        let childrens=childrenReader(src);
        for(let i=0;i<childrens.length;i++){
            let child=childrens[i];
            let childpath=path.join(src,child);
            viewAsFlatFile(childpath,path.join(toprint,child));
        }
    }


}

function viewAsTree(src,indent){
    let isFile=checkPathisDirectoryorNot(src);
    if(isFile==true){
        console.log(indent+path.basename(src)+"*");
    }else{
        console.log(indent+path.basename(src));
        let childrens=childrenReader(src);
        for(let i=0;i<childrens.length;i++){
            let child=childrens[i];
            let childpath=path.join(src,child);
            viewAsTree(childpath,indent+"\t");
        }
    }

}