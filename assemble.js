let instructions = "sub add ldi cpy and nor xor rsh".split(" ");


function assemble(assembly){
    let c = `\n${assembly}`.split("\n");
    
    let code = [];
    for(let i = 0; i < c.length; i++){
        c[i] = `${c[i]}`.trim();
        if(!(c[i].startsWith("/") | c[i].startsWith("#") | c[i] == "")){
            code.push(c[i]);
        }
    }

    let out = "";
    for(let i = 0; i < code.length; i++){

        let instr = `${code[i]}`.split(" ");
        let op = instr[0];
        let a = `${instr[1]}`.replace(/\D/g,'');
        let b = `${instr[2]}`.replace(/\D/g,'');

        let opcode = dec2bin(instructions.indexOf(op));
        opcode = toLength(opcode, 3);
        
        let A = dec2bin(a);
        A = toLength(A, 3);

        let B = dec2bin(b);
        B = toLength(B, 3);
        
        out += `${opcode}${A}${B}`;
    }

    return out;
}

function toLength(string, length){
    while(string.length < length){
        string = `0${string}`;
    }
    return string;
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function desemble(hexcode){
    let binaryString = parseInt(hexcode,16).toString(2);
    while(binaryString.length%9 != 0){
        binaryString = `0${binaryString}`;
    }

    let instr = commafy(binaryString).split(",");

    let out = "";

    for(let i = 0; i < instr.length; i+=3){
        out+=`${instructions[parseInt(instr[i],2)]} ${parseInt(instr[i+1],2)} ${parseInt(instr[i+2],2)}\n`;
    }

    return out;
}

function commafy(num) {
  num = num.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
  return num;
}
