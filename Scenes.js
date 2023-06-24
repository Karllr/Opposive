
var scene = {
    block: [],
    block2: [],
    blockSpeed: 20,
    scalar:0,
    antiScale:2,
    trans:1000,
    prepare: function () {
        for (var i = 0; i < 10; i++) {
            this.block.push(i * -220);
            this.block2.push(i * 220);
        }
    },
    BG: function () {
        blendMode(BLEND);
        background(255);
        fill(20);
        beginShape();
        noStroke();
        vertex(blendPoints[0][0], height / 2 + 0.2 * cos(frameCount / 100) * (width / 2 - blendPoints[0][1]));
        vertex(blendPoints[1][0], height / 2 + -0.2 * cos(frameCount / 100) * (width / 2 - blendPoints[1][1]));
        vertex(blendPoints[2][0], blendPoints[2][1]);
        vertex(blendPoints[3][0], blendPoints[3][1]);
        endShape();
    },
    //Menu: function () { },
    Game: function () {
        push();
        translate(width / 2, height / 2);
        translate(-level.width / 2, -level.height / 2);
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].update();
            blocks[i].sho();
        }

        level.height = worldMap[level.value].length * 50;
        for (var i = 0; i < worldMap[level.value].length; i++) {
            level.width = worldMap[level.value][i].length * 50;
        }
        player.update(blocks);
        player.sho();
        pop();
        if (player.hitPortal && player.hitPortal2) {
            level.value++;
            Erase(blocks);
            Load(blocks, worldMap[level.value]);
            player.yvel = 0;
            player.yvel2 = 0;
            player.hitPortal = false;
            player.hitPortal2 = false;
        }
        if (level.value > worldMap.length - 2) {
            this.Ending();
         }
    },
    Ending: function () {
        push();
        translate(width / 2, height / 2);
        scale(this.scalar);
        textFont(font, 50);
        textAlign(CENTER, CENTER);
        text("Opposive", 20 * sin(frameCount / 100)+this.trans, - 100);
        fill(255);
        text("Aequor Team", 20 * sin(frameCount / 100 - 2*PI/3)-this.trans, + 100);
        text("Reload to play again", 20 * sin(frameCount / 100 - 4*PI/3)-this.trans, + 210);
        pop();
        push();
        translate(width / 2, height / 2);
        scale(this.blockSpeed);
        rotate(-PI / 8);
        fill(20);
        for (var i = 0; i < this.block.length; i++) {
            rect(this.block[i] - width / 2, 10 - height / 2, 200, 200);
            this.block[i] += this.blockSpeed * 3 / this.blockSpeed;
            if (this.block[i] > width) {
                this.block[i] = -200;
            }
        }
        
        for (var i = 0; i < this.block2.length; i++) {
            fill(255);
            rect(this.block2[i] - width / 2, height - 210 - height / 2, 200, 200);
            this.block2[i] -= this.blockSpeed * 3 / this.blockSpeed;
            if (this.block2[i] < -200) {
                this.block2[i] = width + 200;
            }
        }
        pop();
        this.trans=lerp(this.trans,0,0.05);
        this.scalar=lerp(this.scalar,this.antiScale,0.05);
        this.antiScale=lerp(this.antiScale,1,0.05);
        this.blockSpeed = lerp(this.blockSpeed, 1, 0.1);
    },
};