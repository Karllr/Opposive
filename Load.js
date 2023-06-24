function Load(set, map) {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            var id = map[i][j];
            switch (id) {
                //Ying
                case '1':
                    player.x = j * 50;
                    player.y = i * 50;
                    player.respawn.x = j * 50;
                    player.respawn.y = i * 50;
                break;
                case 'B':
                    set.push(new Block(j*50,i*50, "block", "black"));
                break;
                case 'T':
                    set.push(new Block(j*50,i*50, "trampoline", "black"));
                break;
                case 'P':
                    set.push(new Block(j*50,i*50, "portal", "black"));
                break;
                case 'X':
                    set.push(new Block(j*50,i*50, "death", "black"));
                break;
                //Yang
                case '2':
                    player.x2 = j * 50+30;
                    player.y2 = i * 50;
                    player.respawn.x2 = j * 50+30;
                    player.respawn.y2 = i * 50;
                break;
                case 'W':
                    set.push(new Block(j*50,i*50, "block", "white"));
                break;
                case 't':
                    set.push(new Block(j*50,i*50, "trampoline", "white"));
                break;
                case 'p':
                    set.push(new Block(j*50,i*50, "portal", "white"));
                break;
                case 'x':
                    set.push(new Block(j*50,i*50, "death", "white"));
                break;
            }
        }
    }
}
function Erase(set) {
    set.length = 0;
}