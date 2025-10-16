let instructions = "sub add ldi cpy and nor xor rsh".split(" ");
function assemble(assembly){
    let c = `\n${assembly}`.split("\n");
    console.log(` c: ${c}`);
    let code = [];
    for(let i = 0; i < c.length; i++){
        c[i] = c[i].trim();
        if(c[i] != "" && !(c[i].startsWith("/") | c[i].startsWith("#"))){
            code.push(c[i]);
        }
    }

    console.log(` c: ${c}`);
    console.log(` code: ${code}`);

    let out = "";
    // for(let i = 0; i < code.length; i++){ // large instruction ROM edition
    for(let i = 0; i < 8; i++){

        let instr = code[i].split(" ");
        let op = instr[0];
        let a = instr[1].replace(/\D/g,'');
        let b = instr[2].replace(/\D/g,'');

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