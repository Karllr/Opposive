var particles = [];
function PortalSystem(col, x, y) {
    noStroke();
    switch (col) {
        case "black":
            fill(0);
            break;
        case "white":
            fill(255);
            break;
    }
    ellipse(x, y, 20, 20);
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        circle(x + particles[i][0] - 25, y + particles[i][1] - 25, particles[i][2]);
        particles[i][0] = lerp(particles[i][0], 25, 0.01);
        particles[i][1] = lerp(particles[i][1], 25, 0.01);
        particles[i][2] = lerp(particles[i][2], 0, 0.01);
        if (dist(25, 25, particles[i][0], particles[i][1]) < 5) {
            particles.splice(i, 1);
            particles.push(
                [random(0, 50), random(0, 50), 5]
            );
        }
    }
}
function Block(x, y, type, type2) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.type2 = type2;
    this.Sz = 50;
    this.update = function () {
        // if(collideRectPoly(this.x,this.y,this.Sz,this.Sz,[
        //     {
        //         x:blendPoints[0][0],
        //         y:height/2+0.5*cos(frameCount/100)*(width/2-blendPoints[0][1])
        //     },
        //     {
        //         x:blendPoints[1][0],
        //         y:height/2+-0.5*cos(frameCount/100)*(width/2-blendPoints[1][1])
        //     },
        //     {
        //         x:blendPoints[2][0],
        //         y:blendPoints[2][1]
        //     },
        //     {
        //         x:blendPoints[3][0],
        //         y:blendPoints[3][1]
        //     },
        // ])){
        // }
    };
    this.sho = function () {
        strokeWeight(1);
        switch (this.type) {
            case "block":
                //blendMode(BLEND);
                switch (this.type2) {
                    case "black":
                        fill(0);
                        stroke(0);
                        rect(this.x, this.y, this.Sz, this.Sz);
                        noStroke();
                        fill(255);
                        ellipse(this.x + this.Sz / 2, this.y + this.Sz / 2, 10, 10);
                        break;
                    case "white":
                        fill(255);
                        stroke(255);
                        rect(this.x, this.y, this.Sz, this.Sz);
                        noStroke();
                        fill(0);
                        ellipse(this.x + this.Sz / 2, this.y + this.Sz / 2, 10, 10);
                        break;
                }
                break;
            case "trampoline":
                switch (this.type2) {
                    case "black":
                        noStroke();
                        fill(0);
                        rect(this.x, this.y, this.Sz, 10);
                        rect(this.x, this.y + this.Sz - 10, this.Sz, 10);
                        strokeWeight(4);
                        stroke(0);
                        line(this.x + 5, this.y + 5, this.x + this.Sz - 5, this.y + this.Sz - 5);
                        line(this.x + 5, this.y + this.Sz - 5, this.x + this.Sz - 5, this.y + 5);
                        stroke(255);
                        line(this.x, this.y + this.Sz / 2, this.x + this.Sz, this.y + this.Sz / 2);
                        break;
                    case "white":
                        noStroke();
                        fill(255);
                        rect(this.x, this.y, this.Sz, 10);
                        rect(this.x, this.y + this.Sz - 10, this.Sz, 10);
                        strokeWeight(4);
                        stroke(255);
                        line(this.x + 5, this.y + 5, this.x + this.Sz - 5, this.y + this.Sz - 5);
                        line(this.x + 5, this.y + this.Sz - 5, this.x + this.Sz - 5, this.y + 5);
                        stroke(0);
                        line(this.x, this.y + this.Sz / 2, this.x + this.Sz, this.y + this.Sz / 2);
                        break;
                }
                break;
            case "portal":
                switch (this.type2) {
                    case "black":
                        strokeWeight(2);
                        stroke(255);
                        fill(0);
                        quad(this.x, this.y, this.x + this.Sz, this.y, this.x + this.Sz - 10, this.y + 10, this.x + 10, this.y + 10);
                        quad(this.x, this.y + this.Sz, this.x + this.Sz, this.y + this.Sz, this.x + this.Sz - 10, this.y + this.Sz - 10, this.x + 10, this.y + this.Sz - 10);
                        PortalSystem("black", this.x + this.Sz / 2, this.y + this.Sz / 2);
                        break;
                    case "white":
                        strokeWeight(2);
                        stroke(0);
                        fill(255);
                        quad(this.x, this.y, this.x + this.Sz, this.y, this.x + this.Sz - 10, this.y + 10, this.x + 10, this.y + 10);
                        quad(this.x, this.y + this.Sz, this.x + this.Sz, this.y + this.Sz, this.x + this.Sz - 10, this.y + this.Sz - 10, this.x + 10, this.y + this.Sz - 10);
                        PortalSystem("white", this.x + this.Sz / 2, this.y + this.Sz / 2);
                        break;
                }
                break;
            case "death":
                switch (this.type2) {
                    case "black":
                        fill(0);
                        stroke(0);
                        rect(this.x, this.y, this.Sz, this.Sz);
                        stroke(255);
                        strokeWeight(5);
                        line(this.x + 10, this.y + 10, this.x + this.Sz - 10, this.y + this.Sz - 10);
                        line(this.x + 10, this.y + this.Sz - 10, this.x + this.Sz - 10, this.y + 10);
                        break;
                    case "white":
                        fill(255);
                        stroke(255);
                        rect(this.x, this.y, this.Sz, this.Sz);
                        stroke(0);
                        strokeWeight(5);
                        line(this.x + 10, this.y + 10, this.x + this.Sz - 10, this.y + this.Sz - 10);
                        line(this.x + 10, this.y + this.Sz - 10, this.x + this.Sz - 10, this.y + 10);
                        break;
                }
                break;
        }
    };
}