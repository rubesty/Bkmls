var nhdl_param={
    title: ''
};

function nhdl_sel(){
    var d=document.createElement("div");
    d.style="height:100px;width:100%;";
    document.body.insertBefore(d, document.body.firstChild);
    
    var e=document.createElement("div");
    e.style="height:100px;width:100%;position:fixed;left:0;top:0;background-color:black;opacity:0.8;z-index:100";
    e.innerHTML= "<div>"
            + "s=<input id='a' type='text' size=5/> "
            + "e=<input id='b' type='text' size=5/> "
            + "<button onclick=nhdl_open()>submit</button>"
            + "</div>"
            + "<div id='srchbox'></div>"
            + "<div id='subbox'></div>";
    document.body.insertBefore(e,d);

    const then_nhdl_getTitle=(title)=>{
        let e=document.getElementById("srchbox");
        title.split(/[\[\]\(\)]+/).forEach(str => {
            if(!str)return;
            e.innerHTML+='　<a href="'+argurl+'?dec=on&mode=srch&word='
                       +encodeURIComponent(str)+'" target="_blank">'
                       +str+'</a>';
        });
        nhdl_param.title = title;
    }
    if(/g\/\d+\/\d+/.test(location.pathname)){
        nhdl_getTitleByUrl('../').then(then_nhdl_getTitle);
    }else{
        then_nhdl_getTitle(nhdl_getTitleByDom())
    }
}

function nhdl_open(){
    var s=argurl+"?dec=on&mode=ins&url=";
        s += encodeURIComponent(location.pathname);
    var rs=document.getElementById('a').value;
    var re=document.getElementById('b').value;
    if(rs || re){
        s+="&rs="+rs+"&re="+re;
    }
    s+="&tit="+encodeURIComponent(nhdl_param.title);
    var a;
    if(!(a=document.getElementById("sub_anc"))){
        a = document.createElement("a");
        a.id = "sub_anc";
        a.target = '_blank';
        a.innerText = "Click to store!!";
        a.style = "margin: 20px 0px 20px 0px";
        a.href = s;
        document.getElementById('subbox').appendChild(a);
    }else{
        a.href = s;
    }
}

const nhdl_getTitleByDom = (doc=null)=>{
    let t;
    if(doc){
        t = doc.getElementsByClassName('title');
    }else{
        t = document.getElementsByClassName('title');
    }
    if(t.length==0){
        return "notitle"
    }else if(t.length==1){
        return t[0].innerText;
    }else{
        if(t[0].tagName=='H2'){
            return t[0].innerText;
        }else{
            return t[1].innerText;
        }
    }
}

const nhdl_getTitleByUrl = async(url)=>{
    const res = await fetch(url);
    const data = await res.text();
    const doc = new DOMParser().parseFromString(data,'text/html');
    return nhdl_getTitleByDom(doc);
}

//nhdl_sel();
argurl = 'http://hogehoge/'